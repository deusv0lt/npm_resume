#!/usr/bin/env node
const emojiUnicode = require("emoji-unicode");

const inquirer = require("inquirer");
const chalk = require("chalk");
const data = require("./data.json");

// add response color
const response = chalk.bold.green;

//list of all items that need to be displayed
const resumeOptions = {
  type: "list",
  name: "resumeOptions",
  message: "What do you want to know",
  choices: [...Object.keys(data), "Exit"]
};

function showResume() {
  console.log("Resume ");
  handleResume();
}

function handleResume() {
  inquirer.prompt(resumeOptions).then(answer => {
    if (answer.resumeOptions == "Exit") return;

    const options = data[`${answer.resumeOptions}`]
    if (options) {
      console.log(response(new inquirer.Separator()));
      options.forEach(info => {
        console.log(response("|   => " + info));
      });
      console.log(response(new inquirer.Separator()));
    }

    inquirer
      .prompt({
        type: "list",
        name: "exitBack",
        message: "Go back or Exit?",
        choices: ["Back", "Exit"]
      }).then(choice => {
        if (choice.exitBack == "Back") {
          handleResume();
        } else {
          return;
        }
      });
  }).catch(err => console.log('Ooops,', err))
}

showResume();
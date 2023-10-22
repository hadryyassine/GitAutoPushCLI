const inquirer = require("inquirer");
const { Octokit } = require("@octokit/rest");

async function authentificate() {
  const question = [
    {
      name: "token",
      type: "input",
      message: "Enter your Github Token",
      validate: function (value) {
        if (value.length == 40) {
          return true;
        } else {
          return "Please enter a valid token";
        }
      },
    },
  ];

  const answer = await inquirer.prompt(question);

  try {
    const octokit = new Octokit({
      auth: answer.token,
    });
    return octokit;
  } catch (error) {
    console.log("Error while trying to authentificate");
    console.log(error);
  }
}

module.exports = { authentificate };

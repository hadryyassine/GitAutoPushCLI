const inquirer = require("inquirer");
const { Octokit } = require("@octokit/rest");
const Configstore = require("configstore");
const packageJson = require("./package.json");

const config = new Configstore(packageJson.name);

async function authentificate() {
  let token = config.get("github_token");
  if (token) {
    console.log("Token is already found. Skipping prompt.");

    try {
      const octokit = new Octokit({
        auth: token,
      });
      return octokit;
    } catch (error) {
      console.log(error);
    }
  } else {
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
      config.set("github_token", answer.token);
      return octokit;
    } catch (error) {
      console.log("Error while trying to authentificate");
      console.log(error);
    }
  }
}

module.exports = { authentificate };

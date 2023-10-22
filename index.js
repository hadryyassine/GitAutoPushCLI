async function main() {
  const app = require("commander");
  const chalk = require("chalk");
  const clear = require("clear");
  const figlet = require("figlet");
  const inquirer = require("inquirer");
  const auth = require("./auth");

  app
    .command("init")
    .description("Github initializer tool")
    .action(async () => {
      //show welcome message
      console.log("Welcome to Git Auto-Push CLI");
    });

  app.parse(process.argv); //get the arg (i.e. init)

  //show help if no arg is passed
  if (!app.args.length) {
    app.help();
  }

  clear();

  console.log(chalk.green(figlet.textSync("Git Auto-Push CLI")));

  console.log(
    "Welcome to Git Auto-Push CLI, It's build by Yassine Hadry : " +
      chalk.green("https://hadryyassine.vercel.app/") +
      ".\nIt's a simple CLI tool to automate the process of pushing your code to Github."
  );

  const question = [
    {
      name: "proceed",
      type: "input",
      message: "Do you want to push this project to a Github remote repo?",
      choices: ["Yes", "No"],
      default: "Yes",
    },
  ];

  const answer = await inquirer.prompt(question);

  if (answer.proceed === "Yes") {
    console.log(chalk.green("Authenticating..."));
    const octokit = await auth.authentificate();
  } else {
    console.log(chalk.green("Okay, See you then !"));
  }
}

main();

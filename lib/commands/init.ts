import * as inquirer from "inquirer";
import * as ncp from "ncp";
const chalk = require("chalk");
import * as download from "download-git-repo";
import * as ora from "ora";
import * as fs from "fs";
import * as path from "path";
import * as commander from "commander";
const option = commander.parse(process.argv).args[0];
const defaultName = typeof option === "string" ? option : "react-project";

const sourceList = require(`${__dirname}/../../template`);

const question = [
  {
    type: "input",
    name: "name",
    message: "Project name",
    default: defaultName,
    filter(val) {
      return val.trim();
    },
    validate(val) {
      const validate = val.trim().split(" ").length === 1;
      return validate || "Project name is not allowed to have spaces ";
    },
    transformer(val) {
      return val;
    }
  },
  {
    type: "list",
    name: "template",
    message: "Project template",
    choices: sourceList.choices,
    default: sourceList.choices[0],
    validate(val) {
      return true;
    },
    transformer(val) {
      return val;
    }
  },
  {
    type: "input",
    name: "description",
    message: "Project description",
    default: "React project",
    validate(val) {
      return true;
    },
    transformer(val) {
      return val;
    }
  },
  {
    type: "input",
    name: "author",
    message: "Author",
    default: "project author",
    validate(val) {
      return true;
    },
    transformer(val) {
      return val;
    }
  },
  {
    type: "list",
    name: "source",
    message: "Which source you choose",
    choices: [
      {
        name: "local(recommended)",
        value: "local"
      },
      {
        name: "git(which is latest)",
        value: "git"
      }
    ],
    default: "local",
    validate(val) {
      return true;
    },
    transformer(val) {
      return val;
    }
  }
];
module.exports = inquirer
  .prompt(question)
  .then(({ name, template, description, author, source }) => {
    const projectName = name;
    const templateName = template;

    let spinner = ora("Generating please wait...");

    if (source === "git") {
      spinner = ora("Downloading please wait...");
      const gitPlace = sourceList[source][templateName]["place"];
      const gitBranch = sourceList[source][templateName]["branch"];
      spinner.start();
      download(`${gitPlace}${gitBranch}`, `./${projectName}`, err => {
        if (err) {
          console.log(chalk.red(err));
          process.exit();
        }
        fs.readFile(`./${projectName}/package.json`, "utf8", function(
          err,
          data
        ) {
          if (err) {
            spinner.stop();
            console.error(err);
            return;
          }
          const packageJson = JSON.parse(data);
          packageJson.name = name;
          packageJson.description = description;
          packageJson.author = author;
          var updatePackageJson = JSON.stringify(packageJson, null, 2);
          fs.writeFile(
            `./${projectName}/package.json`,
            updatePackageJson,
            "utf8",
            function(err) {
              if (err) {
                spinner.stop();
                console.error(err);
                return;
              } else {
                spinner.stop();
                console.log(chalk.green("project init successfully!"));
                console.log(`
            ${chalk.bgWhite.black("   Run Application  ")}
            ${chalk.yellow(`cd ${name}`)}
            ${chalk.yellow("npm install")}
            ${chalk.yellow("npm start")}
          `);
              }
            }
          );
        });
      });
    }
    if (source === "local") {
      spinner.start();
      ncp.ncp(
        path.resolve(__dirname, "../../") + sourceList[source][templateName],
        projectName,
        err => {
          if (err) {
            console.log(err);
            process.exit();
          }
          spinner.stop();
          console.log();
          console.log("Project init finished".green);
          console.log("=====================".green);
          console.log();
          console.log("To get started");
          console.log();
          console.log(`    cd ${projectName}`.red);
          console.log("    yarn && npm run start".red);
        }
      );
    }
  });

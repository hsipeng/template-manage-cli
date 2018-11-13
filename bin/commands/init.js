"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer = require("inquirer");
var ncp = require("ncp");
var chalk = require("chalk");
var download = require("download-git-repo");
var ora = require("ora");
var fs = require("fs");
var path = require("path");
var commander = require("commander");
var option = commander.parse(process.argv).args[0];
var defaultName = typeof option === "string" ? option : "react-project";
var sourceList = require(__dirname + "/../../template");
var question = [
    {
        type: "input",
        name: "name",
        message: "Project name",
        default: defaultName,
        filter: function (val) {
            return val.trim();
        },
        validate: function (val) {
            var validate = val.trim().split(" ").length === 1;
            return validate || "Project name is not allowed to have spaces ";
        },
        transformer: function (val) {
            return val;
        }
    },
    {
        type: "list",
        name: "template",
        message: "Project template",
        choices: sourceList.choices,
        default: sourceList.choices[0],
        validate: function (val) {
            return true;
        },
        transformer: function (val) {
            return val;
        }
    },
    {
        type: "input",
        name: "description",
        message: "Project description",
        default: "React project",
        validate: function (val) {
            return true;
        },
        transformer: function (val) {
            return val;
        }
    },
    {
        type: "input",
        name: "author",
        message: "Author",
        default: "project author",
        validate: function (val) {
            return true;
        },
        transformer: function (val) {
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
        validate: function (val) {
            return true;
        },
        transformer: function (val) {
            return val;
        }
    }
];
module.exports = inquirer
    .prompt(question)
    .then(function (_a) {
    var name = _a.name, template = _a.template, description = _a.description, author = _a.author, source = _a.source;
    var projectName = name;
    var templateName = template;
    var spinner = ora("Generating please wait...");
    if (source === "git") {
        spinner = ora("Downloading please wait...");
        var gitPlace = sourceList[source][templateName]["place"];
        var gitBranch = sourceList[source][templateName]["branch"];
        spinner.start();
        download("" + gitPlace + gitBranch, "./" + projectName, function (err) {
            if (err) {
                console.log(chalk.red(err));
                process.exit();
            }
            fs.readFile("./" + projectName + "/package.json", "utf8", function (err, data) {
                if (err) {
                    spinner.stop();
                    console.error(err);
                    return;
                }
                var packageJson = JSON.parse(data);
                packageJson.name = name;
                packageJson.description = description;
                packageJson.author = author;
                var updatePackageJson = JSON.stringify(packageJson, null, 2);
                fs.writeFile("./" + projectName + "/package.json", updatePackageJson, "utf8", function (err) {
                    if (err) {
                        spinner.stop();
                        console.error(err);
                        return;
                    }
                    else {
                        spinner.stop();
                        console.log(chalk.green("project init successfully!"));
                        console.log("\n            " + chalk.bgWhite.black("   Run Application  ") + "\n            " + chalk.yellow("cd " + name) + "\n            " + chalk.yellow("npm install") + "\n            " + chalk.yellow("npm start") + "\n          ");
                    }
                });
            });
        });
    }
    if (source === "local") {
        spinner.start();
        ncp.ncp(path.resolve(__dirname, "../../") + sourceList[source][templateName], projectName, function (err) {
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
            console.log(("    cd " + projectName).red);
            console.log("    yarn && npm run start".red);
        });
    }
});
//# sourceMappingURL=init.js.map
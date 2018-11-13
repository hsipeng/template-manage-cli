#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander = require("commander");
var child_process_1 = require("child_process");
var path = require("path");
var util_1 = require("./util");
var version = require("../package.json").version;
var res = function (command) { return path.resolve(__dirname, "./commands", command); };
commander
    .version(version, "-V, --version")
    .usage("[Options] | [Commands] <file>");
commander
    .command("init")
    .description("generation a webpack project")
    .option("dir")
    .action(function () {
    require(res("init"));
});
commander.on("--help", function () {
    console.log("\n Examples:");
    console.log("");
    console.log("  $ build-react-cli -h");
    console.log("  $ build-react-cli init snake-demo ");
    console.log("");
});
if (commander.parse(process.argv).args.length < 1) {
    commander.help();
}
var nodeVersion = child_process_1.execSync("node -v", { encoding: "utf8" });
if (!util_1.compareVersion(nodeVersion)) {
    console.log("Please make sure the node version is above 8.0".red);
    process.exit();
}
// export const release = async () => {
//   const nodeVersion = execSync("node -v", { encoding: "utf8" });
//   if (process.argv.length === 2) {
//     execSync("build-react-cli -h");
//   }
//   if (!compareVersion(nodeVersion)) {
//     console.log("Please make sure the node version is above 8.0".red);
//     process.exit();
//   }
//   const argv2 = process.argv[2];
//   const argv3 = process.argv[3];
//   if (argv2 === "init") {
//     let projectName = argv3;
//     if (!projectName) {
//       projectName = await setProjectName();
//     } else if (fs.existsSync(projectName)) {
//       console.log(
//         "\n the dir has exists, please input another one".green + "\n"
//       );
//       projectName = await setProjectName();
//     }
//     const reactMode = await mode();
//     projectName = projectName || global["projectName"];
//     fs.mkdirSync(projectName);
//     const currentPath = path.resolve(__dirname, "..");
//     const directory = currentPath + type(reactMode.flag);
//     dir(directory, projectName);
//   } else if (argv2 === "view") {
//     viewTemplate(argv3);
//   }
// };
// release().catch(err => {
//   console.error(err);
//   process.exit();
// });
// commander.parse(process.argv);
//# sourceMappingURL=index.js.map
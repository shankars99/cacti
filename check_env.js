const { execSync } = require("child_process");

/*
 * This script checks that the required software is installed and working.
 * It is run before the user's application is installed.
 * Checks for:
 * - Node.js version 16.14.2
 * - Java version 1.8
 * - Docker installation
 * - Docker working
 */

function checkNodeVersion() {
  const requiredVersion = "16.14.2";
  const nodeVersion = process.version.slice(1); // Remove the 'v' prefix
  if (nodeVersion !== requiredVersion) {
    console.error(`Error: Node.js version should be ${requiredVersion}.`);
    process.exit(1);
  }
}

function checkJavaVersion() {
  const requiredVersion = "1.8";
  try {
    const javaVersionOutput = execSync("java -version 2>&1", {
      encoding: "utf8",
    });
    const javaVersion = javaVersionOutput.match(/version "([^"]*)"/)[1];
    if (!javaVersion.includes(requiredVersion)) {
      console.error(`Error: Java version should be ${requiredVersion}.`);
      process.exit(1);
    }
  } catch (error) {
    console.error("Error: Java is not installed or not in PATH.");
    process.exit(1);
  }
}

function checkDockerInstallation() {
  try {
    execSync("docker --version", { stdio: "ignore" });
  } catch (error) {
    console.error("Error: Docker is not installed or not in PATH.");
    process.exit(1);
  }
}

function checkDockerWorks() {
  try {
    execSync("docker info", { stdio: "ignore" });
  } catch (error) {
    console.error("Error: Docker is not working correctly.");
    process.exit(1);
  }
}

function main() {
  checkNodeVersion();
  checkJavaVersion();
  checkDockerInstallation();
  checkDockerWorks();
  console.log("All checks passed. Ready to proceed with your application!");
}

main();

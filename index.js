#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");

const [, , subcommand, ...args] = process.argv;

const commands = {
  toSfc: path.resolve(__dirname, "to-sfc.js"),
  toTemplate: path.resolve(__dirname, "to-template.js"),
};

if (subcommand in commands) {
  const command = `node ${commands[subcommand]} ${args.join(" ")}`;
  try {
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    console.error(`Error executing command: ${subcommand}`);
    process.exit(1);
  }
} else {
  console.error(`Unknown subcommand: ${subcommand}`);
  console.error("Available subcommands: toSfc, to-template");
  process.exit(1);
}

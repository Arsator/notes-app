const chalk = require("chalk");
const notes = require("../utils/notes.js");
const yargs = require("yargs");

//create add command
yargs.command({
    command: "add",
    describe: "Add a note",
    builder: {
        title: {
            describe: "Title of note",
            demandOption: true,
            type: "string"
        },
        body: {
            describe: "content of note",
            demandOption: true,
            type: "string"
        }
    },
    handler: (argv) => notes.addNote(argv.title, argv.body),
});
debugger
//create remove command
yargs.command({
    command: "remove",
    describe: "Remove a note",
    builder: {
        title: {
            describe: "Title of note",
            demandOption: true,
            type: "string"
        }
    },
    handler: (argv) => notes.removeNote(argv.title),

});

//create read command
yargs.command({
    command: "read",
    describe: "Read a note",
    builder: {
        title: {
            describe: "Title of note",
            demandOption: true,
            type: "string",
        },
    },
    handler: (argv) => notes.readNote(argv.title),
});

//create list command
yargs.command({
    command: "list",
    describe: "show available notes",
    handler: () => {
        notes.listNotes();
    }
});

yargs.parse();
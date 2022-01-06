const fs = require("fs");
const chalk = require("chalk");

//add
const addNote = (title, body) => {
    const notes = loadNotes();

    //check for duplicate titles
    const hasDuplicate = notes.find((note) => note.title === title);

    if(!hasDuplicate) {
        notes.push({title: title, body: body});
        saveNote(notes);
        console.log(chalk.bold.green("Note Added!"));
    }
    else {
        console.log(chalk.red.bold("Title already exists!"));
    }

}

const saveNote = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync("utils/notes.json", dataJSON);
}
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync("utils/notes.json");
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e) {
        return [];
    }
}

//remove
const removeNote = (title) => {
    const notes = loadNotes();
    var positionOfTitle = -1;
    notes.forEach(function (note, index) {
        if(note.title === title) {
            positionOfTitle = index;
        }
    });

    if(positionOfTitle === -1) {
        console.log(chalk.red.bold("No note found!"));
    }
    else {
        const newNotes = notes.splice(positionOfTitle, 1);
        saveNote(notes);
        console.log(chalk.bold.green("Note Removed!"));
    }
};

//list
const listNotes = () => {
    const notes = loadNotes();
    if(notes.length === 0) {
        return console.log(chalk.yellow.bold("You do not have any notes!"))
    }
    console.log(chalk.bold("Your notes:"));
    notes.forEach((note) => {
        console.log(note.title)
    })
}

//read
const readNote = (title) => {
    //check if title exists
    const notes = loadNotes();
    const isPresent = notes.find(note => note.title === title);

    if(isPresent) {
        for(var index = 0; index < notes.length; index++) {
            if(notes[index].title === title) {
                console.log(chalk.bold(notes[index].title));
                console.log(notes[index].body);
                break;
            }
        }
    }
    else {
        console.log(chalk.red("Title doesn't exist!"));
    }
}
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};

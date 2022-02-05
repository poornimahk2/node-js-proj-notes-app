const fs = require('fs')
const chalk = require('chalk')

const log = console.log;

const readNote = (title) => {
    const notes = loadNotes()
    const matchedNote = notes.find((note) => note.title === title)
    if(matchedNote) {
        log(chalk.green.inverse('Note found'))
        log(chalk.inverse(matchedNote.title))
        log(matchedNote.body)
    }
    else {
       log(chalk.red.inverse('No note found'))
    }
}

const listNotes = () => {
    log(chalk.yellow.inverse('Your notes'))
    const notes = loadNotes()
    notes.forEach(note => {
        log(note.title)
    });
}

const addNote = (title,body) => {
    const notes = loadNotes()
    //const duplicateNotes = notes.filter((note) => note.title === title )
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title:title,
            body:body
        })
        saveNotes(notes)
        log(chalk.green.inverse('Note added'))
    }
    else {
        log(chalk.red.inverse('Title already exists'))
    }
}

const removeNotes = (title) =>{
    const notes = loadNotes()
    const finalNotes = notes.filter((note) => note.title !== title )
    if (notes.length > finalNotes.length) {
        saveNotes(finalNotes)
        log((chalk.green.inverse('Note removed')))
    }
    else {
        log(chalk.red.inverse('No note found'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e) {
        return []
    }

    
}

module.exports = {
    listNotes: listNotes,
    addNote: addNote,
    removeNotes: removeNotes,
    readNote: readNote
}
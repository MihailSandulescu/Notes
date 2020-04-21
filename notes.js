const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {'Your notes...'}

const addNote = (title, body) => {
    const notes = loadNotes()

    const duplicateNote = notes.find((note) => note.title === title)

    if (duplicateNote === undefined) {
        notes.push({
            title: title,
            body: body
        })
    
       saveNotes(notes)
       console.log(chalk.bgGreen('New note added!'))
    } else {
        console.log(chalk.bgRed('Note title taken!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
   try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
   } catch (e) {
        return []
   }
}

const removeNote = (title) => {
    const notes = loadNotes()
    console.log("Note to be removed: " + title)

    // const titleIndex = notes.findIndex( function (note) {
    //     return note.title === title
    // })

    // if (titleIndex == -1) {
    //     console.log('Note does not exist!')
    // } else {
    //     notes.splice(titleIndex, 1)
    //     saveNotes(notes)
    //     console.log('Note removed!')
    // }

    // sau

    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notesToKeep.length == notes.length) {
        console.log(chalk.bgRed('No note found!'))
    } else {
        saveNotes(notesToKeep)
        console.log(chalk.bgGreen('Note removed!'))
    }
}

const listNotes = () => {
    const notes = loadNotes()

    if (notes.length == 0) {
        console.log(chalk.redBright('No notes found!'))
    } else {
        console.log(chalk.greenBright('Your notes: '))
        notes.forEach(note => {
            console.log(note)
        });
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log('Title: ' + chalk.bgMagentaBright(note.title))
        console.log('Body: ' + note.body)
    } else {
        console.log(chalk.red('Note does not exist!'))
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}
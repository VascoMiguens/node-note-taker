const router = require("express").Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);

let notes;

router.get("/notes", (req, res) => {
  //Read notes
  notes = readFileAsync("./db/db.json", "utf8").then((data) => {
    if (data) {
      //add notes to databse array
      notes = [].concat(JSON.parse(data));
    }
    //display notes
    res.json(notes);
  });
});

router.post("/notes", (req, res) => {
  const { title, text } = req.body;
  let newNote;
  //generate random id
  let noteId = uuidv4();

  //create newNote object when a note is entered
  if (req.body) {
    newNote = {
      id: noteId,
      title,
      text,
    };
  }
  //append the newNote to the existing notes
  notes.push(newNote);
  //rewrite the notes with the newNote in db.json
  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  //display the new note in the list
  res.json(notes);
});

router.delete("/notes/:id", (req, res) => {
  //filter out the note that we want to eliminate
  notes = notes.filter((item) => item.id !== req.params.id);
  //rewrite the notes without the note that was filtered out
  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  //display the notes
  res.json(notes);
});

module.exports = router;

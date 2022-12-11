const router = require("express").Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

let notes;

router.get("/notes", (req, res) => {
  //Read notes
  let result = fs.readFileSync("./db/db.json", "utf8");
  if (result) {
    //add notes to databse array
    notes = [].concat(JSON.parse(result));
  }
  //display notes
  res.json(notes);
});

router.post("/notes", (req, res) => {
  const { title, text } = req.body;
  let newNote;
  //generate random id
  let noteId = uuidv4();

  //create newTip object if a note is entered
  if (req.body) {
    newNote = {
      id: noteId,
      title,
      text,
    };
    //add it to the notes array
    notes.push(newNote);
  }
  //display the new note
  res.json(newNote);
  //write the note in db.json
  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
});

module.exports = router;

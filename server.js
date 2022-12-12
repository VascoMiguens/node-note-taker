const express = require("express");
const apiRoutes = require("./routes/notes");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3001;

//Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", apiRoutes);

//Get route for homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

//Get route for notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
});

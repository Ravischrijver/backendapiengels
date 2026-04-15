import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = "./rooms.json";

// Zorg dat JSON bestaat
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({}), "utf8");
}

function loadData() {
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

// Alle kamers ophalen
app.get("/rooms", (req, res) => {
  res.json(loadData());
});

// Eén kamer ophalen
app.get("/rooms/:id", (req, res) => {
  const data = loadData();
  const id = req.params.id;

  if (!data[id]) data[id] = { status: "vrij", notities: "", mapLink: "", extraText: "" };

  res.json(data[id]);
});

// Kamer updaten
app.put("/rooms/:id", (req, res) => {
  const data = loadData();
  const id = req.params.id;

  if (!data[id]) data[id] = {};

  data[id] = { ...data[id], ...req.body };
  saveData(data);

  res.json({ success: true, room: data[id] });
});

app.listen(3000, () => console.log("API draait op poort 3000"));

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.json());
app.use(cors());


const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/planningEvents";
const PORT = process.env.PORT || 3000;

// connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// define schema for events
const eventSchema = new mongoose.Schema({
  title: String,
  start: Date,
});

// create model for events
const Event = mongoose.model('Event', eventSchema);

// create endpoint to get all events
app.get('/events', async (req, res) => {
  try {
    const events = await Event.find({});
    res.send(events);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// create endpoint to create a new event
app.post('/events', async (req, res) => {
  try {
    const { title, date } = req.body;
    const event = new Event({
      title,
      start: new Date(date),
    });
    await event.save();
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
  
  app.get("/", (req,res) =>{
      res.send("hello");
  })
  
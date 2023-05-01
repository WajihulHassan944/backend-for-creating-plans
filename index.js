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
const planSchema = new mongoose.Schema({
  title: String,
  start: Date,
});
const planSchema2 = new mongoose.Schema({
  name2: String,
  content: String,
  date: Date,
  location: String,
  category: String,
});

// create model for events
const Plan = mongoose.model('Plan', planSchema);
const Plan2 = mongoose.model('Plan2', planSchema2);

// create endpoint to get all events
app.get('/plans', async (req, res) => {
  try {
    const events = await Plan.find({});
    res.send(events);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get('/plans2', async (req, res) => {
  try {
    const events = await Plan2.find({});
    res.send(events);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// create endpoint to create a new event
app.post('/plans', async (req, res) => {
    try {
      const { title, start } = req.body;
      const event = new Plan({
        title,
        start,
      });
      await event.save();
      res.sendStatus(201);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });


  
  app.post('/plans2', async (req, res) => {
    try {
      const { content, date, location, category } = req.body;
      const event = new Plan2({
        name2,
        content,
        date,
        location,
        category,
      });
      await event.save();
      res.sendStatus(201);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
  
  app.get("/", (req,res) =>{
      res.send("hello");
  })
  
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
  name: String,
  email: String,
  topic: String,
  location: String,
  situation: String,
  contactmethod: String,
});
const industriesSchema = new mongoose.Schema({
  listitem: String,
});

const planSchema3 = new mongoose.Schema({
  name: String,
  email: String,
  topic: String,
  location: String,
  situation: String,
  message: String,
});

const planSchema2 = new mongoose.Schema({
  title: String,
  content: String,
  date: Date,
  location: String,
  category: String,
});
const helperSchema = new mongoose.Schema({
  typeOfHelp: String,
  categories: String,
  location: String,
  schedule: String,
  comments: String,
  categoriestype: String,
	locationtype: String,
  name: String,
	email: String,
});
// create model for events
const Plan = mongoose.model('Plan', planSchema);
const Plan2 = mongoose.model('Plan2', planSchema2);
const Plan3 = mongoose.model('Plan3', planSchema3);
const Helper = mongoose.model('Helper', helperSchema);
const Industries = mongoose.model('Industries', industriesSchema);
// create endpoint to get all events

app.get('/plans2/:key', async (req, res) => {
  try {
    const searchQuery = req.params.key;
    const searchRegex = new RegExp(searchQuery, 'i');
    const results = await Plan2.find({
      $or: [
        { title: searchRegex },
        { content: searchRegex },
        { location: searchRegex },
        { category: searchRegex }
      ]
    }).exec();
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/plans', async (req, res) => {
  try {
    const events = await Plan.find({});
    res.send(events);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
app.get('/plans3', async (req, res) => {
  try {
    const events = await Plan3.find({});
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
      const { name , email , topic , location , situation , contactmethod } = req.body;
      const event = new Plan({
        name,
        email, 
        topic, 
        location,
        situation,
        contactmethod,
      });
      await event.save();
      res.sendStatus(201);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });


  app.post('/plans3', async (req, res) => {
    try {
      const { name , email , topic , location , situation , message } = req.body;
      const event = new Plan3({
        name,
        email, 
        topic, 
        location,
        situation,
        message,
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
      const { title , content, date, location, category } = req.body;
      const event = new Plan2({
        title,
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

app.get('/api/helpers', async (req, res) => {
  try {
    const helpers = await Helper.find();
    res.json(helpers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to retrieve helpers' });
  }
});

app.post('/api/helpers', async (req, res) => {
  const helper = new Helper(req.body);
  try {
    await helper.save();
    res.json(helper);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add helper' });
  }
});


app.get('/api/helpers/:key', async (req, res) => {
  try {
    const searchQuery = req.params.key;
    const searchRegex = new RegExp(searchQuery, 'i');
    const results = await Helper.find({
      $or: [
        { name: searchRegex },
        { location: searchRegex },
        { typeOfHelp: searchRegex },
        { categories: searchRegex },
        { schedule: searchRegex },
        { comments: searchRegex },
        { categoriestype: searchRegex },
        { locationtype: searchRegex },
        { email: searchRegex }
      ]
    }).exec();
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/industries', async (req, res) => {
  try {
    const events = await Industries.find({});
    res.send(events);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// create endpoint to create a new event
app.post('/industries', async (req, res) => {
    try {
      const { listitem } = req.body;
      const event = new Industries({
       listitem, 
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
  
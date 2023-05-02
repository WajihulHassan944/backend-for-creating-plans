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
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply', autopopulate: { select: 'message' } }]
}).plugin(require('mongoose-autopopulate'));

const planSchema2 = new mongoose.Schema({
  title: String,
  content: String,
  date: Date,
  location: String,
  category: String,
});

const replySchema = new mongoose.Schema({
  message: String,
  plan: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan' }
});
// create model for events
const Reply = mongoose.model('Reply', replySchema);
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
      const { name , email , topic , location , situation } = req.body;
      const event = new Plan({
        name,
        email, 
        topic, 
        location,
        situation,
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


  app.post('/plans/:id/reply', async (req, res) => {
    try {
      const { id } = req.params;
      const { replyMessage } = req.body;
  
      const plan = await Plan.findById(id);
      if (!plan) {
        return res.status(404).json({ message: 'Plan not found' });
      }
  
      const reply = new Reply({
        message: replyMessage,
        plan: id
      });
  
      await reply.save();
  
      res.status(200).json({ message: 'Reply message saved successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  app.get('/plans/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await Plan.findById(id).populate('replies');
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    res.status(200).json({ plan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
  

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
  
  app.get("/", (req,res) =>{
      res.send("hello");
  })
  
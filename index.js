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

const dataExcelOne = new mongoose.Schema({
  name111: String,
  address: String,
  zip: String,
  phone: String,
});

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
  link: String,
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
const DataExcelOne = mongoose.model('DataExcelOne', dataExcelOne);
// create endpoint to get all events


app.get('/plans3/:key', async (req, res) => {
  try {
    const searchQuery = req.params.key;
    const searchRegex = new RegExp(searchQuery, 'i');
    const results = await Plan3.find({
      $or: [
        { name: searchRegex },
        { email: searchRegex },
        { location: searchRegex },
        { topic: searchRegex },
        { situation: searchRegex },
        { message: searchRegex }
      ]
    }).exec();
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});



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


app.put('/plans/:id', async (req, res) => {
  try {
    const events = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update events' });
  }
});


app.delete('/plans/:id', async (req, res) => {
  try {
    await Plan.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete events' });
  }
});


app.put('/plans2/:id', async (req, res) => {
  try {
    const events = await Plan2.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update events' });
  }
});


app.delete('/plans2/:id', async (req, res) => {
  try {
    await Plan2.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete events' });
  }
});


app.put('/plans3/:id', async (req, res) => {
  try {
    const events = await Plan3.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update events' });
  }
});


app.delete('/plans3/:id', async (req, res) => {
  try {
    await Plan3.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete events' });
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


app.put('/api/helpers/:id', async (req, res) => {
  try {
    const helper = await Helper.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(helper);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update helper' });
  }
});


app.delete('/api/helpers/:id', async (req, res) => {
  try {
    await Helper.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete helper' });
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
      const { listitem , link } = req.body;
      const event = new Industries({
       listitem, 
       link,
      });
      await event.save();
      res.sendStatus(201);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.put('/industries/:id', async (req, res) => {
    try {
      const industry = await Industries.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(industry);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update industry' });
    }
  });
  
  // Delete an industry
  app.delete('/industries/:id', async (req, res) => {
    try {
      await Industries.findByIdAndDelete(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete industry' });
    }
  });
  
// db1


app.get('/dataExcelOne', async (req, res) => {
  try {
    const events = await DataExcelOne.find({});
    res.send(events);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post('/dataExcelOne', async (req, res) => {
    try {
      const { name111,  address,  zip, phone } = req.body;
      const event = new DataExcelOne({
       name111, 
       address,
       zip,
       phone,
      });
      await event.save();
      res.sendStatus(201);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.put('/dataExcelOne/:id', async (req, res) => {
    try {
      const industry = await DataExcelOne.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(industry);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update record1' });
    }
  });
  
  app.delete('/dataExcelOne/:id', async (req, res) => {
    try {
      await DataExcelOne.findByIdAndDelete(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete record1' });
    }
  });
  

  
app.get('/dataExcelOne/:key', async (req, res) => {
  try {
    const searchQuery = req.params.key;
    const searchRegex = new RegExp(searchQuery, 'i');
    const results = await DataExcelOne.find({
      $or: [
        { name111: searchRegex },
        { address: searchRegex },
        { zip: searchRegex },
        { phone: searchRegex }
      ]
    }).exec();
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
  
  app.get("/", (req,res) =>{
      res.send("hello");
  })
  
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const Hikes = require('./models/state_hikes.js')
const hikeData = require('./models/hike_data.js')
const app = express();
app.use(express.json())
app.use(cors())
require('dotenv').config()
console.log(process.env) // remove this after you've confirmed it working
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
const db = mongoose.connection

//////////////////////////////////////////////////////////////
// Routes Start
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// Post / Create Route
//////////////////////////////////////////////////////////////
// Hikes.create(hikeData, (err, addHikes) =>{
//   console.log('Hikes added.')
// })


// app.post('/state_hikes', (req, res)=>{
//   Hikes.create(req.body, (err, createdHike) => {
//       res.json(createdHike);
//   })
// });

app.post('/state_hikes', (req, res)=>{
  Hikes.create({
    name: req.body.name,
    state: req.body.state,
    city: req.body.city,
    description: req.body.description,
    length: req.body.length,
    elevationGain: req.body.elevationGain,
    difficulty: req.body.difficulty,
    imageArray: req.body.imageArray.split(','),
    hiked: req.body.hiked
  }, (err, createdHike) => {
      res.json(createdHike);
  })
});



//////////////////////////////////////////////////////////////
// View / Get Route
//////////////////////////////////////////////////////////////
app.get('/state_hikes', (req, res) => {
    Hikes.find({}, (err, findHike) => {
        res.json(findHike)
    })
});

//////////////////////////////////////////////////////////////
// Delete Route
//////////////////////////////////////////////////////////////
app.delete('/state_hikes/:id', (req, res) => {
    Hikes.findByIdAndRemove(req.params.id, (err, deleteHike) => {
      res.json(deleteHike)
    })
});

//////////////////////////////////////////////////////////////
// Put / update/edit Route
//////////////////////////////////////////////////////////////
app.put('/state_hikes/:id', (req, res) => {
      Hikes.findByIdAndUpdate(req.params.id, name: req.body.name)
      Hikes.findByIdAndUpdate(req.params.id, name: req.body.name)
      Hikes.findByIdAndUpdate(req.params.id, state: req.body.state)
      Hikes.findByIdAndUpdate(req.params.id, city: req.body.city)
      Hikes.findByIdAndUpdate(req.params.id, description: req.body.description)
      Hikes.findByIdAndUpdate(req.params.id, length: req.body.length)
      Hikes.findByIdAndUpdate(req.params.id, elevationGain: req.body.elevationGain)
      Hikes.findByIdAndUpdate(req.params.id, difficulty: req.body.difficulty)
      Hikes.findByIdAndUpdate(req.params.id, imageArray: req.body.imageArray.split(','))
      Hikes.findByIdAndUpdate(req.params.id, hiked: req.body.hiked)
    }, {new:true}, (err, updateHike) => {
      res.json(updateHike)
    })
});

//////////////////////////////////////////////////////////////
// Routes End
//////////////////////////////////////////////////////////////

mongoose.connect(MONGODB_URI)
mongoose.connection.once('open', () => {
    console.log('connected to mongodb...');
})
app.listen(PORT, () => {
  console.log('listening...');
})

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

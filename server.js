const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const Hikes = require('./models/state_hikes.js')
const app = express();
app.use(express.json())
app.use(cors())
require('dotenv').config()
console.log(process.env) // remove this after you've confirmed it working
//////////////////////////////////////////////////////////////
// Routes Start
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// Post / Create Route
//////////////////////////////////////////////////////////////
app.post('/state_hikes', (req, res)=>{
  Hikes.create(req.body, (err, createdHike) => {
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
    Hikes.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updateHike) => {
      res.json(updateHike)
    })
});

//////////////////////////////////////////////////////////////
// Routes End
//////////////////////////////////////////////////////////////
const PORT = process.env.PORT || 3003;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
mongoose.connection.once('open', () => {
    console.log('connected to mongodb...');
})
app.listen(3000, () => {
  console.log('listening...');
})

const mongoose = require('mongoose')
const db = process.env.DATABASE;

mongoose.connect(db, {
  useNewUrlParser : true,
  useUnifiedTopology : true
}).then(() =>{
  console.log("CONECTADO A LA DB")
}).catch((e) =>{
  console.log("ERROR AL CONECTAR")
})
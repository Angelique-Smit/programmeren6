import express from 'express';
import 'dotenv/config';
import router from './router.js'
import mongoose from 'mongoose';

//database
mongoose.connect('mongodb://localhost:27017/animals');

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/animals', router)

app.listen(process.env.PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", process.env.PORT);
})

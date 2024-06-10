import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const animalSchema = new Schema({
    'name': String,
    'description': String,
    'author': String
});

export default mongoose.model('Animal', animalSchema);



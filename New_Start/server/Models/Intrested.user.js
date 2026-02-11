// Models of emails
import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema({
    email: String
});

const email = mongoose.model('Email', emailSchema);

export default email;
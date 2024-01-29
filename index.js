const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public')); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connecting with mongodb
mongoose.connect("mongodb://0.0.0.0:27017/softwareCompany")
.then(() => console.log("database connected successfully"))
.catch(() => console.log("database cannot connect"))

const feedbackSchema = new mongoose.Schema({
    name: {type: String ,required: true},
    email: {type: String ,required: true},
    message: {type: String ,required: true}
});

const Feedback = new mongoose.model('Feedback', feedbackSchema);

// Handle form submissions and store data in MongoDB
app.post('/submit-feedback', async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        }
        const feedback = new Feedback(data);
        await feedback.save();
        res.send('Feedback submitted successfully!');
        
    } catch (error) {
        console.error( error);
        res.status(500).send('Internal Server Error');
    }
});

app.get("/", (req, res) => {
    res.render('index');
})

app.listen(3000);

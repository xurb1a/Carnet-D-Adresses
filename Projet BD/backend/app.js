const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/contacts', contactRoutes);

app.listen(5000, () => {
    console.log('Serveur lancé sur le port 5000');
});

app.get('/', (req, res) => {
    res.send('Backend API running!');
});

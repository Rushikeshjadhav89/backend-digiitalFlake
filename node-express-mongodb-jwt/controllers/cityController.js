// controllers/stateController.js
const City = require('../models/city');

exports.createCity = async (req, res) => {
    const { City_Name, City_code,State_Name,Status } = req.body;

    try {
        let city = new City({
            City_Name,
            City_code,
            State_Name,
            Status
        });

        await city.save();
        res.json(city);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getCity = async (req, res) => {
    try {
        const city = await City.find();
        res.json(city);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
    
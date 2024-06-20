// controllers/stateController.js
const State = require('../models/State');

exports.createState = async (req, res) => {
    const { State_Name, State_code, Status } = req.body;

    try {
        let state = new State({
            State_Name,
            State_code,
            Status
        });

        await state.save();
        res.json(state);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getStates = async (req, res) => {
    try {
        const states = await State.find();
        res.json(states);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
    
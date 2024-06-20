const Warehouse = require('../models/warehouse');

exports.createWarehouse = async (req, res) => {
    const { name, state, city, status } = req.body;

    try {
        let warehouse = new Warehouse({
            name,
            state,
            city,
            status
        });

        await warehouse.save();
        res.json(warehouse);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getWarehouses = async (req, res) => {
    try {
        const warehouses = await Warehouse.find();
        res.json(warehouses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

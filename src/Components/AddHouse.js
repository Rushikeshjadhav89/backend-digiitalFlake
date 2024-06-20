import React, { useState } from 'react';
import axios from 'axios';
import '../css/Form.css';

const AddHouse = ({ onClose, onAdd }) => {
    const [Name, setName] = useState('');
    const [City_Name, setCity] = useState('');
    const [State_Name, setState] = useState('');
    const [Status, setStatus] = useState(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newWarehouse = {
            Name,
            City_Name,
            State_Name,
            Status
        };

        axios.post('http://localhost:5000/api/warehouse', newWarehouse)
            .then(response => {
                onAdd(response.data);
                onClose();
            })
            .catch(error => console.error('Error adding warehouse:', error));
    };

    return (
        <div className="form-container">
            <h2>Add Warehouse</h2>
            <form onSubmit={handleSubmit} className="warehouse-form">
                <div className="form-group">
                    <label>Warehouse Name:</label>
                    <input type="text" value={Name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>State:</label>
                    <select value={State_Name} onChange={(e) => setState(e.target.value)} required>
                        <option value="">Select State</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Telangana">Telangana</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>City:</label>
                    <select value={City_Name} onChange={(e) => setCity(e.target.value)} required>
                        <option value="">Select City</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Hyderabad">Hyderabad</option>
                    </select>
                </div>
                <div className="form-actions">
                    <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
                    <button type="submit" className="save-btn">Save</button>
                </div>
            </form>
        </div>
    );
};

export default AddHouse;

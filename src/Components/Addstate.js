import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import '../css/AddState.css';

const AddState = () => {
    const [stateName, setStateName] = useState('');
    const [stateCode, setStateCode] = useState('');
    const navigate = useNavigate();

    const handleSave = async () => {
        try {
            const newState = { State_Name: stateName, State_code: stateCode, Status: true };
            await axios.post('http://localhost:5000/api/state', newState);
            navigate('/states');
        } catch (error) {
            console.error('Error adding state:', error);
        }
    };

    return (
        <div className="add-state-container">
            <h1>Add State</h1>
            <div className="row">
                <div className="form-group">
                    <div className="col-md-4">
                        <label>State Name</label>
                        <input
                            type="text"
                            value={stateName}
                            onChange={(e) => setStateName(e.target.value)}
                            placeholder="State Name"
                            className='rounded-2 border-1'
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label>State Code</label>
                        <input
                            type="text"
                            value={stateCode}
                            onChange={(e) => setStateCode(e.target.value)}
                            placeholder="State Code"
                            className='rounded-2 border-1'
                        />
                    </div>
                </div>
            </div>
            <div className="form-actions">
                <button onClick={() => navigate('/states')} className="cancel-btn">Cancel</button>
                <button onClick={handleSave} className="save-btn">Save</button>
            </div>
        </div>
    );
};

export default AddState;

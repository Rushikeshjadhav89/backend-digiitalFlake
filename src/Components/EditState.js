import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/State.css';

const EditState = () => {
  const [stateName, setStateName] = useState('');
  const [stateCode, setStateCode] = useState('');
  const [status, setStatus] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchState();
  }, []);

  const fetchState = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/state/${id}`);
      const state = response.data;
      setStateName(state.State_Name);
      setStateCode(state.State_code);
      setStatus(state.Status);
    } catch (error) {
      console.error('Error fetching state:', error);
    }
  };

  const handleSave = async () => {
    try {
      const updatedState = { State_Name: stateName, State_code: stateCode, Status: status };
      await axios.put(`http://localhost:5000/api/state/${id}`, updatedState);
      navigate('/states');
    } catch (error) {
      console.error('Error updating state:', error);
    }
  };

  return (
    <div className="edit-state-container">
      <h1>Edit State</h1>
      <div className='row'>
        <div className="col-md-4">
      <div className="form-group">
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
      <div className="col-md-4">
      <div className="form-group">
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value === 'Active')}  className='rounded-2 border-1'>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
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

export default EditState;

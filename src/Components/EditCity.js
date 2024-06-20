import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../css/City.css';

const EditCity = () => {
  const [cityName, setCityName] = useState('');
  const [cityCode, setCityCode] = useState('');
  const [stateId, setStateId] = useState('');
  const [states, setStates] = useState([]);
  const [status, setStatus] = useState('Active');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchStates();
    fetchCity();
  }, []);

  const fetchStates = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/state');
      setStates(response.data);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const fetchCity = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/city/${id}`);
      const city = response.data;
      setCityName(city.City_Name);
      setCityCode(city.City_code);
      setStateId(city.State_id);
      setStatus(city.Status ? 'Active' : 'Inactive');
    } catch (error) {
      console.error('Error fetching city:', error);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/city/${id}`, {
        City_Name: cityName,
        City_code: cityCode,
        State_id: stateId,
        Status: status === 'Active',
      });
      navigate('/city');
    } catch (error) {
      console.error('Error updating city:', error);
    }
  };

  return (
    <div className="add-edit-city-container">
      <h1>Edit City</h1>
      <div className="form-group">
        <label>City Name</label>
        <input
          type="text"
          className="form-control"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>City Code</label>
        <input
          type="text"
          className="form-control"
          value={cityCode}
          onChange={(e) => setCityCode(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>State</label>
        <select
          className="form-control"
          value={stateId}
          onChange={(e) => setStateId(e.target.value)}
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state.id} value={state.id}>
              {state.State_Name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Status</label>
        <select
          className="form-control"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <div className="form-actions">
        <Button variant="secondary" onClick={() => navigate('/city')}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditCity;

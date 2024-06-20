import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../css/City.css';

const City = () => {
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/city');
      setCities(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/city/${selectedCity.id}`);
      setShowDeleteModal(false);
      fetchCities();
    } catch (error) {
      console.error('Error deleting city:', error);
    }
  };

  const filteredCities = cities.filter(city =>
    city.City_Name.toLowerCase().includes(search.toLowerCase()) ||
    city.City_code.toLowerCase().includes(search.toLowerCase()) ||
    city.State_Name.toLowerCase().includes(search.toLowerCase()) ||
    (city.Status ? 'active' : 'inactive').includes(search.toLowerCase())
  );

  return (
    <div className="city-container">
      <div className="city-header">
        <h1>City</h1>
        <input 
          type="text" 
          placeholder="Search..." 
          value={search} 
          onChange={handleSearch} 
          className="search-input"
        />
        <Button variant="primary" onClick={() => navigate('/add-city')}>Add New</Button>
      </div>
      <div className="table-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>City Name</th>
              <th>City Code</th>
              <th>State Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCities.map((city, index) => (
              <tr key={city.id}>
                <td>{index + 1}</td>
                <td>{city.City_Name}</td>
                <td>{city.City_code}</td>
                <td>{city.State_Name}</td>
                <td className={city.Status ? 'text-success' : 'text-danger'}>
                  {city.Status ? 'Active' : 'Inactive'}
                </td>
                <td>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => navigate(`/edit-city/${city.id}`)}
                  >
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setSelectedCity(city);
                      setShowDeleteModal(true);
                    }}
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default City;

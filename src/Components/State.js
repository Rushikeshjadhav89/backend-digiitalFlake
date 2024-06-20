import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../css/State.css';

const State = () => {
  const [states, setStates] = useState([]);
  const [search, setSearch] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/state');
      setStates(response.data);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/state/${selectedState.id}`);
      setShowDeleteModal(false);
      fetchStates();
    } catch (error) {
      console.error('Error deleting state:', error);
    }
  };

  const filteredStates = states.filter(state =>
    state.State_Name.toLowerCase().includes(search.toLowerCase()) ||
    state.State_code.toLowerCase().includes(search.toLowerCase()) ||
    (state.Status ? 'active' : 'inactive').includes(search.toLowerCase())
  );

  return (
    <div className="state-container">
      <div className="state-header">
        <h1>State</h1>
        <input 
          type="text" 
          placeholder="Search..." 
          value={search} 
          onChange={handleSearch} 
          className="search-input"
        />
        <Button variant="primary" onClick={() => navigate('/add-state')}>Add New</Button>
      </div>
      <div className="table-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>State Name</th>
              <th>State Code</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStates.map((state, index) => (
              <tr key={state.id}>
                <td>{index + 1}</td>
                <td>{state.State_Name}</td>
                <td>{state.State_code}</td>
                <td className={state.Status ? 'text-success' : 'text-danger'}>
                  {state.Status ? 'Active' : 'Inactive'}
                </td>
                <td>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => navigate(`/edit-state/${state.id}`)}
                  >
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setSelectedState(state);
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

export default State;

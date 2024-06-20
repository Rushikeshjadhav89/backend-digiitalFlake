import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import AddHouse from './AddHouse';
import EditHouse from './EditHouse';
import '../css/Warehouse.css';

const Warehouse = () => {
    const [warehouses, setWarehouses] = useState([]);
    const [search, setSearch] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentWarehouse, setCurrentWarehouse] = useState(null);
    const [deleteWarehouseId, setDeleteWarehouseId] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/warehouse')
            .then(response => setWarehouses(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const filteredWarehouses = warehouses.filter(warehouse =>
        warehouse.Name.toLowerCase().includes(search.toLowerCase()) ||
        warehouse.State_Name?.toLowerCase().includes(search.toLowerCase()) ||
        warehouse.City_Name?.toLowerCase().includes(search.toLowerCase()) ||
        (warehouse.Status ? 'active' : 'inactive').includes(search.toLowerCase())
    );

    const handleDelete = () => {
        axios.delete(`http://localhost:5000/api/warehouse/${deleteWarehouseId}`)
            .then(response => {
                setWarehouses(warehouses.filter(warehouse => warehouse._id !== deleteWarehouseId));
                setShowDeleteModal(false);
            })
            .catch(error => console.error('Error deleting warehouse:', error));
    };

    const handleAdd = (newWarehouse) => {
        setWarehouses([...warehouses, newWarehouse]);
    };

    const handleUpdate = (updatedWarehouse) => {
        setWarehouses(warehouses.map(warehouse =>
            warehouse._id === updatedWarehouse._id ? updatedWarehouse : warehouse
        ));
    };

    return (
        <div className="warehouse-container">
            <div className="warehouse-header">
                <h2>Warehouse</h2>
                <input 
                    type="text" 
                    placeholder="Search..." 
                    value={search} 
                    onChange={handleSearch} 
                    className="search-input"
                />
                <Button onClick={() => setShowAddForm(true)} variant='primary'>Add New</Button>
            </div>
            <div className="table-container">
                <table className='table table-dark table-hover'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>State</th>
                            <th>City</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredWarehouses.map((warehouse, index) => (
                            <tr key={warehouse._id}>
                                <td>{index + 1}</td>
                                <td>{warehouse.Name}</td>
                                <td>{warehouse.State_Name}</td>
                                <td>{warehouse.City_Name}</td>
                                <td className={warehouse.Status ? 'status-active' : 'status-inactive'}>
                                    {warehouse.Status ? 'Active' : 'Inactive'}
                                </td>
                                <td>
                                    <button 
                                        className="edit-btn" 
                                        onClick={() => {
                                            setCurrentWarehouse(warehouse);
                                            setShowEditForm(true);
                                        }}
                                    >✏️</button>
                                    <button 
                                        className="delete-btn" 
                                        onClick={() => {
                                            setDeleteWarehouseId(warehouse._id);
                                            setShowDeleteModal(true);
                                        }}
                                    >🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showAddForm && <AddHouse onClose={() => setShowAddForm(false)} onAdd={handleAdd} />}
            {showEditForm && <EditHouse 
                warehouse={currentWarehouse} 
                onClose={() => setShowEditForm(false)} 
                onUpdate={handleUpdate} 
            />}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Warehouse;

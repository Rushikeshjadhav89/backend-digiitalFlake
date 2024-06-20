import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import State from './State';
import City from './City';
import Warehouse from './Warehouse';
import '../css/Home.css'; 
import Digi from './Digi';

function Home() {
    const [selectedOption, setSelectedOption] = useState(null);

    const renderComponent = () => {
        switch (selectedOption) {
            case 'digi':
                return <Digi />;
            case 'state':
                return <State />;
            case 'city':
                return <City />;
            case 'warehouse':
                return <Warehouse />;
            default:
                return null;
        }
    };

    return (
        <div>
            <Navbar className="bg-body-tertiary" expand="lg">
                <Container fluid style={{ backgroundColor: '#662671' }}>
                    <Navbar.Brand href="#home" style={{ color: 'white' }}>
                        <img src='https://digitalflake.com/wp-content/uploads/2023/04/DF_logo-transparent2.png' alt="Logo" style={{ width: '100px', height: '50px' }} onClick={() => setSelectedOption(null)} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Navbar.Text style={{ color: 'white' }}>
                            <i className="fa fa-user" aria-hidden="true"></i>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div style={{ display: 'flex'}}>
                <div className="sidebar col-xs-4">
                    <ul>
                        <li onClick={() => setSelectedOption('digi')}>Home<i class="fa fa-caret-right" aria-hidden="true"></i></li>
                        <li onClick={() => setSelectedOption('state')}>State<i class="fa fa-caret-right" aria-hidden="true"></i></li>
                        <li onClick={() => setSelectedOption('city')}>City<i class="fa fa-caret-right" aria-hidden="true"></i></li>
                        <li onClick={() => setSelectedOption('warehouse')}>Warehouse<i class="fa fa-caret-right" aria-hidden="true"></i></li>
                    </ul>
                </div>
                
                <div className="content">
                    {renderComponent()}
                </div>
            </div>
        </div>
    );
}

export default Home;

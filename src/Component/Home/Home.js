import React, { useEffect, useState } from 'react';
import './Home.css';
import fakeData from '../../fakeData/fakeData.json'
import Vehicle from '../Vehicle/Vehicle';

const Home = () => {
    const [vehicle, setVehicle] = useState([])
    useEffect(() => {
        setVehicle(fakeData)
    }, [])
    return (
        <div className="home-container"> 
            <div className="vehicle-container">
                {
                    vehicle.map(vehicle => <Vehicle vehicle={vehicle}></Vehicle>)
                }
            </div>

        </div>
    );
};

export default Home;
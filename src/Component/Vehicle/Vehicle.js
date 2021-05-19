import React from 'react';
import { Link } from 'react-router-dom';
import './Vehicle.css'
const Vehicle = ({vehicle}) => {
    const {name,img} = vehicle
    return (
        <div className="vehicleDetails">
            <img src={img} alt="" />
            <Link to={`/vehicle/${name}`}><h3>{name}</h3></Link>
            
        </div>
    );
};

export default Vehicle;
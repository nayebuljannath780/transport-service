import React from 'react';
import './Destinaion.css'

const Destination = ({ ticket }) => {
    const { cost, people } = ticket;
    return (
        <div className="destination">
            <div>
                <img src={people} alt="" />
            </div>
            <h4>{cost}</h4>
        </div>
    );
};

export default Destination;
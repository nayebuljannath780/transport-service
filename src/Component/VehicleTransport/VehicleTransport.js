import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData/fakeData.json';
import Destination from '../Destination/Destination';
import './VehicleTransport.css';
import googleMap from '../../images/Map.png'


const VehicleTransport = () => {
    const [ticket, setTicket] = useState([])

    useEffect(() => {
        setTicket(fakeData)
    }, [])
    return (
        <div className="destination-container">
            <div>
                <form className="form">
                    <input type="text" placeholder="Ride From" />
                    <br />
                    <input type="text" placeholder="Ride to" />
                    <br />
                    <input type="submit" value="Submit" />
                </form>
                <div>
                    {
                        ticket.map(ticket => <Destination ticket={ticket}></Destination>)
                    }

                </div>
            </div>
            <div>
                <img src={googleMap} alt="" />
            </div>
        </div>
    );
};

export default VehicleTransport;
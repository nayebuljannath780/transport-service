import React, { useContext } from 'react';
import './Header.css'
import urbanRidersImg from '../../images/Urban Riders.png'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const Header = () => {
    const [loggedInUser,setLoggedInUser] = useContext(userContext)
    const classes = useStyles();
    return (
        <div className="header">
            <nav className="nav">
                <ul>
                    <li><img src={urbanRidersImg} alt="" /></li>
                    <li><Link to="/home"><p>Home</p></Link></li>
                    <li><Link to="/destination">Destination</Link></li>
                    <li><Link to="/blog">Blog</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <p>{loggedInUser.name}</p>
                    <div className={classes.root}>
                        <Link to="/login">
                            {loggedInUser.email  ? <Button onClick={() => setLoggedInUser({})} variant="contained" color="secondary">Logout</Button> : <Button variant="contained" color="secondary">Login</Button>}
                        </Link>
                    </div>
                    
                </ul>
            </nav>
        </div>
    );
};

export default Header;
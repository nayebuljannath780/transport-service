import React, { useContext, useState } from 'react';
import './Login.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [ loggedInUser,setLoggedInUser ] = useContext(userContext);
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } }
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false
    })
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    ///////////// /////////////////// //////////////// ////////////
    
    const handleSignIn = () => {
        firebase.auth().signInWithPopup(googleProvider)
            .then(res => {
                const { displayName, photoURL, email } = res.user;
                const singedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setUser(singedInUser);
                setLoggedInUser(singedInUser)
                history.replace(from)
            })
            .catch(error => {
                console.log(error)
                console.log(error.message)
                console.log(error.credential)
            })
    }
    //////////////// ////////////////// //////////////////// /////////////// ///////////
    const handleSignOut = () => {
        firebase.auth().signOut()
            .then(res => {
                const signOutUser = {
                    isSignedIn: false,
                    name: '',
                    email: '',
                    photo: ''

                }
                setUser(signOutUser)
            })
            .catch(error => {
                console.log(error)
            })
    }
    /////////////////////// ///////////////////// ///////////////
    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }
    ////////////////// //////////////////// ///////////// ///////////// ////////////// /////
    const handleSubmit = (e) => {
        // console.log(user.email ,user.password)
        if (newUser &&  user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    // Signed in 
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserName(user.name)
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                    // ...
                })
                .catch((error) => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo)
                    // ..
                });
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    // Signed in
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setLoggedInUser(newUserInfo)
                    history.replace(from)
                    // ...
                })
                .catch((error) => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo)
                });
        }
        e.preventDefault();

    }

    const updateUserName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        }).then(function () {
            console.log('User name updated successfully')
        }).catch(function (error) {
            // An error happened.
        });
    }

    const handleFbSignIn = () => {

        firebase
            .auth()
            .signInWithPopup(facebookProvider)
            .then(res => {
                const { displayName, photoURL, email } = res.user;
                const singedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setUser(singedInUser);
                setLoggedInUser(singedInUser)
                history.replace(from)

            })
            .catch((error) => {
                console.log(error)
                var errorCode = error.code;
                console.log(errorCode)
                var errorMessage = error.message;
                console.log(errorMessage)

            });
    }

    const handleGithubSignIn = () => {
        var githubProvider = new firebase.auth.GithubAuthProvider();
        firebase
            .auth()
            .signInWithPopup(githubProvider)
            .then(res => {
                const { displayName, photoURL, email } = res.user;
                const singedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setUser(singedInUser);
                setLoggedInUser(singedInUser)
                history.replace(from)
            }).catch((error) => {
                var errorCode = error.code;
                console.log(errorCode)
                var errorMessage = error.message;
                console.log(errorMessage)
                var email = error.email;
                console.log(email);
            });
    }
    return (
        <div className="login">
            <h1>Our own Authentication</h1>
            <form className="form" onSubmit={handleSubmit}>
                {newUser && <input type="text" name="name" placeholder="Enter Your Name" />}
                <br />
                <input type="text" onBlur={handleBlur} name="email" placeholder="Enter Your Email" required />
                <br />
                <input type="password" onBlur={handleBlur} name="password" id="" placeholder="Enter Your Password" required />
                <br />
                <input className="submit-btn" type="submit" value={newUser ? "Sign up" : "Sign in"} />
            </form>
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
            <label htmlFor="newUser">New User Sign up</label>
            <br />
            {user.isSignedIn ?
                <button className="submit-btn" onClick={handleSignOut}>Google Sign out</button> : <button className="submit-btn" onClick={handleSignIn}>Google Sign in</button>
            }
            <br />
            <button className="submit-btn" onClick={handleFbSignIn}>Facebook Login</button>
            <br />
            <button className="submit-btn" onClick={handleGithubSignIn}>Github Sign in</button>
            <p style={{ color: 'red' }}>{user.error}</p>
            {
                user.success && <p style={{ color: 'green' }}>User {newUser ? 'Created' : 'Logged in'} Successfully</p>
            }
        </div>
    );
};

export default Login;
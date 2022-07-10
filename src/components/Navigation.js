import { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import {Register, Login} from './index';
import { logout } from '../utils'

const Navigation = ({ authToken, setAuthToken, username, setUsername, BASE_URL }) => {

    const [registerShow, setRegisterShow] = useState(false);
    const [loginShow, setLoginShow] = useState(false);

    const handleLogout = () => {
        logout(setUsername, setAuthToken); 
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="navigation">
            <Container>
                <Navbar.Brand href="/">FitnessTrackr</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/routines">Routines</Nav.Link>
                    {authToken ? <Nav.Link href="/my-routines">MyRoutines</Nav.Link> : null}
                    <Nav.Link href="/activities">Activities</Nav.Link>
                    </Nav>
                    { authToken ? 
                    <Nav>
                        <h4>Hi, {username}!</h4> 
                        <Button variant="outline-light" className="header-button" onClick={() => handleLogout()}>
                            Logout
                        </Button>
                    </Nav> :
                        <Nav>
                            <Button variant="outline-light" className="header-button" onClick={() => setLoginShow(true)}>
                                Login
                            </Button>

                            <Login
                                show={loginShow}
                                onHide={() => setLoginShow(false)}
                                authToken={authToken} 
                                setAuthToken={setAuthToken} 
                                username={username} 
                                setUsername={setUsername}
                                BASE_URL={BASE_URL}
                            />
                            
                            <Button variant="primary" className="header-button" onClick={() => setRegisterShow(true)}> Register </Button>

                            <Register
                                show={registerShow}
                                onHide={() => setRegisterShow(false)}
                                authToken={authToken} 
                                setAuthToken={setAuthToken} 
                                username={username} 
                                setUsername={setUsername}
                                BASE_URL={BASE_URL}
                            />
                        </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation;
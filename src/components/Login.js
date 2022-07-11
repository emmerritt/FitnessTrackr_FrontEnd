import { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Alert from 'react-bootstrap/Alert';

const Login = ({show, onHide, authToken, setAuthToken, username, setUsername, BASE_URL }) => {

    const [newUsername, setNewUsername] = useState('')
    const [password, setPassword] = useState('')
    const [alertShow, setAlertShow] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleUsername = (e) => {
        setNewUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit= async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}users/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: newUsername,
                    password: password
                })
            })
            const json = await response.json()
            if(!json.error) {
                setAuthToken(json.token)
                setUsername(json.user.username)
                window.localStorage.setItem('ft-token', json.token)
                window.localStorage.setItem('ft-username', json.user.username)
                onHide();
            } else {
                setErrorMessage(json.message)
                setAlertShow(true)
                console.log(json)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Modal
        show={show}
        onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Sign in to FitnessTrackr
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="New Username"
                        autoFocus
                        value={newUsername}
                        onChange={handleUsername}
                    />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                        Password
                        </Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={handlePassword}
                        />
                    </Form.Group>
                    {alertShow ? <Alert variant='danger'>{errorMessage}</Alert> : null}
                    <Stack direction="horizontal" gap={2}>
                        <Button variant="outline-primary ms-auto" onClick={onHide}>Close</Button>
                        <Button variant="primary" type="submit">
                            Sign in
                        </Button>
                    </Stack>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default Login;
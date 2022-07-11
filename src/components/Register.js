import { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Alert from 'react-bootstrap/Alert'

const Register = ({show, onHide, authToken, setAuthToken, username, setUsername, BASE_URL }) => {

    const [newUsername, setNewUsername] = useState('')
    const [password, setPassword] = useState('')
    const [alertShow, setAlertShow] = useState(false)
    const [errorText, setErrorText] = useState('')

    const handleUsername = (e) => {
        setNewUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit= async (e) => {
        e.preventDefault();
        setAlertShow(false);

        try {
            const response = await fetch(`${BASE_URL}users/register`, {
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
            } else if(json.error) {
                setErrorText(json.message)
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
                Create Your Account
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
                    {alertShow ? <Alert variant='danger'>{errorText}</Alert> : null}
                    <Stack direction="horizontal" gap={2}>
                        <Button variant="outline-primary ms-auto" onClick={onHide}>Close</Button>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Stack>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default Register;
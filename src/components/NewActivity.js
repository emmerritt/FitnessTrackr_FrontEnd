import { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

const NewActivity = ({show, onHide, authToken, BASE_URL, getActivities }) => {

    const [activityName, setActivityName] = useState('')
    const [activityDescription, setActivityDescription] = useState('')

    const handleActivityName = (e) => {
        setActivityName(e.target.value);
    }

    const handleActivityDescription = (e) => {
        setActivityDescription(e.target.value)
    }

    const handleSubmit= async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}activities`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    name: activityName,
                    description: activityDescription
                })
            })
            const json = await response.json()
            if(!json.error) {
                getActivities();
                setActivityName('')
                setActivityDescription('')
                onHide();
            } else {
                // setRegResponse(json.error);
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
                Create a New Activity
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Activity Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Activity Name"
                        autoFocus
                        value={activityName}
                        onChange={handleActivityName}
                    />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                        Description
                        </Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Describe the Activity" 
                            value={activityDescription}
                            onChange={handleActivityDescription}
                        />
                    </Form.Group>
                    <Stack direction="horizontal" gap={2}>
                        <Button variant="outline-primary ms-auto" onClick={onHide}>Cancel</Button>
                        <Button variant="primary" type="submit">
                            Create
                        </Button>
                    </Stack>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default NewActivity;
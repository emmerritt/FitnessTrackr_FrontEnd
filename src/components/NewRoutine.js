import { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

const NewRoutine = ({show, onHide, authToken, BASE_URL, getRoutines }) => {

    const [routineName, setRoutineName] = useState('')
    const [routineGoal, setRoutineGoal] = useState('')

    const handleRoutineName = (e) => {
        setRoutineName(e.target.value);
    }

    const handleRoutineGoal = (e) => {
        setRoutineGoal(e.target.value)
    }

    const handleSubmit= async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}routines`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    name: routineName,
                    goal: routineGoal
                })
            })
            const json = await response.json()
            if(!json.error) {
                getRoutines();
                setRoutineName('')
                setRoutineGoal('')
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
                Create a New Routine
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Routine Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Routine Name"
                        autoFocus
                        value={routineName}
                        onChange={handleRoutineName}
                    />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                        Goal
                        </Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Give the Routine a Goal" 
                            value={routineGoal}
                            onChange={handleRoutineGoal}
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

export default NewRoutine;
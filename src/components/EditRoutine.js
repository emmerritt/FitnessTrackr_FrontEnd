import { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import ToggleButton from 'react-bootstrap/ToggleButton';

const EditRoutine = ({show, onHide, authToken, BASE_URL, getRoutines, name, goal, routineId, isPublic }) => {

    const [routineName, setRoutineName] = useState(name)
    const [routineGoal, setRoutineGoal] = useState(goal)
    const [routineIsPublic, setRoutineIsPublic] = useState(isPublic)
    const [checked, setChecked] = useState(isPublic);

    const handleRoutineName = (e) => {
        setRoutineName(e.target.value);
    }

    const handleRoutineGoal = (e) => {
        setRoutineGoal(e.target.value)
    }

    const handleIsPublic = (e) => {
        setChecked(e.currentTarget.checked)
        setRoutineIsPublic(e.currentTarget.checked)
    }

    const handleSubmit= async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}routines/${routineId}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    name: routineName,
                    goal: routineGoal,
                    isPublic: routineIsPublic
                })
            })
            const json = await response.json()
            console.log(json)
            if(!json.error) {
                getRoutines();
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
                Edit Routine
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
                    <ToggleButton
                        className="mb-2"
                        id="toggle-check"
                        type="checkbox"
                        variant="outline-primary"
                        checked={checked}
                        value="1"
                        onChange={handleIsPublic}
                    >
                        {checked ? <>Set to Private</> : <>Set to Public</> }
                    </ToggleButton>
                    <Stack direction="horizontal" gap={2}>
                        <Button variant="outline-primary ms-auto" onClick={onHide}>Cancel</Button>
                        <Button variant="primary" type="submit">
                            Publish Edits
                        </Button>
                    </Stack>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default EditRoutine;
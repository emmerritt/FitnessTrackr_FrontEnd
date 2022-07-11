import { useState, useEffect } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

const EditRoutineActivity = ({show, onHide, authToken, BASE_URL, activityName, routineActivityId, count, duration, getRoutines }) => {

    const [name, setName] = useState(activityName)
    const [activityCount, setActivityCount] = useState(count)
    const [activityDuration, setActivityDuration] = useState(duration) 

    const handleActivityCount = (e) => {
        setActivityCount(e.target.value);
    }

    const handleActivityDuration = (e) => {
        setActivityDuration(e.target.value)
    }

    const handleSubmit= async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}routine_activities/${routineActivityId}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    routineActivityId: routineActivityId,
                    count: activityCount,
                    duration: activityDuration
                })
            })
            const json = await response.json()
            console.log(json)
            if(!json.error) {
                getRoutines();
                setActivityCount('')
                setActivityDuration('')
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
                Edit this Routine Activity
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Activity</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Activity Count"
                        disabled
                        readOnly
                        value={name}
                        onChange={setName}
                    />
                    <Form.Label>Activity Count</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Activity Count"
                        autoFocus
                        value={activityCount}
                        onChange={handleActivityCount}
                    />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label>
                        Activity Duration
                        </Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Activity Duration" 
                            value={activityDuration}
                            onChange={handleActivityDuration}
                        />
                    </Form.Group>
                    <Stack direction="horizontal" gap={2}>
                        <Button variant="outline-primary ms-auto" onClick={onHide}>Cancel</Button>
                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                    </Stack>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default EditRoutineActivity;
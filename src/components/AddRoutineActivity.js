import { useState, useEffect } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

const AddRoutineActivity = ({show, onHide, authToken, BASE_URL, getRoutines, routineId }) => {

    const [activityCount, setActivityCount] = useState('')
    const [activityDuration, setActivityDuration] = useState('')
    const [activities, setActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState('')

    const getActivities = async () => {
        try {
            const response = await fetch(BASE_URL+'activities')
            const JSON = await response.json();
            console.log(JSON);
            setActivities(JSON)
        } catch (err) {
            console.log('There has been an error in getting activities.', err)
        }
    }    

    useEffect(() => {
        getActivities();
    }, []);

    const handleActivityCount = (e) => {
        setActivityCount(e.target.value);
    }

    const handleActivityDuration = (e) => {
        setActivityDuration(e.target.value)
    }

    const handleSelectedActivity = (e) => {
        setSelectedActivity(e.target.value)
        console.log(selectedActivity)
    }

    const handleSubmit= async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}routines/${routineId}/activities`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    activityId: selectedActivity,
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
                Add Activity to this Routine
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Select 
                        aria-label="Default select"
                        value={selectedActivity}
                        onChange={handleSelectedActivity}
                    >
                        <option>Choose an activity</option>
                        {activities.map(activity => {
                            return (<option value={activity.id} key={activity.id}>{activity.name}</option>)
                        })}
                    </Form.Select>
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
                            Add
                        </Button>
                    </Stack>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default AddRoutineActivity;
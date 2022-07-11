import { useState } from 'react';

import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import EditRoutine from './EditRoutine';
import AddRoutineActivity from './AddRoutineActivity';
import EditRoutineActivity from './EditRoutineActivity';

const MyRoutineCard = ({ authToken, routine, username, BASE_URL, getRoutines }) => {
    const { name, creatorName, goal, activities, id, isPublic } = routine;
    const [editRoutineShow, setEditRoutineShow] = useState(false);
    const [routineActivitiesShow, setRoutineActivitiesShow] = useState(false);
    const [editRoutineActivityShow, setEditRoutineActivityShow] = useState(false);

    const handleRoutineDelete = async () => {
        try {
            const response = await fetch(`${BASE_URL}routines/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            })
            const json = await response.json()
            console.log(json)
            if(!json.error) {
                getRoutines();
            } else {
                // setRegResponse(json.error);
                console.log(json)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleRoutineActivityDelete = async (routineActivityId) => {
        try {
            const response = await fetch(`${BASE_URL}routine_activities/${routineActivityId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            })
            const json = await response.json()
            console.log(json)
            if(!json.error) {
                getRoutines();
            } else {
                // setRegResponse(json.error);
                console.log(json)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Card>
            <Card.Header as="h5">
                <Stack direction="horizontal" gap={3}>
                    {name}  
                    <>

                    <Button variant="primary ms-auto" size="sm" onClick={() => setEditRoutineShow(true)}>Edit</Button>
                    <EditRoutine
                        show={editRoutineShow}
                        onHide={() => setEditRoutineShow(false)}
                        authToken={authToken} 
                        username={username}
                        BASE_URL={BASE_URL}
                        name={name}
                        goal={goal}
                        routineId={id}
                        isPublic={isPublic}
                        getRoutines={getRoutines}
                    />

                    <Button variant="danger" size="sm" onClick={handleRoutineDelete}>Delete</Button>
                    </>

                </Stack>
            </Card.Header>
            <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">Created by: {creatorName}</Card.Subtitle>
                <Card.Text>
                Goal: {goal}
                </Card.Text>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Activities</Accordion.Header>
                        <Accordion.Body>
                            <ListGroup variant="flush" className="activity-list">
                                {activities.map(activity => {
                                    return (
                                        <ListGroup.Item className="d-flex justify-content-between align-items-start" key={activity.id}>
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">{activity.name}</div>
                                                {activity.description}
                                                <div className="mb-2 text-muted">Duration: {activity.duration}</div>
                                            </div>
                                            <div>
                                            <Stack direction="vertical" gap={3}>
                                                <div>Count: <Badge bg="primary" pill>{activity.count}</Badge>
                                                </div>
                                                <div>

                                                <Stack direction="horizontal" gap={2}>
                                                    <Button variant="outline-primary ms-auto" size="sm" onClick={() => setEditRoutineActivityShow(true)}>Edit</Button>
                                                    <EditRoutineActivity
                                                        show={editRoutineActivityShow}
                                                        onHide={() => setEditRoutineActivityShow(false)}
                                                        authToken={authToken} 
                                                        username={username}
                                                        BASE_URL={BASE_URL}
                                                        activityName={activity.name}
                                                        routineActivityId={activity.routineActivityId}
                                                        count={activity.count}
                                                        duration={activity.duration}
                                                        routineId={id}
                                                        getRoutines={getRoutines}
                                                    />

                                                    <Button variant="outline-danger" size="sm" onClick={() => {handleRoutineActivityDelete(activity.routineActivityId)}}>Delete</Button>
                                                </Stack>
                                                </div>
                                            </Stack>
                                            </div>
                                        </ListGroup.Item>
                                    )
                                })}
                            </ListGroup>
                            <div>
                                <Button variant="outline-primary" onClick={() => setRoutineActivitiesShow(true)}>
                                    Add Activity
                                </Button>

                                <AddRoutineActivity
                                    show={routineActivitiesShow}
                                    onHide={() => setRoutineActivitiesShow(false)}
                                    authToken={authToken} 
                                    username={username}
                                    BASE_URL={BASE_URL}
                                    getRoutines={getRoutines}
                                    routineId={id}
                                />
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Card.Body>
        </Card>
    )
}

export default MyRoutineCard;
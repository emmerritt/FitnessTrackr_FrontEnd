import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';


const RoutineCard = ({ routine }) => {
    const { name, creatorName, goal, activities } = routine;

    return (
        <Card>
            <Card.Header as="h5">{name}</Card.Header>
            <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">Created by: {creatorName}</Card.Subtitle>
                <Card.Text>
                Goal: {goal}
                </Card.Text>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Activities</Accordion.Header>
                        <Accordion.Body>
                            <ListGroup variant="flush">
                                {activities.map(activity => {
                                    return (
                                        <ListGroup.Item className="d-flex justify-content-between align-items-start" key={activity.id}>
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">{activity.name}</div>
                                                {activity.description}
                                                <div className="mb-2 text-muted">Duration: {activity.duration}</div>
                                            </div>
                                            <div>
                                                Count: <Badge bg="primary" pill>{activity.count}</Badge>
                                            </div>
                                        </ListGroup.Item>
                                    )
                                })}
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Card.Body>
        </Card>
    )
}

export default RoutineCard;
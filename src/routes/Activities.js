import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';

import { NewActivity } from "../components";

const Activities = ({ BASE_URL, authToken }) => {

    const [activities, setActivities] = useState([]);
    const [createActivityShow, setCreateActivityShow] = useState(false);

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

    return (
        <Container>
            <h1>Activities</h1>
            { authToken ?
            <div>
                <Button variant="outline-primary" onClick={() => setCreateActivityShow(true)}>
                    Create Activity
                </Button>

                <NewActivity
                    show={createActivityShow}
                    onHide={() => setCreateActivityShow(false)}
                    authToken={authToken} 
                    BASE_URL={BASE_URL}
                    getActivities={getActivities}
                />
            </div> :
            null
            }
            <Table striped hover className='activity-list'>
                <thead>
                    <tr>
                    <th>Activity Name</th>
                    <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {activities.map(activity => {
                        return (
                            <tr key={activity.id}>
                                <td>{activity.name}</td>
                                <td>{activity.description}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </Container>
    )
}

export default Activities;
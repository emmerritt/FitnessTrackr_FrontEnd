import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { MyRoutineCard } from "../components";
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { NewRoutine } from '../components'

const MyRoutines = ({BASE_URL, authToken, username}) => {

    const navigate = useNavigate();
    const [routines, setRoutines] = useState([]);
    const [createRoutineShow, setCreateRoutineShow] = useState(false);

    const getMyRoutines = async () => {
        try {
            const response = await fetch(`${BASE_URL}users/${username}/allroutines`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            })
            const JSON = await response.json();
            // const myRoutines = JSON.filter(routine => {
            //     return routine.creatorName === username;
            // })

            setRoutines(JSON)
        } catch (err) {
            console.log('There has been an error in getting routines.', err)
        }
    }    

    useEffect(() => {
        if (!authToken) {
            navigate('/')
        }
        getMyRoutines();
        console.log(routines);
    }, []);

    return (
        <Container >
            <h1>My Routines</h1>
            { authToken ?
            <div>
                <Button variant="outline-primary" onClick={() => setCreateRoutineShow(true)}>
                    Create Routine
                </Button>

                <NewRoutine
                    show={createRoutineShow}
                    onHide={() => setCreateRoutineShow(false)}
                    authToken={authToken} 
                    username={username}
                    BASE_URL={BASE_URL}
                    getRoutines={getMyRoutines}
                />
            </div> :
            null
            }
            <Stack gap={2} className="col-md-10 mx-auto routine-cards">
                {routines.map(routine => {
                    return <MyRoutineCard key={routine.id} routine={routine} authToken={authToken} username={username} getRoutines={getMyRoutines} BASE_URL={BASE_URL} />
                })}
            </Stack>
        </Container>
    )
}

export default MyRoutines;
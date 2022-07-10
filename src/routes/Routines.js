import { useState, useEffect } from "react";
import { RoutineCard } from "../components";
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';

const Routines = ({BASE_URL}) => {

    const [routines, setRoutines] = useState([]);

    const getRoutines = async () => {
        try {
            const response = await fetch(BASE_URL+'routines')
            const JSON = await response.json();

            setRoutines(JSON)
        } catch (err) {
            console.log('There has been an error in getting routines.', err)
        }
    }    

    useEffect(() => {
        getRoutines();
    }, []);

    return (
        <Container >
            <h1>Routines</h1>
            <Stack gap={2} className="col-md-10 mx-auto routine-cards">
                {routines.map(routine => {
                    return <RoutineCard key={routine.id} routine={routine}/>
                })}
            </Stack>
        </Container>
    )
}

export default Routines;
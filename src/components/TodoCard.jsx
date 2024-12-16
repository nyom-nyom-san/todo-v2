import { useContext, useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { TodoContext } from "../context/Context";

export default function TodoCard({ todo }) {
    const completed = todo.completed
    const border = completed ? "success" : "danger"
    const [timer, setTimer] = useState(0)
    const [timeInterval, setTimeInterval] = useState(null)
    const setTodos = useContext(TodoContext).setTodos


    //Function to start the timer
    const startTimer = () => {
        if (timeInterval === null) {
            const intervalID = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1)
            }, 1000)
            setTimeInterval(intervalID)
        }
    }

    const pauseTimer = () => {
        clearInterval(timeInterval)
        setTimeInterval(null)
    }


    const resetTimer = () => {
        clearInterval(timeInterval)
        setTimeInterval(null)
        setTimer(0)
    }

    const trash = () => {
        // Delete the todo item from the database
        setTodos((prevTodos) =>
            prevTodos.filter((prevTodo) => prevTodo.id !== todo.id)
        )
    }


    useEffect(() => {
        return () => {
            clearInterval(timeInterval)
        }
    }, [timeInterval])


    //Card body part
    return (
        <>
            <Card border={border} className="my-3">
                <Card.Header>{!completed && "Not"} Completed</Card.Header>
                <Card.Body>
                    <Card.Title>{todo.title}</Card.Title>
                    <Card.Text>{todo.description}</Card.Text>

                    <p>Timer {timer} seconds</p>
                    <Button onClick={startTimer}>
                        <i className="bi bi-play"></i>
                    </Button>

                    <Button onClick={pauseTimer} className="mx-2">
                        <i className="bi bi-pause-fill"></i>
                    </Button>

                    <Button onClick={resetTimer} className="mx-2">
                        <i className="bi bi-arrow-clockwise"></i>
                    </Button>

                    <Button onClick={trash} variant="danger" className="ms-2">
                        <i className="bi bi-trash3"></i>
                    </Button>

                    <Button onClick={`todo/${todo.id}`} variant="secondary" className="ms-2">
                        <i className="bi bi-pencil"></i>
                    </Button>
                </Card.Body>
            </Card>
        </>
    )
}
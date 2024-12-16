import { useContext, useState } from "react"
import { Button } from "react-bootstrap"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import { TodoContext } from "../context/Context"
import { useNavigate, useParams } from "react-router-dom"

export default function EditTodo() {
    const setTodos = useContext(TodoContext).setTodos
    const todos = useContext(TodoContext).todos
    const navigate = useNavigate()
    const id = parseInt(useParams().id)
    const currentTodo = todos.filter((todo) => todo.id === id)[0];
    const [title, setTitle] = useState(currentTodo.title)
    const [description, setdesc] = useState(currentTodo.description)
    const [completed, setCompleted] = useState(currentTodo.completed)

    function updateTodo(event) {
        event.preventDefault()
        const updateTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { id, title, description, completed }
            }
            return todo
        })
        setTodos(updateTodos)
        navigate("/")
    }

    return (
        <Container>
            <h1 className="my-3">AddTodo</h1>
            <Form onSubmit={updateTodo}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Get Software Dev Job" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control value={description} onChange={(e) => setdesc(e.target.value)} as="textarea" rows={3} placeholder={`1. Create an amazing project\n2. Netflix n' Chill\n3. Sleep`} required />
                </Form.Group>

                <Form.Check id="completed" label="Mark as Completed" type="checkbox" checked={completed} className="mb-3" onChange={(e) => setCompleted(e.target.checked)} />

                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}
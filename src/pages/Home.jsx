import { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { TodoContext } from "../context/Context";
import TodoCard from "../components/TodoCard";

export default function Home() {
    const todos = useContext(TodoContext).todos
    return (
        <Container>
            <h1 className="my-3">TODOS</h1>
            <Row>
                <CardGroup todos={todos} />
            </Row>
        </Container>
    )
}



function CardGroup({ todos }) {
    return todos.map((todo) => {
        return (
            <Col key={todo.id} md={4}>
                <TodoCard todo={todo} />
            </Col>
        )
    })
}
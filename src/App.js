import 'bootstrap/dist/css/bootstrap.min.css';
import {Container,Row,Col,Form,Button} from "react-bootstrap";
import {useState} from "react";

function App() {

  const [message, setMessage] = useState('')
  const [username, setUsername] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return <Container>
    <Row className="justify-content-md-center mx-5">

      <Col md="auto">{message}</Col>

    </Row>
    <Row className="justify-content-md-center mx-5">

      <Col md="9">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Start typing" defaultValue={message}
                          onChange={(e)=> setMessage(e.target.value)} />
          </Form.Group>
        </Form>
      </Col>
      <Col md="auto">
        <Button>Send</Button>
      </Col>

    </Row>
  </Container>
}

export default App;

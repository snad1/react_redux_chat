import 'bootstrap/dist/css/bootstrap.min.css';
import {Container,Row,Col,Form,Button} from "react-bootstrap";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

function App() {

  const [message, setMessage] = useState('')
  const [username, setUsername] = useState('me')
  const state = useSelector((state)=>state)
  const dispatch = useDispatch()

  console.log(state)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(message)
    sendMessage()
  }

  const sendMessage = () => {
    dispatch({type: 'ADD_MESSAGE', payload: {username, message}})
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
        <Button onClick={sendMessage}>Send</Button>
      </Col>

    </Row>
  </Container>
}

export default App;

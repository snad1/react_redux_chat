import 'bootstrap/dist/css/bootstrap.min.css';
import {Container,Row,Col,Form,Button} from "react-bootstrap";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

function App() {

  const [message, setMessage] = useState('')
  const [username, setUsername] = useState('mee')
  const state = useSelector((state)=>state)
  const dispatch = useDispatch()
  const messages = state.messages

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
    <Row className="justify-content-md-between mx-5">
      <Col md="12">
        <div className="d-flex flex-column justify-content-md-between vh-100">
          <div className="h-100 overflow-auto">
            {state.messages.map((item,i)=>{
              if(item.username === username)
                return <Row key={i} className="justify-content-md-end mx-5">
                  <Col md="auto">
                    {item.message}
                  </Col>
                </Row>
              else {
                return <Row key={i} className="justify-content-md-start mx-5">
                  <Col md="auto">
                    {item.message}
                  </Col>
                </Row>
              }
            })}
          </div>
          <Row className="justify-content-md-between mx-5">
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
        </div>
      </Col>
    </Row>
  </Container>
}

export default App;

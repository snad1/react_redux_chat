import 'bootstrap/dist/css/bootstrap.min.css';
import {Container,Row,Col,Form,Button} from "react-bootstrap";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

function App() {

  const [message, setMessage] = useState('')
  const [username, setUsername] = useState('')
  const [hasEntered, setHasEntered] = useState(false)
  const state = useSelector((state)=>state)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage()
  }

  const handleEnteredSubmit = (e) => {
    e.preventDefault()
    handleEnterChat()
  }

  const sendMessage = () => {
    dispatch({type: 'ADD_MESSAGE', payload: {username, message}})
    setMessage('')
  }

  const handleEnterChat = () => {
    if(username.length > 0){
      setHasEntered(true)
      setMessage('')
    }
  }

  return <Container>
    <Row className="justify-content-md-between mx-md-5 mx-sm-0">
      <Col md="12">
        {!hasEntered ?
            <div className="d-flex flex-column justify-content-center vh-100">
              <h1>Username</h1>
              <Row className="justify-content-md-between">
                <Col md="9">
                  <Form onSubmit={handleEnteredSubmit}>
                    <Form.Control type="text" placeholder="Enter your username" value={username||''}
                           onChange={(e)=> setUsername(e.target.value)} />
                  </Form>
                </Col>
                <Col md="auto">
                  <Button onClick={handleEnterChat}>Enter Chat room</Button>
                </Col>

              </Row>
            </div>
            :
            <div className="d-flex flex-column justify-content-between vh-100 py-5">
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
              <Row className="justify-content-md-between mx-md-5 mx-sm-1">
                <Col md="9">
                  <Form onSubmit={handleSubmit}>
                    <Form.Control type="text" placeholder="Start typing" value={message||''}
                           onChange={(e)=> setMessage(e.target.value)} />
                  </Form>
                </Col>
                <Col md="auto">
                  <Button onClick={sendMessage}>Send</Button>
                </Col>

              </Row>
            </div>
        }
      </Col>
    </Row>
  </Container>
}

export default App;

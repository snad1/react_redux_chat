import 'bootstrap/dist/css/bootstrap.min.css';
import {Container,Row,Col,Form,Button} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import Sender from "./components/Sender";
import Receiver from "./components/Receiver";

function App() {

  const [message, setMessage] = useState('')
  const [username, setUsername] = useState('')
  const [hasEntered, setHasEntered] = useState(false)
  const [offset, setOffset] = useState(25)
  const state = useAppSelector((state)=>state)
  const dispatch = useAppDispatch()
  const scrollDown = useRef(null)

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
    setOffset(offset+1)
    scrollDown.current?.scrollIntoView({behavior:"smooth"})
  }

  const handleEnterChat = () => {
    if(username.length > 0){
      setHasEntered(true)
      setMessage('')
    }
  }

  const scrollTopLoadMore = (e) => {
    if (e.target.scrollTop === 0 && state.messages.length > offset) {
      console.log(offset)
      setOffset(offset+25)
    }
  };

  useEffect(()=>{
    scrollDown.current?.scrollIntoView({behavior:"smooth"})
  })

  return <Container>
    <Row className="justify-content-md-between mx-md-5 mx-sm-0 bg-dark bg-opacity-10">
      <Col md="12">
        {!hasEntered ?
            <div className="d-flex flex-column justify-content-center vh-100">
              <h1>Username</h1>
              <Row className="justify-content-md-between">
                <Col md="9">
                  <Form onSubmit={handleEnteredSubmit}>
                    <Form.Control type="text" placeholder="Enter your username" value={username||''} data-testid="username_input"
                           onChange={(e)=> setUsername(e.target.value)} />
                  </Form>
                </Col>
                <Col md="auto">
                  <Button onClick={handleEnterChat}>Enter Chat room</Button>
                </Col>

              </Row>
            </div>
            :
            <div className="d-flex flex-column justify-content-between vh-100 pt-5">
              <div className="h-100 overflow-auto" onScroll={scrollTopLoadMore} data-testid="messages_container">
                  {state.messages.slice(state.messages.length-offset).map((item,i)=>{
                    if(item.username === username)
                      return <Sender key={i} message={item.message}/>
                    else {
                      return<Receiver key={i} message={item.message}/>
                    }
                  })}
                <div ref={scrollDown}/>
              </div>
              <div className="d-flex justify-content-between mx-md-5 mx-sm-1 py-3 px-2 bg-primary">
                <div className="w-100 me-3">
                  <Form onSubmit={handleSubmit}>
                    <input type="text" className="rounded-5 form-control border-0" placeholder="Start typing" value={message||''}
                           data-testid="message_input" onChange={(e)=> setMessage(e.target.value)} />
                  </Form>
                </div>
                <Button onClick={sendMessage} className="bg-white text-black rounded-5">Send</Button>
              </div>
            </div>
        }
      </Col>
    </Row>
  </Container>
}

export default App;

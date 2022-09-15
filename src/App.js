import 'bootstrap/dist/css/bootstrap.min.css';
import {Container,Row,Col,Form,Button} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "./app/hooks";

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
            <div className="d-flex flex-column justify-content-between vh-100 pt-5">
              <div className="h-100 overflow-auto" onScroll={scrollTopLoadMore}>
                  {state.messages.slice(state.messages.length-offset).map((item,i)=>{
                    if(item.username === username)
                      return <div key={i} className="d-flex justify-content-end me-md-5 my-2">
                        <div className="p-3 rounded-4 bg-dark bg-opacity-10 me-1">
                          {item.message}
                        </div>
                        <img src="https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png"
                             className="rounded-circle shadow-4"
                             style={{width: 40, height: 40}}
                             alt="Avatar"/>
                      </div>
                    else {
                      return <div key={i} className="d-flex justify-content-start ms-md-5 my-2">
                        <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                             className="rounded-circle shadow-4 me-1"
                             style={{width: 40, height: 40}}
                             alt="Avatar"/>
                        <div className="p-3 rounded-4 bg-info bg-opacity-10">
                          {item.message}
                        </div>
                      </div>
                    }
                  })}
                <div ref={scrollDown}/>
              </div>
              <div className="d-flex justify-content-between mx-md-5 mx-sm-1 py-3 px-2 bg-primary">
                <div className="w-100 me-3">
                  <Form onSubmit={handleSubmit}>
                    <input type="text" className="rounded-5 form-control border-0" placeholder="Start typing" value={message||''}
                           onChange={(e)=> setMessage(e.target.value)} />
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

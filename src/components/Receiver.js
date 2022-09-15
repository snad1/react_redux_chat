const Receiver = ({message}) => <div className="d-flex justify-content-start ms-md-5 my-2">
    <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
         className="rounded-circle shadow-4 me-1"
         style={{width: 40, height: 40}}
         alt="Avatar"/>
    <div className="p-3 rounded-4 bg-info bg-opacity-10">
        {message}
    </div>
</div>

export default Receiver

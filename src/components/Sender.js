const Sender = ({message}) => <div className="d-flex justify-content-end ms-md-5 my-2">
    <div className="p-3 rounded-4 bg-dark bg-opacity-10 me-1">
        {message}
    </div>
    <img src="https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png"
         className="rounded-circle shadow-4"
         style={{width: 40, height: 40}}
         alt="Avatar"/>
</div>

export default Sender

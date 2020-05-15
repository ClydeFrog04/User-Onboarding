import React, {useEffect, useState} from 'react';
import './App.css';
import Form from "./components/Form";
import axios from "axios";

function App() {
    const [users, setUsers] = useState([]);


    const usersElements = users.map(user =>{
        return(
            <pre key={user.id}>{user}</pre>
        );
    });

    return (
        <div className="App">
            <Form setUsers={setUsers} users={users}/>
            {usersElements}
        </div>
    );
}

export default App;
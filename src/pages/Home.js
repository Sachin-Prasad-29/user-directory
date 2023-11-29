// Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserList from '../components/UserList';

const Home = () => {
    const userUrl = "https://jsonplaceholder.typicode.com/users"
    const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(userUrl); 
        console.log(response.data);
        
        setUsers(response.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData(); 
  }, []); 

  return (
    <div>
      <h1>Home Page</h1>
      {users.map((user)=>
        <UserList user={user}/>
      )}
    </div>
  );
};

export default Home;

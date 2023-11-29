import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/Home.css';
import UserList from '../components/UserList';
import CONSTANTS from '../assets/contants.json';

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(CONSTANTS.userUrl);

        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <header>Directory</header>
      {users.map((user) => (
        <UserList user={user} key={user.id} />
      ))}
    </div>
  );
};

export default Home;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/UserList.css';

const UserList = ({ user }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/${user.id}`, { state: { user } });
  };
  return (
    <div className="main_box" onClick={handleClick}>
      <div className="left">
        Name : <span>{user.name}</span>
      </div>
      <div className="right">
        Posts: <span>10</span>
      </div>
    </div>
  );
};

export default UserList;

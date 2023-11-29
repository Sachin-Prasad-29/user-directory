import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './css/Profile.css';
import DigitalClock from '../components/DigitalClock';
import CONSTANTS from '../assets/contants.json';
import PostCard from '../components/PostCard';

const Post = () => {
  const location = useLocation();
  const { user } = location.state || {};
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postRes = await axios.get(CONSTANTS.postUrl);
        setPosts(postRes.data.filter((post) => post.userId === user.id));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setVisiblePosts(posts.slice(0, 3));
      } else {
        setVisiblePosts(posts.slice(0, 1));
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [posts]);

  return (
    <div className="main_div">
      <div className="upper_header_div">
        <div className="sub_header_div">
          <button
            onClick={() => {
              navigate(`/`);
            }}
          >
            Back
          </button>
        </div>
        <div>
          <DigitalClock />
        </div>
      </div>

      <div className="user_details_main">
        <div className="user_detail_div">
          <div>{user.name}</div>
          <div>{user.address.street}</div>
        </div>
        <div className="user_detail_div">
          <div>
            {user.username} | {user.company.catchPhrase}
          </div>
          <div>
            {user.email} | {user.phone}
          </div>
        </div>
      </div>

      <div className="post_list_div">
        {visiblePosts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
};

export default Post;

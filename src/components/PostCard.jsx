import React, { useState, useRef, useEffect } from 'react';
import './css/PostCard.css';
const PostCard = ({ post }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const popupRef = useRef(null);

  const handleButtonClick = () => {
    setPopupVisible(!isPopupVisible);
  };

  const handleOutsideClick = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setPopupVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="post_card">
      <div onClick={handleButtonClick}>
        <div className="post_title">Title : {post.title}</div>
        <br />
        <div>{post.body}</div>
      </div>
      {isPopupVisible && (
        <div ref={popupRef} className="popup_style">
          <p>UserId : {post.userId}</p>
          <p>Title : {post.title}</p>
          <p>{post.body}</p>
        </div>
      )}
    </div>
  );
};

export default PostCard;

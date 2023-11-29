// Routes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Post from './pages/Profile';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/post" element={<Post />} /> */}
        <Route path='/post/:id' element={<Post></Post>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

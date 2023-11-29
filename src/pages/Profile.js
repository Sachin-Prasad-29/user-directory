// Post.js
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './css/Profile.css'
import DigitalClock from '../components/DigitalClock';

const Post = () => {
    const location = useLocation();
    const { user } = location.state || {};
    const postUrl = "https://jsonplaceholder.typicode.com/posts"
    const countryUrl = "http://worldtimeapi.org/api/timezone"
    const [countries, setCountries] = useState([])
    const [posts, setPosts] = useState([])
    const [selectedOption, setSelectedOption] = useState('');
    const [visiblePosts, setVisiblePosts] = useState([]);
    const [timer,setTimer] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const countryRes = await axios.get(countryUrl);
                setCountries(countryRes.data);

                const postRes = await axios.get(postUrl)
                setPosts(postRes.data.filter(post => post.userId === user.id))
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
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

    const handleSelectChange = async (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        try {
            const response = await axios.get(`${countryUrl}/${selectedValue}`);
            setTimer(response.data.datetime.substring(11,19))
            console.log(response.data.datetime.substring(11,19));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    return (
        <div className='main_div'>
            <div className='upper_header_div'>
                <div className='sub_header_div'><button>Back</button></div>
                <div className='sub_header_div'>
                    <select value={selectedOption} onChange={handleSelectChange}>
                        {countries.map(country =>
                            <option value={country}>{country}</option>
                        )}
                    </select>
                    <span><DigitalClock t={timer}/></span>
                    <button>Pause/Start</button>
                </div>
            </div>

            <div className='user_details_main'>
                <div className='user_detail_div'>
                    <div>
                        {user.name}
                    </div>
                    <div>
                        {user.address.street}
                    </div>
                </div>
                <div className='user_detail_div'>
                    <div>
                        {user.username} |  {user.company.catchPhrase}
                    </div>
                    <div>
                        {user.email} | {user.phone}
                    </div>
                </div>
            </div>

            <div className='post_list_div'>
                {visiblePosts.map((post, index) => (
                    <div key={index} className='post_card'>
                        <div className='post_title'>Title : {post.title}</div>
                        <br />
                        <div>{post.body}</div>
                    </div>
                ))}


            </div>

        </div>
    );
};

export default Post;

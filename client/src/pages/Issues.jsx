import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';

const Issues = () => {

    const url = process.env.REACT_APP_URL;
    console.log(url)
    const [posts, setPosts] = useState('');

    useEffect(()=>{
      const fetchData = async ()=>{
        try{
          const res = await axios.get(url)
          setPosts(res.data);
        } catch(err) {
          console.log(err)
        }
      }
        fetchData();
      },[url]);

  return (
    <div>
      <p>Hello from home</p>
      {
        posts && <div>
        {posts.map((post, index)=>{
            return(
              <div key={post.id}>
                <p>Hello Hello {post.username}</p>
              </div>
            )
          })}
        </div>
      }
    </div>
  )
}

export default Issues;

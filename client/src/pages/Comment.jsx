import React, { useContext } from 'react'
import { useState } from 'react'
import moment from 'moment';
import { AuthContext } from '../context/authContext';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Comment = ({pur_issue_id, issue_description}) => {

const { currentUser } = useContext(AuthContext);
console.log("current user is ", currentUser)
console.log("pur_issue_id", pur_issue_id)

const navigate = useNavigate();

const [comment, setComment] = useState('');
const [data, setData] = useState([]);

const handleSubmit = (e)=>{
    e.preventDefault();
    if(!comment ) {
        console.log("Enter values");
    } else {
            console.log(comment, currentUser.username)
            axios.post ('https://deployserver-production-e464.up.railway.app/addcomment', {
                comment,
                recorded_date : moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                recorded_by: currentUser.username,
                issue_id: pur_issue_id
            }).then(()=>{
                setComment('')
                navigate('/issues')
                setTimeout(() => {
                    loadData();
                }, 500);
            }).catch((err)=>{
                console.log(err);
            })
        }
}

const loadData = async () => {
    const response = await axios.get(`https://deployserver-production-e464.up.railway.app/getcomments/${pur_issue_id}`);
    setData(response.data);
}

useEffect (()=>{
    loadData();
},[currentUser])

  return (
        <div className='comments'>
                 <div className='desc'>
                    <h4>Description</h4>
                    <p>{issue_description}</p>
                </div>
                <div className="comment">
                 <h4>Follow ups</h4>
       
                    {data && <div className='comment-section'>
                        {data.map((comment)=>{
                        return (
                        <div className="comments-map" key={comment.comment_id}>
                            <div className="single-comment">
                                <p>{comment.comment}</p>
                            </div>
                            <div className="user-details">
                                <p>{comment.recorded_by}</p>
                                <p>{moment(comment.recorded_date).format('D MMMM YYYY, dddd')}</p>
                            </div>
                            
                        </div>
                        )
                        })}
                    </div>}
                 <form action="">
                    <textarea 
                    name="comment" 
                    id="comment" 
                    cols="67" 
                    rows="1"
                    placeholder="Comment"
                    onChange={(e)=>{setComment(e.target.value)}} 
                     />
                    <button onClick={handleSubmit}>Submit</button>
                 </form>
                 </div>            
        </div>
  )
}
export default Comment;

import React, { useContext } from 'react'
import { useState } from 'react'
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai"
import moment from 'moment';
import { AuthContext } from '../context/authContext';
import Comment from './Comment';

const SinglePurchaseIssue = ({issue}) => {

const { currentUser } = useContext(AuthContext);
console.log("current user is ", currentUser)

const [showInfo, setShowInfo] = useState(false);

const handleClick = (id) => {
    setShowInfo(!showInfo);
}

  return (
        <div className='questions'>
            <header>
                <div className="border"></div>
                <div className="summary">
                    <div className="supplier"> 
                        <h4>{issue.supplier_name}</h4>
                        <h6>{moment(issue.date_recorded).format('D MMMM YYYY, dddd')}</h6>
                        <h6>{issue.recorded_by}</h6>
                    </div>
                    <div className="product">
                        <h4>{issue.product_name}</h4>
                        <div className="product-issue">
                            <h6>{issue.qty}</h6>
                            <h6>{issue.issue}</h6>
                        </div>
                    </div>
                    <h3>{issue.status}</h3>  
                </div>
                <button className='btn' onClick={handleClick} >
                    
                    {showInfo ? <AiOutlineMinus/> : <AiOutlinePlus/> }
                </button>
            </header>
            {showInfo && 
                 <Comment  pur_issue_id = {issue.pur_issue_id} issue_description={issue.description}/>
            }
        </div>
  )
}
export default SinglePurchaseIssue;

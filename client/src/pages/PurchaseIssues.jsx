import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import SinglePurchaseIssue from './SinglePurchaseIssue';


const PurchaseIssues = () => {
    const { currentUser } = useContext(AuthContext);
    console.log("current user is ", currentUser)
    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get('https://deployserver-production-e464.up.railway.app/getpurchaseissues');
        setData(response.data);
        console.log("purchase issue is ", response.data)
    }

    useEffect (()=>{
        loadData();
    },[])

  return (
    <div>
      <main>
        <div className="container-purchase-issues">
            <Link to="/addpurchaseissue">
                    <button className="btn">Add Purchase Issue</button>
                </Link>
            <section>
                {data.map((issue)=>{
                 return (
                    <SinglePurchaseIssue issue={issue} loadData={loadData} />
                 )})
                }
            </section>
        </div>
      </main>
    </div>
  )
}

export default PurchaseIssues

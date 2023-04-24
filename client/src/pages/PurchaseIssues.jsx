import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { AuthContext } from '../context/authContext';
import Modal from './Modal';
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

    const[isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <main>
        <div className="container-purchase-issues">
            <Modal isOpen={isOpen} loadData={loadData} onClose={()=>setIsOpen(false)} >
            </Modal>
            <h3><button onClick={()=>setIsOpen(true)}>Add Purchase Issue</button></h3>
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

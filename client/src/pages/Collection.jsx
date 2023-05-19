import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import SingleCollection from './SingleCollection';


const Collection = () => {
    const { currentUser } = useContext(AuthContext);
    console.log("current user is ", currentUser)
    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get('https://deployserver-production-e464.up.railway.app/getcollections');
        setData(response.data);
        console.log("Collection is ", response.data)
    }

    useEffect (()=>{
        loadData();
    },[])

    const byDate =(a, b) =>{
      let d1 = new Date (a.followup_date);
      let d2 = new Date (b.followup_date);
      if (d1.getUTCMonth() > d2.getUTCMonth()) {
          return 1;
      } else if (d1.getUTCMonth() < d2.getUTCMonth()) {
          return 0;
      } else {
         return d1.getUTCDate() - d2.getUTCDate();
      }
  }

  return (
    <div>
      <main>
        <div className="container-collection">
            <Link to="/addcollection">
                    <button className="btn">Add Collection Followup</button>
                </Link>
            <section>
                {data.sort(byDate).map((issue)=>{
                 return (
                    <SingleCollection issue={issue} loadData={loadData} />
                 )})
                }
            </section>
        </div>
      </main>
    </div>
  )
}

export default Collection;

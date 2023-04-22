import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, Link, useNavigate } from "react-router-dom";
import moment from 'moment';

const AddEditCheque = () => {

    const initialState = {
        chq_no: "",
        chq_date: "",
        supplier_name: "",
        chq_amnt: ""
    }

    const [state, setState] = useState(initialState);
    const {chq_no, chq_date, supplier_name, chq_amnt} = state;

    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(()=>{
        axios.get(`https://deployserver-production-e464.up.railway.app/getcheque/${id}`).then((resp)=>setState({...resp.data}));
        console.log(state)
    },[id]);

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!chq_no || !chq_date || !supplier_name || !chq_amnt ) {
            console.log("Enter values");
        } else {
            if(!id){
                axios.post ('https://deployserver-production-e464.up.railway.app/addcheque', {
                    chq_no,
                    chq_date,
                    supplier_name,
                    chq_amnt
                }).then(()=>{
                    setState({chq_no: '', chq_date: '', supplier_name: '', chq_amnt: ''})
                    navigate('/cheques')
                }).catch((err)=>{
                    console.log(err.message);
                })
                
            } else {
                console.log('put');
                console.log(state)
                axios.put (`https://deployserver-production-e464.up.railway.app/editcheque/${id}`, {
                    chq_no,
                    chq_date,
                    supplier_name,
                    chq_amnt
                }).then(()=>{
                    setState({chq_no: '', chq_date: '', supplier_name: '', chq_amnt: ''})
                    navigate('/cheques')
                }).catch((err)=>{
                    console.log(err.message);
                })
                
            }
        
    }
}

    const handleInputChange = (e)=>{
        const {name, value} =e.target;
        setState({...state, [name]:value});
    }

    return ( 
        <div className="addedit">
            <h2>{id ? "Edit Cheque" : "Add Cheque"}</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    id="chq_no"
                    name="chq_no"
                    placeholder="Cheque Number"
                    value={chq_no || ''}
                    onChange={handleInputChange}
                 />
                 {/* <label htmlFor=""><p>{moment(chq_date).format('YYYY MM D')}</p></label> */}
                 
                 <input 
                    type="date" 
                    id="chq_date"
                    name="chq_date"
                    placeholder="Date"
                    onChange={handleInputChange}
                 />
                 <input 
                    type="text" 
                    id="supplier_name"
                    name="supplier_name"
                    placeholder="Supplier Name"
                    value={supplier_name || ''}
                    onChange={handleInputChange}
                 />
                 <input 
                    type="text" 
                    id="chq_amnt"
                    name="chq_amnt"
                    placeholder="Cheque Amount"
                    value={chq_amnt || ''}
                    onChange={handleInputChange}
                 />
                 <div className="btn-area">
                    <input type="submit" value={id ? "Update" : "Save"} className="btn"/>
                    <Link to="/">
                        <input type="button" value="Go Back" className="btn" />
                    </Link>
                 </div>

            </form>
        </div>
     );
}
 
export default AddEditCheque;
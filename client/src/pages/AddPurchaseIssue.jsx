import { useState, useContext, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import moment from "moment";

const AddPurchaseIssue = () => {

const navigate = useNavigate();

const initialState = {
    recorded_by: "",
    date_recorded: "",
    supplier_name: "",
    product_name: "",
    qty: "",
    issue: "",
    status: "",
    description: "",
    assigned_to:""
}

const [state, setState] = useState(initialState);
const {recorded_by, date_recorded, supplier_name, product_name, qty, issue, status, description, assigned_to} = state;

const { currentUser } = useContext(AuthContext);
console.log("current user is ", currentUser)

const handleInputChange = (e)=>{
  const {name, value} =e.target;
  setState({...state, [name]:value});
}

const {id} = useParams();
console.log("id for purchase issue edit", id)


useEffect(()=>{
  axios.get(`https://deployserver-production-e464.up.railway.app/getpurchaseissues/${id}`).then((resp)=>setState({...resp.data}));
},[id]);

console.log(state)

const handleSubmit = (e)=>{
  e.preventDefault();
  if(!date_recorded || !supplier_name || !product_name || !qty ) {
      console.log("Enter values");
  } else {
      if(!id){
          console.log("state is ", state)
          axios.post ('https://deployserver-production-e464.up.railway.app/addpurchaseissue', {
            recorded_by,
            date_recorded,
            supplier_name,
            product_name,
            qty,
            issue,
            status,
            description,
            assigned_to
          }).then(()=>{
              setState({recorded_by: '', date_recorded: '', supplier_name: '', product_name: '', qty:'',issue: '', status: '', description: '', assigned_to: ''  })
              setTimeout(() => {
                navigate('/issues');
              }, 500);
          }).catch((err)=>{
              console.log(err.message);
          })
          
      } else {
          console.log(state)
          axios.put (`http://localhost:9000/editpurchaseissue/${id}`, {
            recorded_by,
            date_recorded,
            supplier_name,
            product_name,
            qty,
            issue,
            status,
            description,
            assigned_to
          }).then(()=>{
              setState({recorded_by: '', date_recorded: '', supplier_name: '', product_name: '', qty:'',issue: '', status: '', description: '', assigned_to: ''})
              navigate('/issues')
          }).catch((err)=>{
              console.log(err.message);
          })  
      }}
}
  return (
    <div className="addpurchaseissue" >
    <h2>{id ? "Edit Purchase Issue" : "Add Purchase Issue"}</h2>
       
      <div className="purchase-issue-form">
        <form >
          {id && <p > Date Recorded : {moment(date_recorded).format('D MMMM YYYY, dddd')}</p>}
          <input 
          type="Date" 
          id="date_recordede"
          name="date_recorded"
          required
          onChange={handleInputChange}
          
          />
          
          <input 
          type="text" 
          placeholder="Supplier Name" 
          id="supplier_name"
          name="supplier_name"
          value={supplier_name || ''}
          onChange={handleInputChange}
          />
          <input 
          type="text" 
          placeholder="Product Name"
          id="product_name"
          name="product_name"
          value={product_name || ''}
          onChange={handleInputChange} 
          />
          <input 
          type="text" 
          placeholder="Qty" 
          id="qty"
          name="qty"
          value={qty || ''}
          onChange={handleInputChange} 
          />
          <select name="issue" id="issue" value={issue || "" } onChange={handleInputChange} >
           <option value="Select Issue">Select Issue</option>
            <option value="Excess">Excess</option>
            <option value="Shortage">Shortage</option>
            <option value="MRP Change">MRP Change</option>
            <option value="Damaged">Damaged</option>
          </select>
          <select name="status" id="status" value={status || "" } onChange={handleInputChange} >
          <option value="Select Status">Select Status</option>
            <option value="Informed Supplier">Informed Supplier</option>
            <option value="Courier Sent">Stock Sent to Supplier</option>
            <option value="Waiting for Stock">Waiting for Stock</option>
            <option value="Waiting for Stock">Completed</option>
          </select>
          <textarea name="description" id="description" cols="30" rows="6" placeholder="Description" value={description || "" } onChange={handleInputChange} ></textarea>
          <input 
            type="text" 
            id="recorded_by"
            name="recorded_by"
            placeholder="Recorded By"
            value={recorded_by || ''}
            onChange={handleInputChange}
           />
          <input 
            type="text" 
            id="assigned_to"
            name="assigned_to"
            placeholder="Assigned to"
            value={state.issue || ''}
            onChange={handleInputChange}
           />
          <button onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    </div>
  );
}
export default AddPurchaseIssue;

import { useState, useContext } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const MODAL_STYLES ={
  position: 'fixed',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  zIndex: 1000

}
const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  zIndex: 1000
}

export default function Modal({isOpen, children, loadData, onClose, pur_issue_id}) {

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

const handleSubmit = (e)=>{
  e.preventDefault();
  if(!date_recorded || !supplier_name || !product_name || !qty ) {
      console.log("Enter values");
  } else {
      if(!pur_issue_id){
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
                loadData();
              }, 500);
          }).catch((err)=>{
              console.log(err.message);
          })
          
      } else {
          console.log('put');
          console.log(state)
          axios.put (`https://deployserver-production-e464.up.railway.app/editcheque/${pur_issue_id}`, {
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

  if(!isOpen) return null
  return (
    <>
    <div style={OVERLAY_STYLES} ></div>
    <div  style={MODAL_STYLES}>
      <button onClick={onClose}>Close</button>
      <h3>Add Purchase Issue</h3>
      <div className="purchase-issue-form">
        {children}
        <form action="">
          <input 
          type="Date" 
          id="date_recordede"
          name="date_recorded"
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
          <select name="issue" id="issue" value={issue || "Excess" } onChange={handleInputChange} >
            <option value="Excess">Excess</option>
            <option value="Shortage">Shortage</option>
            <option value="Change">MRP Change</option>
            <option value="Damaged">Damaged</option>
          </select>
          <select name="status" id="status" value={status || "In Progress" } onChange={handleInputChange} >
            <option value="Progress">In Progress</option>
            <option value="Informed Supplier">Informed Supplier</option>
            <option value="Courier Sent">Courier Sent</option>
            <option value="Waiting for Stock">Waiting for Stock</option>
          </select>
          <textarea name="description" id="description" cols="30" rows="10" placeholder="Description" value={description || "" } onChange={handleInputChange} ></textarea>
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
            value={assigned_to || ''}
            onChange={handleInputChange}
           />
          <button onClick={handleSubmit}>Submit</button>
          {recorded_by}
        </form>
      </div>
    </div>
    </>
  )
}

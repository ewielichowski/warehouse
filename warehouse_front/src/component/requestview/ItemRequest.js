import React, { useState } from "react";
import '../Table.css'
import axios from "axios";


const ItemRequest = ({request, requestIndex, detailsIndex, onClick}) => {

  const [updateMode, setUpdateMode] = useState(false);

  const onDelete = () => {
    axios
      .delete(`http://localhost:3001/request/${request['id']}`) 
      .then((res) => {
        window.location.reload();
      });
    };

  const [updatedRequest, setUpdatedRequest] = useState({
    status: 'confirmed',
    comment: ''
  });
  
  function handleOrderChange(e) {
    setUpdatedRequest({
      ...updatedRequest,
      [e.target.name]: e.target.value
    });
  }
  
  const submitUpdate = () => {
    axios
      .put(`http://localhost:3001/request/${request['id']}`, updatedRequest)
      .then((res) => {
        window.location.reload();
      });
  }  


  const [newOrder, setNewOrder] = useState({
    itemId: request['id'],
    quantity: request['quantity'],
    unitOfMeasurement: request['unitOfMeasurement'],
    employeeName: '',
    price: request['price'],
    status: 'new'
  });
  
  function handleOrderChange(e) {
    setUpdatedRequest({
      ...updatedRequest,
      [e.target.name]: e.target.value
    });
  }

  const submitOrder = () => {
    axios
      .post(`http://localhost:3001/request`, newOrder)
      .then((res) => {
        window.location.reload();
      });
  }

  return(<React.Fragment key={requestIndex}>
    <tr onClick={() => {setUpdateMode(false); onClick()}} >
      <td key='id' style={{width: '20px'}}>
        {request['id']}
      </td>
      <td key='employeeName' style={{width: '80px'}}>
        {request['employeeName']}
      </td>
      <td key='item' style={{width: '240px'}}>
        {request['item']['name']}
      </td>
      <td key='quantity' style={{width: '100px'}}>
        {request['quantity'] + ' ' + request['unitOfMeasurement']}
      </td>
      <td key='status' style={{width: '80px'}}>
        {request['status']}
      </td>
    </tr> 
    {requestIndex === detailsIndex && (<tr><td className='itemDetails' colSpan='100%'>
	<div className="itemDetails">{!updateMode && (
		<table>
			<tr>
				<td>Item name</td> <td>{request['item']['name']}</td>
			</tr>
			<tr>
				<td>Price</td> <td>{request['price']}</td>
			</tr>			
      <tr>
				<td>Employee</td> <td>{request['employeeName']}</td>
			</tr>
			<tr>
				<td>Quantity</td> <td>{request['quantity'] + ' ' + request['unitOfMeasurement']}</td>
			</tr>
			<tr>
			<td>Status</td> <td>{request['status']}</td>
			</tr>
		</table>
	  )} 
	  </div>

	  <div>
	  	  Comment:<br/>
        <textarea rows="4" name="comment" onChange={handleOrderChange}></textarea><br/>
        <select name="status" defaultValue={request['status']} onChange={handleOrderChange}>
            <option value="confirmed">Confirmed</option>
            <option value="rejected">Rejected</option>
        </select><br/>
		  <button onClick={submitUpdate}>Update order</button>

	  </div>

    </td></tr>)}
  </React.Fragment>);
}

export default ItemRequest;
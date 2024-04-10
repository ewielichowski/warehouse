import React, { useState } from "react";
import '../Table.css'
import axios from "axios";


const Item = ({item, itemIndex, detailsIndex, onClick}) => {

  const [updateMode, setUpdateMode] = useState(false);

  const onDelete = () => {
    axios
      .delete(`http://localhost:3001/item/${item['id']}`) 
      .then((res) => {
        window.location.reload();
      });
    };

  const [updatedItem, setUpdatedItem] = useState(item);
  
  function handleItemChange(e) {
    setUpdatedItem({
      ...updatedItem,
      [e.target.name]: e.target.value
    });
  }
  
  const submitUpdate = () => {
    axios
      .put(`http://localhost:3001/item/${item['id']}`, updatedItem)
      .then((res) => {
        window.location.reload();
      });
  }  


  const [newOrder, setNewOrder] = useState({
	itemId: item['id'],
	quantity: item['quantity'],
	unitOfMeasurement: item['unitOfMeasurement'],
	employeeName: '',
	price: item['price'],
	status: 'new'
  });
  
  function handleOrderChange(e) {
    setNewOrder({
      ...newOrder,
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

  return(<React.Fragment key={itemIndex}>
    <tr onClick={() => {setUpdateMode(false); onClick()}} >
      <td key='id' style={{width: '20px'}}>
        {item['id']}
      </td>
      <td key='name' style={{width: '240px'}}>
        {item['name']}
      </td>
      <td key='price' style={{width: '80px'}}>
        {item['price']}
      </td>
      <td key='quantity' style={{width: '100px'}}>
        {item['quantity'] + ' ' + item['unitOfMeasurement']}
      </td>
      <td key='status' style={{width: '80px'}}>
        {item['status']}
      </td>
    </tr> 
    {itemIndex === detailsIndex && (<tr><td className='itemDetails' colSpan='100%'>
	<div className="itemDetails">{!updateMode && (
		<table>
			<tr>
				<td>Name</td> <td>{item['name']}</td>
			</tr>
			<tr>
				<td>Price</td> <td>{item['price']}</td>
			</tr>
			<tr>
				<td>Quantity</td> <td>{item['quantity'] + ' ' + item['unitOfMeasurement']}</td>
			</tr>
			<tr>
				<td>Contact Person</td> <td>{item['contactPerson']}</td>
			</tr>
			<tr>
				<td>Storage Location</td> <td>{item['storageLocation']}</td>
			</tr>
			<tr>
			<td>Status</td> <td>{item['status']}</td>
			</tr>
		</table>
	  )} 
      {updateMode && (<div className="updateForm" >
          Name:
          <input type="text" defaultValue={item['name']} name="name" onChange={handleItemChange} /><br />
    
          Price:
          <input type="text" defaultValue={item['price']} name="price" onChange={handleItemChange}/><br />
    
          Quantity:
          <input type="text" defaultValue={item['quantity']} name="quantity" onChange={handleItemChange}/><br />
    
          Unit:
          <select name="unitOfMeasurement" defaultValue={item['unitOfMeasurement']} onChange={handleItemChange}>
            <option value="pcs">pcs.</option>
            <option value="kg">kg</option>
            <option value="m">meters</option>
            <option value="lbs">lbs</option>
          </select><br />
          <div className="multilineInput">
			Contact Person:
          	<textarea rows="4" defaultValue={item['contactPerson']} name="contactPerson" onChange={handleItemChange}/><br />
          </div>
		  Storage Location: 
          <input type="text" defaultValue={item['storageLocation']} name="storageLocation" onChange={handleItemChange}/><br />
    
          Status:
          <input type="text" defaultValue={item['status']} name="status" onChange={handleItemChange}/> <br />
          <button type="submit" onClick={submitUpdate}>Submit</button>

		  <button onClick={onDelete}>Delete item</button>
          </div>)}
      {!updateMode && (<button onClick={() => setUpdateMode(true)}>Edit item</button>)}
		  </div>

	  <hr/>
	  <div className="orderForm">
		  <b>New order request</b><br/>
	  	  Quantity <i>({item['unitOfMeasurement']})</i>:
          <input type="text" defaultValue={item['quantity']} name="quantity" onChange={handleOrderChange} /> <br />

          Employee name:
          <input type="text"  name="employeeName" onChange={handleOrderChange}/><br />

		  <button onClick={submitOrder}>Order</button>

	  </div>

    </td></tr>)}
  </React.Fragment>);
}

export default Item;
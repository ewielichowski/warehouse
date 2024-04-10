import React, { useState } from "react";
import axios from "axios";
import '../Table.css'

const field_names = [
    'id',
    'employeeName',
    'price',
    'quantity',
    'unitOfMeasurement',
    'status'
  ]

function RequestTable({requests}) {
  // const [newItem, setNewItem] = useState({
  //   name: "",
  //   price: "",
  //   quantity: "",
  //   unitOfMeasurement: "pcs",
  //   status: "available"
  // });

  // const handleSubmit = (e) => {
  //   axios
  //       .post('http://localhost:3001/item', newItem)
  //       .then((res) => {
  //         window.location.reload();
  //     });
  //   console.log(newItem);
  // }

  // const onDelete = (id) => {
  //   axios
  //       .delete(`http://localhost:3001/item/${id}`) 
  //       .then((res) => {
  //           window.location.reload();
  //       });
  //   };

  // function handleChange(prop) {
  //   setNewItem({
  //       ...newItem,
  //       ...prop
  //   });
  // }

  return (
    <div className="table-container">
        <table className="table">
      
    <thead>
      <tr>
        {field_names.map(field_name => (
            <th key={field_name}>{field_name}</th>
          ))}
      </tr>
    </thead>
    <tbody>
      {requests.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {field_names.map(field_name => (
            <td key={field_name}>{row[field_name]}</td>
          ))}
          {/* <td><button onClick={() => {onDelete(row['id'])}}>X</button></td> */}
        </tr>
      ))
      }
        {/* <tr>
            <td></td>
            <td> 
                Name:
                <input type="text" name="name" onChange={(e) => handleChange({name: e.target.value})} />
            </td>
            <td>
                Price:
                <input type="text" name="price" onChange={(e) => handleChange({price: e.target.value})}/>
            </td>
            <td>
                Quantity:
                <input type="text" name="quantity" onChange={(e) => handleChange({quantity: e.target.value})}/>
            </td>
            <td> 
                Unit:
                <select name="unitOfMeasurement" onChange={(e) => handleChange({unitOfMeasurement: e.target.value})}>
                    <option value="pcs">pcs.</option>
                    <option value="kg">kg</option>
                    <option value="m">meters</option>
                    <option value="lbs">lbs</option>
                </select>
            </td>
            <td>
                Status:
                <input type="text" name="status" onChange={(e) => handleChange({status: e.target.value})}/>
            </td> 
            <td>
                <button onClick={handleSubmit}>Add item</button>
            </td>
        </tr> */}
    </tbody>
  </table>
  </div>);
}

export default RequestTable;
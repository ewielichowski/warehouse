import React, { useState, useEffect } from "react";
import axios from "axios";

const NewItemForm = ({id, quantity}) => {
    const [newItem, setNewItem] = useState({
        name: "",
        price: "",
        quantity: "",
        unitOfMeasurement: "pcs",
        status: "available"
      });

    const handleSubmit = (e) => {
        axios
            .post('http://localhost:3001/item', newItem)
            .then((res) => {
              window.location.reload();
          });
        console.log(newItem);
      }
      
    function handleChange(e) {
        setNewItem({
            ...newItem,
            [e.target.name]: e.target.value
        });
    }

    return (
    <div>
        Name:
        <input type="text" name="name" onChange={handleChange} />

        Price:
        <input type="text" name="price" onChange={handleChange}/>

        Quantity:
        <input type="text" name="quantity" onChange={handleChange}/>

        Unit:
        <select name="unitOfMeasurement" onChange={handleChange}>
            <option value="pcs">pcs.</option>
            <option value="kg">kg</option>
            <option value="m">meters</option>
            <option value="lbs">lbs</option>
        </select>

        Status:
        <input type="text" name="status" onChange={handleChange}/>

        <button onClick={handleSubmit}>Add item</button>
    </div>
      );
}

export default NewItemForm;
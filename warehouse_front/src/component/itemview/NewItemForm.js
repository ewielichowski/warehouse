import React, { useState, useEffect } from "react";
import axios from "axios";

const NewItemForm = () => {
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
      
    function handleChange(prop) {
        setNewItem({
            ...newItem,
            ...prop
        });
    }

    return (<div>
        
          Name:
          <input type="text" name="name" onChange={(e) => handleChange({name: e.target.value})} />

          Price:
          <input type="text" name="price" onChange={(e) => handleChange({price: e.target.value})}/>

          Quantity:
          <input type="text" name="quantity" onChange={(e) => handleChange({quantity: e.target.value})}/>

          Unit:
          <select name="unitOfMeasurement" onChange={(e) => handleChange({unitOfMeasurement: e.target.value})}>
              <option value="pcs">pcs.</option>
              <option value="kg">kg</option>
              <option value="m">meters</option>
              <option value="lbs">lbs</option>
          </select>

          Status:
          <input type="text" name="status" onChange={(e) => handleChange({status: e.target.value})}/>

          <button onClick={handleSubmit}>Add item</button>
    </div>
      );
}

export default NewItemForm;
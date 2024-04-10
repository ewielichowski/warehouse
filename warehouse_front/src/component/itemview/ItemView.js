import React, { useState, useEffect } from "react";
import axios from "axios";
import ItemTable from "./ItemTable";
import PageSelector from "../common/PageSelector";
import NewItemForm from "./NewItemForm";
import Item from "./Item";


const field_names = [
    'id',
    'name',
    'price',
    'quantity',
    'status'
  ]

function ItemView() {
  const [items, setItems] = useState({items: [], itemCount: 0});
  const [querySettings, setQuerySettings] = useState({
    page: 1, 
    pageSize: 10, 
    orderBy: 'id', 
    order: 'ASC', 
    filter: '',
    search: ''});
  
  useEffect(() => {
    axios
      .get(`http://localhost:3001/item?page=${querySettings.page}&pageSize=${querySettings.pageSize}&orderBy=${querySettings.orderBy}&order=${querySettings.order}`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [querySettings]);

  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    quantity: "",
    unitOfMeasurement: "pcs",
    status: "available"
  });

  const [detailsId, setDetailsId] = useState(-1);

  const handleSubmit = (e) => {
    axios
        .post('http://localhost:3001/item', newItem)
        .then((res) => {
          window.location.reload();
      });
    console.log(newItem);
  }

  const onDelete = (id) => {
    axios
        .delete(`http://localhost:3001/item/${id}`) 
        .then((res) => {
            window.location.reload();
        });
    };

  const sortItems = (field) => {
    var order = 'asc';
    if(field === querySettings.orderBy && querySettings.order === 'asc') {
      order = 'desc';
    }
    setQuerySettings({
      page: 1,
      pageSize: querySettings.pageSize,
      orderBy: field,
      order: order
    });
    setDetailsId(-1);
  }

  function handleChange(prop) {
    setNewItem({
        ...newItem,
        ...prop
    });
  }

  return (
    <div className="table-container">
        <table className="table">
      
    <thead>
          <tr>
        {field_names.map(field_name => (
            <th
              key={field_name} 
              onClick={() => sortItems(field_name)}
              style={{
                backgroundColor: field_name === querySettings.orderBy ? "#b4b4b4" : ""
              }}>
                {field_name}
                <div className="sortArrow">
                  {field_name === querySettings.orderBy ? (querySettings.order === 'desc' ? '▼' : '▲') : ''}
                </div>
            </th>
          ))}
          </tr>
    </thead>
    <tbody>
      {items.items.map((item, itemIndex) => (
      <Item 
        item={item} 
        itemIndex={itemIndex} 
        onClick={() => (setDetailsId(itemIndex === detailsId ? -1 : itemIndex))} 
        detailsIndex={detailsId} />
      ))   }
      <tr><td colSpan="100%"><NewItemForm /></td></tr>
    </tbody>
  </table>
  
  <PageSelector
    currentPage={querySettings.page}
    totalPages={Math.ceil(items.itemCount / querySettings.pageSize)}
    onPageChange={(pageNumber) => {
      setDetailsId(-1);
      setQuerySettings({
        page: pageNumber,
        pageSize: querySettings.pageSize,
        orderBy: querySettings.orderBy,
        order: querySettings.order
      })
    }} />

  </div>);
}

export default ItemView;
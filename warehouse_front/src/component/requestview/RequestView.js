import React, { useState, useEffect } from "react";
import axios from "axios";
import RequestTable from "./RequestTable";
import ItemRequest from "./ItemRequest";
import PageSelector from "../common/PageSelector";


const field_names = [
    'id',
    'employeeName',
    'item',
    'quantity',
    'status'
  ]

function RequestView() {
  const [requests, setRequests] = useState({requests: [], requestCount: 0});
  const [querySettings, setQuerySettings] = useState({
    page: 1, 
    pageSize: 10, 
    orderBy: 'id', 
    order: 'ASC', 
    filter: '',
    search: ''});

  useEffect(() => {
    axios
      .get(`http://localhost:3001/request?page=${querySettings.page}&pageSize=${querySettings.pageSize}&orderBy=${querySettings.orderBy}&order=${querySettings.order}`)
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [querySettings]);

  
  const [detailsId, setDetailsId] = useState(-1);
  
  const sortRequests = (field) => {
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

  return (
    <div className="table-container">
        <table className="table">
      
    <thead>
          <tr>
        {field_names.map(field_name => (
            <th
              key={field_name} 
              onClick={() => (field_name !== 'item' && sortRequests(field_name))}
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
      {requests.requests.map((request, requestIndex) => (
      <ItemRequest 
        request={request} 
        requestIndex={requestIndex} 
        onClick={() => (setDetailsId(requestIndex === detailsId ? -1 : requestIndex))} 
        detailsIndex={detailsId} />
      ))   }
    </tbody>
  </table>
  
  <PageSelector
    currentPage={querySettings.page}
    totalPages={Math.ceil(requests.requestCount / querySettings.pageSize)}
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

export default RequestView;
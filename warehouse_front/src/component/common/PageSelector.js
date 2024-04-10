import React from "react";
import './PageSelector.css'

const PageSelector = ({ currentPage, totalPages, onPageChange }) => {
    // Function to handle next page click
    const nextPage = () => {
      if (currentPage < totalPages) {
        onPageChange(currentPage + 1);
      }
    };
  
    // Function to handle previous page click
    const prevPage = () => {
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    };
  
    return (
      <div className="pageSelector">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    );
  };
  
  export default PageSelector;
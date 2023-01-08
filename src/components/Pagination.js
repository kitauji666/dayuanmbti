import React from 'react';

function Pagination({ numPages, handlePageClick }) {
  console.log(numPages, handlePageClick);
  return (
    <div>
      {Array.from({ length: numPages }).map((_, i) => (
        <button key={i + 1} onClick={() => handlePageClick(i + 1)}>
          {i + 1}
        </button>
      ))}
    </div>
  );
}

export default Pagination;

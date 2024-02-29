import React, { useState } from "react";

function Pagination({ postPerPage, totalPosts, paginate }) {
  const pageNumbers = [];
  //for loop
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }

  const [activePage, setActivePage] = useState(1);

  const handelPageChange = (num) => {
      setActivePage(num);
      paginate(num)
  };

  return (
    <div>
      <nav>
        <ul className="text-lg border-2 text-red">
          {pageNumbers.map((num) => {
            return <li key={num.id} className="w-full h-10">
              <a
                href="!#"
                onClick={() => {
                  handelPageChange(num);
                  paginate(num);
                }}
              ></a>
            </li>;
          })}
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;

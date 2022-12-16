import React from "react";
import "./Paginated.css";

export default function Paginated({
  allDogs,
  dogsForPage,
  paginated,
  currentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsForPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="position">
      <ul className="paginado">
        {pageNumbers &&
          pageNumbers.map((n) => (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a
              key={n}
              onClick={() => paginated(n)}
              className={
                currentPage === n ? "active items letters" : "items letters"
              }
            >
              {n}
            </a>
          ))}
      </ul>
    </div>
  );
}

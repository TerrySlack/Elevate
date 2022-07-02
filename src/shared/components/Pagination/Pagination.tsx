import classes from "./pagination.module.css";
interface Props {
  nPages: number;
  currentPage: number;
  setCurrentPage: (num: number) => void;
}
export const Pagination = ({ nPages, currentPage, setCurrentPage }: Props) => {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);
  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  return (
    <nav className={classes["nav"]}>
      <ul className={classes["pagination"]}>
        <li className={classes["page-item"]}>
          <a className={classes["page-link"]} onClick={prevPage} href="#">
            Previous
          </a>
        </li>
        {pageNumbers.map((pgNumber) => (
          <li
            key={pgNumber}
            className={`page-item ${currentPage == pgNumber ? "active" : ""} `}
          >
            <a
              onClick={() => setCurrentPage(pgNumber)}
              className={classes["page-link"]}
              href="#"
            >
              {pgNumber}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a className={classes["page-link"]} onClick={nextPage} href="#">
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

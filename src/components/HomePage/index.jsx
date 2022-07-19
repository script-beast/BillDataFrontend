import React from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-pagination-library";
import "react-pagination-library/build/css/index.css";

function App() {
  const [pageNumer, setPageNumer] = React.useState(1);
  const [array, setArray] = React.useState([]);

  const navigate = useNavigate();

  const elePerPage = 9;
  const pageVisited = (pageNumer - 1) * elePerPage;

  const onsort = () => {
    const sortedArray = array.sort((a, b) => {
      return a.amount - b.amount;
    });
    setArray([...sortedArray]);
  };

  React.useEffect(() => {
    fetch("http://localhost:40001/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          navigate("/error");
        }
        setArray(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const displayele = array
    .slice(pageVisited, pageVisited + elePerPage)
    .map((ele, idx) => (
      <Link to={`/bill/${ele._id}`} key={idx} className="tablelink">
        <li className="homeTable-row">
          <div className="homeCol" data-label="Serial No.">
            {pageVisited + idx + 1}
          </div>
          <div className="homeCol" data-label="Bill Date">
            {ele.billDate && ele.billDate.split("T")[0]}
          </div>
          <div className="homeCol" data-label="Paid Date">
            {ele.paidDate ? ele.paidDate.split("T")[0] : "Not Paid"}
          </div>
          <div className="homeCol" data-label="Unit Consumed">
            {ele.unitConsumed}
          </div>
          <div className="homeCol" data-label="Amount">
            ${ele.amount}
          </div>
        </li>
      </Link>
    ));

  return (
    <div className="homeContainer">
      <div className="homeHeader basicHeading">
        <h1>Welcome to the Home Page</h1>
        <h3>Showing all your bills</h3>
      </div>
      <div className="frame">
        <Link to="/addbill">
          <button className="addbutton homebtn">Add</button>
        </Link>
        <button onClick={onsort} className="sortbutton homebtn">
          Sort
        </button>
      </div>
      <ul className="homeTable">
        <li className="homeTable-header">
          <div className="homeCol">S/N</div>
          <div className="homeCol">Bill Date</div>
          <div className="homeCol">Paid Date</div>
          <div className="homeCol">Unit Consumed</div>
          <div className="homeCol">Amount</div>
        </li>
        {displayele}
      </ul>
      <div className="frame">
        <ReactPaginate
          totalPages={Math.ceil(array.length / elePerPage)}
          changeCurrentPage={(page) => setPageNumer(page)}
          currentPage={pageNumer}
          // theme={"light"}
        />
      </div>
    </div>
  );
}

export default App;

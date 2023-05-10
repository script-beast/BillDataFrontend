import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./style.css";

import BaseURL from "../../Api/BaseURL";

function App() {
  const [data, setData] = React.useState({});

  const navigate = useNavigate();
  const { id } = useParams();

  React.useEffect(() => {
    fetch(`${BaseURL}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          navigate("/error");
        }
        setData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = () => {
    fetch(BaseURL + `/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="showSection">
      <h1 className="showh1 basicHeading">Transactions Details</h1>
      <h2 className="showh2 basicHeading">Hi!!</h2>
      <button
        onClick={() => {
          navigate("/");
        }}
        class="custom-btn btn-15"
      >
        Go Back
      </button>
      <details className="showDetails">
        <summary className="showSummary">
          <div>
            <h3>
              <strong>Bill Date</strong>
              <small>Lorem Isupm</small>
            </h3>
            <span>{data.billDate && data.billDate.split("T")[0]}</span>
          </div>
        </summary>
      </details>
      <details className="showDetails">
        <summary className="showSummary">
          <div>
            <h3>
              <strong>Paid Date</strong>
              <small>Lorem Isupm</small>
            </h3>
            <span>
              {data.paidDate ? data.paidDate.split("T")[0] : "Not Paid"}
            </span>
          </div>
        </summary>
      </details>
      <details className="showDetails">
        <summary className="showSummary">
          <div>
            <h3>
              <strong>Unit Consumed</strong>
              <small>Lorem Isupm</small>
            </h3>
            <span>{data.unitConsumed}</span>
          </div>
        </summary>
      </details>
      <details className="showDetails">
        <summary className="showSummary">
          <div>
            <h3>
              <strong>Amount</strong>
              <small>Lorem Isupm</small>
            </h3>
            <span>{data.amount} USD</span>
          </div>
        </summary>
      </details>
      <div class="frame">
        <Link to={`/${data._id}/edit`}>
          <button class="custom-btn btn-4">Update</button>
        </Link>
        <button onClick={handleDelete} class="custom-btn btn-6">
          <span>Delete</span>
        </button>
      </div>
    </section>
  );
}

export default App;

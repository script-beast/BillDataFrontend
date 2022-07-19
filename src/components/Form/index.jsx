import React from "react";
import DatePicker from "react-datepicker";
import { useParams, Link, useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";

function App(props) {
  const [formData, setFormData] = React.useState({
    billDate: new Date(),
    paidDate: null,
    amount: 0,
    unitConsumed: 0,
  });

  const navigate = useNavigate();
  const { id } = useParams();

  React.useEffect(() => {
    if (id) {
      fetch(`http://localhost:40001/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            navigate("/error");
          }
          setFormData({
            billDate: new Date(data.billDate),
            paidDate: data.paidDate ? new Date(data.paidDate) : null,
            amount: data.amount,
            unitConsumed: data.unitConsumed,
          });
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (props.type === "Add") {
      fetch("http://localhost:40001", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            navigate("/error");
          }
          navigate(`/bill/${data._id}`);
        })
        .catch((err) => console.log(err));
    }
    if (props.type === "Update") {
      fetch(`http://localhost:40001/${id}/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            navigate("/error");
          }
          navigate(`/bill/${data._id}`);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleback = () => {
    if(props.type === "Add"){
      navigate("/");
    }
    if(props.type === "Update"){
      navigate(`/bill/${id}`);
    }
  }

  return (
    <div className="login-box">
      
      <h2>{props.type} Details</h2>
      <div>
        <div className="user-box">
          <DatePicker
            selected={formData.billDate}
            dateFormat="dd/MM/yyyy"
            onChange={(date) => setFormData({ ...formData, billDate: date })}
          />
          <label>Bill Date</label>
        </div>
        <div className="user-box">
          <DatePicker
            minDate={formData.billDate}
            selected={formData.paidDate}
            dateFormat="dd/MM/yyyy"
            onChange={(date) => setFormData({ ...formData, paidDate: date })}
            isClearable
          />
          <label>Paid Date</label>
        </div>
        <div className="user-box">
          <input
            type="number"
            value={formData.unitConsumed}
            min="0"
            onChange={(e) =>
              setFormData({ ...formData, unitConsumed: e.target.value < 0 ? 0 : e.target.value })
            }
            required
          />
          <label>Unit Consumed</label>
        </div>
        <div className="user-box">
          <input
            type="number"
            value={formData.amount}
            min="0"
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value < 0 ? 0 : e.target.value })
            }
          />
          <label>Amount</label>
        </div>
        <a onClick={handleSubmit}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          {props.type}
        </a>
        <button
        onClick={handleback}
         style={{top: "-17px"}} class="custom-btn btn-15">Go Back</button>
      </div>
    </div>
  );
}

export default App;

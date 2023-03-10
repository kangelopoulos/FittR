import React, { useEffect, useState } from "react";
import Table from "../components/Table.jsx";
import Chart from "../components/Chart.jsx";
import axios from "axios";
import Message from "../components/Message.jsx";

const Home = ({ user }) => {
  const [weights, setWeights] = useState([]);
  const [isChart, setIsChart] = useState(true);
  const [date, setDate] = useState({});
  const [weight, setWeight] = useState(150);
  const [msg, setMsg] = useState("");

  /**
   * Grabs all user_weights from the api
   */
  useEffect(() => {
    const getDate = async () => {
      try {
        const response = await axios.get(
          "https://api-fittr.onrender.com/weight",
          {
            params: { user_id: user.id },
          }
        );
        setWeights(response.data);
      } catch (err) {
        setMsg("There was an error loading your data, please try again.");
      }
    };
    getDate();
  }, []);

  /**
   * Adds a weight to the database and alters the
   */
  const addWeight = async (e) => {
    e.preventDefault();
    const today = new Date();
    if (!(date instanceof Date) || weight == 0) {
      setMsg("You must enter a date to add a weight.");
    } else if (today < date) {
      setMsg("You can't record weights in the future.");
    } else {
      try {
        const response = await axios.post(
          "https://api-fittr.onrender.com/weight",
          {
            weight: weight,
            date: date,
            user_id: user.id,
          }
        );
        // This is a short cut with terrible time complexity - in another iteration I would edit this
        setWeights(
          [
            ...weights,
            {
              weight: response.data.weight,
              date: response.data.date,
              _id: response.data._id,
            },
          ].sort((a, b) => {
            if (a.date < b.date) return -1;
            else return 1;
          })
        );
        setWeight(150);
        setMsg("");
      } catch (err) {
        setMsg("There was an error adding this weight, please try again.");
      }
    }
  };

  /**
   * Deletes a weight from the database
   */
  const deleteWeight = async (e) => {
    const weight_id = Number(e.target.id);
    try {
      const response = await axios.delete(
        "https://api-fittr.onrender.com/weight",
        {
          data: { weight_id: weight_id },
        }
      );
      setWeights([...weights.filter((weight) => weight._id != weight_id)]);
      setMsg("");
    } catch (err) {
      setMsg("There was an error, please try again");
    }
  };

  /**
   * Deletes all weights from the database
   */
  const deleteAllWeights = async () => {
    const user_id = user.id;
    try {
      const response = await axios.delete(
        "https://api-fittr.onrender.com/weight/all",
        {
          data: { user_id: user_id },
        }
      );
      setWeights([]);
      setWeight(150);
      setMsg("");
    } catch (err) {
      setMsg("Something went wrong, please try again");
    }
  };

  /**
   * Updates a weight in the database
   */
  const updateWeight = async (e, weight) => {
    try {
      const response = await axios.patch(
        "https://api-fittr.onrender.com/weight",
        {
          ...weight,
        }
      );

      // Also a short cut with terrible time complexity
      setWeights(
        weights
          .map((el) => {
            if (el._id == weight.weight_id) {
              return {
                _id: weight.weight_id,
                date: weight.date,
                weight: Number(weight.weight),
              };
            } else {
              return el;
            }
          })
          .sort((a, b) => {
            if (a.date < b.date) return -1;
            else return 1;
          })
      );
      setMsg("");
    } catch (err) {
      setMsg("There was an error, please try again.");
    }
  };

  return (
    <div className="col">
      <h1 className="welcome">Welcome, {user.displayName}</h1>
      <Message message={msg} />
      <form className="add col">
        <div className="row">
          <label htmlFor="date">Date:</label>
          <input
            name="date"
            id="date"
            type="date"
            onChange={(e) => setDate(new Date(e.target.value))}
          />
          <label htmlFor="weight">Weight:</label>
          <input
            onChange={(e) => setWeight(e.target.value)}
            value={weight}
            name="weight"
            id="weight"
            type="number"
            min="10"
            max="1500"
          />
        </div>
        <button className="add-button" onClick={addWeight} type="submit">
          Add Weight
        </button>
      </form>
      {isChart ? (
        <div className="chart-container col">
          <Chart weights={weights} />
          <button onClick={(e) => setIsChart(false)}>See Table</button>
        </div>
      ) : (
        <div className="col">
          <Table
            deleteWeight={deleteWeight}
            updateWeight={updateWeight}
            weights={weights}
          />
          <button onClick={(e) => setIsChart(true)}>See Graph</button>
        </div>
      )}
      <div className="row">
        <button onClick={deleteAllWeights} className="warning">
          Delete All Weight Data
        </button>
      </div>
    </div>
  );
};

export default Home;

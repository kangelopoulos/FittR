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

  useEffect(() => {
    const getDate = async () => {
      try {
        const response = await axios.get("/weight", {
          params: { user_id: user.id },
        });
        console.log(response.data);
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
    console.log(date, weight);
    e.preventDefault();
    if (!(date instanceof Date) || weight == 0) {
      setMsg("You must enter a date to add a weight.");
    } else {
      try {
        const response = await axios.post("/weight", {
          weight: weight,
          date: date,
          user_id: user.id,
        });

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
        console.log(err);
      }
    }
  };

  const deleteWeight = async (e) => {
    const weight_id = Number(e.target.id);
    console.log(weight_id);
    try {
      const response = await axios.delete("/weight", {
        data: { weight_id: weight_id },
      });
      console.log([weights.filter((weight) => weight._id == weight_id)]);
      setWeights([...weights.filter((weight) => weight._id != weight_id)]);
      setMsg("");
    } catch (err) {
      setMsg("There was an error, please try again");
    }
  };

  const deleteAllWeights = async () => {
    const user_id = user.id;
    try {
      const response = await axios.delete("/weight/all", {
        data: { user_id: user_id },
      });
      setWeights([]);
      setWeight(150);
      setMsg("");
    } catch (err) {
      setMsg("Something went wrong, please try again");
    }
  };

  const updateWeight = async (e, weight) => {
    try {
      const response = await axios.patch("/weight", {
        ...weight,
      });

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
    <div id="Home">
      <h1>Welcome, {user.displayName}</h1>
      <Message message={msg} />
      <form className="row">
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
        <button onClick={addWeight} type="submit">
          Add Weight
        </button>
      </form>
      {isChart ? (
        <div className="row">
          <Chart weights={weights} />
          <button onClick={(e) => setIsChart(false)}>See Table</button>
        </div>
      ) : (
        <div className="row">
          <Table
            deleteWeight={deleteWeight}
            updateWeight={updateWeight}
            weights={weights}
          />
          <button onClick={(e) => setIsChart(true)}>See Graph</button>
        </div>
      )}
      <button onClick={deleteAllWeights} className="warning">
        Delete All Weight Data
      </button>
    </div>
  );
};

export default Home;

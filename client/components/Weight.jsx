import React, { useState } from "react";

const Weight = ({ weight, i, deleteWeight, updateWeight }) => {
  const [updating, setUpdating] = useState(false);

  const handleUpdate = (e) => {
    const weight = {};
    weight.weight_id = e.target.id.split("_")[0];
    weight.weight = document.getElementById(`${weight.weight_id}_weight`).value;
    weight.date = document.getElementById(`${weight.weight_id}_date`).value;
    updateWeight(e, weight);
    setUpdating(false);
  };

  return (
    <>
      {updating ? (
        <tr key={`${weight.number}_${i}`}>
          <td>
            <input
              id={`${weight._id}_date`}
              type="date"
              defaultValue={weight.date}
            />
          </td>
          <td>
            <input
              id={`${weight._id}_weight`}
              type="number"
              defaultValue={weight.weight}
            />
          </td>
          <td>
            <button
              id={`${weight._id}_update`}
              onClick={handleUpdate}
              className="caution"
            >
              Update
            </button>
          </td>
          <td>
            <button id={weight._id} onClick={deleteWeight} className="warning">
              Delete
            </button>
          </td>
        </tr>
      ) : (
        <tr key={`${weight.number}_${i}`}>
          <td>{weight.date}</td>
          <td>{weight.weight}</td>
          <td>
            <button
              id={`${weight._id}_update`}
              onClick={(e) => setUpdating(true)}
              className="caution"
            >
              Edit
            </button>
          </td>
          <td>
            <button id={weight._id} onClick={deleteWeight} className="warning">
              Delete
            </button>
          </td>
        </tr>
      )}
    </>
  );
};

export default Weight;

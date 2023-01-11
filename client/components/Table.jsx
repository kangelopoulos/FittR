import React from "react";
import Weight from "./Weight.jsx";

const Table = ({ weights, deleteWeight, updateWeight }) => {
  return (
    <div id="table">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Weights</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {weights.length ? (
            weights.map((weight, i) => {
              return (
                <Weight
                  weight={weight}
                  i={i}
                  key={`id_${weight._id}`}
                  deleteWeight={deleteWeight}
                  updateWeight={updateWeight}
                />
              );
            })
          ) : (
            <></>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td>Total Weight Change:</td>
            <td>
              {weights.length
                ? weights[weights.length - 1].weight - weights[0].weight
                : "N/A"}{" "}
              lbs
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Table;

import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import itemcontext from "../context/items/itemcontext";

function ViewBills() {
  const context = useContext(itemcontext);
  const { getbills, Bills } = context;

  let history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getbills();
    } else {
      history.push("/signin");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="container mt-5">
        <table className="table">
          <thead>
            <tr>
              <th>Date (yyyy-mm-dd)</th>
              <th>Items & quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {Bills.map((bill, index) => {
              return (
                <tr key={index}>
                  <td>{bill.date.slice(0, 10)}</td>
                  <td>
                    <ul>
                      {bill.billdata.map((item, index) => {
                        return (
                          <li key={index}>
                            {item.name} ({item.quantity})
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                  <td>₹ {bill.totalprice}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ViewBills;

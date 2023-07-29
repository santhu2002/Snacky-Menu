import React, { useContext, useEffect, useState } from "react";
import itemcontext from "../context/items/itemcontext";

function Calculator(props) {
  const context = useContext(itemcontext);
  const { items, getitems } = context;
  const [Priceitems, setPriceitems] = useState([]);
  const [count, setcount] = useState(0);
  const [Totalprice, setTotalprice] = useState(0);

  const calc = (id) => {
    const SelectedItem = items.find((item) => item._id === id);
    const Quantity = Number(document.getElementById("quantity").value);
    const pricetotal = Quantity * SelectedItem.price;
    const data = {
      id: count + 1,
      name: SelectedItem.title,
      quantity: Quantity,
      price: pricetotal,
    };
    setcount(count + 1);
    setPriceitems([...Priceitems, data]);
  };

  const handleDelete = (id) => {
    const filteredItems = Priceitems.filter((item) => item.id !== id);
    setPriceitems(filteredItems);
  };

  const calculate = () => {
    const totalPrice = Priceitems.reduce(
      (total, item) => total + item.price,
      0
    );
    setTotalprice(totalPrice);
  };

  const reset =()=>{
    setcount(0);
    setPriceitems([])
  }

  useEffect(() => {
    getitems();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    calculate();
    // eslint-disable-next-line
  }, [Priceitems.length]);

  return (
    <>
      <div className="container">
        <input
          className="form-control my-3"
          id="quantity"
          type="text"
          placeholder="Enter Quantity of desired Product"
          aria-label="default input example"
        />
        {items.map((item) => (
          <button
            key={item._id}
            type="button"
            onClick={() => calc(item._id)}
            className="btn btn-primary mx-2"
          >
            {item.title}
          </button>
        ))}

        <div className="container my-3">
          {Priceitems.length === 0 ? (
            <p>No items to display</p>
          ) : (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {Priceitems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div>
        {Priceitems.length !== 0 && (
          <button
            type="button"
            className="btn btn-primary mx-2"
            onClick={() => calculate()}
          >
            Calculate
          </button>
        )}
        {Priceitems.length !== 0 && (
          <button
          type="button"
          className="btn btn-primary mx-2"
          onClick={() => reset()}
        >
          Reset
        </button>
        )}
        </div>
        {Priceitems.length !== 0 && (
          <div className="container my-3">
            <h4>Total Price: {Totalprice}</h4>
          </div>
        )}
      </div>
    </>
  );
}

export default Calculator;
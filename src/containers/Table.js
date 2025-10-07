import React, { Fragment, useState } from "react";

const Table = (props) => {
  const [addAmount, setAddAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(addAmount);

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount!");
      return;
    }

    props.addMoney(amount);
    setAddAmount("");
  };

  const renderPlates = (array) => {
    return array.map((_, index) => (
      <div key={index} className="empty-plate" style={{ top: -7 * index }} />
    ));
  };

  return (
    <Fragment>
      <h1 className="remaining">You have: ${props.bank} remaining!</h1>
      <div className="table">
        <div className="stack">{renderPlates(props.sushiPlate)}</div>
      </div>

      {/* Sushi Wallet */}
      <form onSubmit={handleSubmit} className="wallet-form">
        <input
          type="number"
          placeholder="Enter amount"
          value={addAmount}
          onChange={(e) => setAddAmount(e.target.value)}
        />
        <button type="submit"> Add Money</button>
      </form>
    </Fragment>
  );
};

export default Table;

import React, { useState, useEffect } from "react";
import SushiContainer from "./containers/SushiContainer";
import Table from "./containers/Table";

// Endpoint
const API = "http://localhost:5000/api/items";

const startState = {
  allSushis: [],
  startIndex: 0,
  bank: 100, // starting budget
  eatenSushi: [],
};

export const App = () => {
  const [sushis, setSushis] = useState(startState);

  // Fetch all sushi from the backend
  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setSushis((prev) => ({
          ...prev,
          allSushis: data,
        }));
      })
      .catch((err) => console.error("Error fetching sushi:", err));
  }, []);

  // Display 4 sushis at a time (wrap around)
  const activePageContent = () => {
    const total = sushis.allSushis.length;
    if (total === 0) return [];

    const start = sushis.startIndex;
    const end = start + 4;

    // If the slice exceeds the end, wrap around
    if (end <= total) {
      return sushis.allSushis.slice(start, end);
    } else {
      const remainder = end - total;
      return [
        ...sushis.allSushis.slice(start, total),
        ...sushis.allSushis.slice(0, remainder),
      ];
    }
  };

  // Go to the next 4 sushis (loop infinitely)
  const moreSushis = () => {
    setSushis((prev) => {
      const total = prev.allSushis.length;
      if (total === 0) return prev;
      const nextIndex = (prev.startIndex + 4) % total;
      return { ...prev, startIndex: nextIndex };
    });
  };

  // Go back 4 sushis (loop infinitely backwards)
  const goBack = () => {
    setSushis((prev) => {
      const total = prev.allSushis.length;
      if (total === 0) return prev;
      const newIndex = (prev.startIndex - 4 + total) % total;
      return { ...prev, startIndex: newIndex };
    });
};

	// Add money to the bank
const addMoney = (amount) => {
  setSushis((prev) => ({
    ...prev,
    bank: prev.bank + amount,
 	 }));
  };

  // Handle eating sushi
  const updateSushis = (id, price) => {
    const { eatenSushi, bank } = sushis;

    // If sushi already eaten
    if (eatenSushi.includes(id)) {
      alert("Sushi has been eaten!");
      return;
    }

    // If not enough money
    if (bank < price) {
      alert("Insufficient funds!");
      return;
    }

    // Otherwise, eat the sushi
    setSushis((prev) => ({
      ...prev,
      eatenSushi: [...prev.eatenSushi, id],
      bank: prev.bank - price,
    }));
  };

  return (
    <div className="app">
      <SushiContainer
        sushis={activePageContent()}
        moreSushis={moreSushis}
        goBack={goBack}
        eatSushi={updateSushis}
        eatenSushi={sushis.eatenSushi}
      />
      <Table 
	  sushiPlate={sushis.eatenSushi} 
	  bank={sushis.bank} 
	  addMoney={addMoney}
	  />
    </div>
  );
};

export default App;

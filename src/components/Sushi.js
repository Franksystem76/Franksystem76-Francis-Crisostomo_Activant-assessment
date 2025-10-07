import React from "react";

const Sushi = ({ displaySushi, eatSushi, eatenSushi }) => {
  const isEaten = eatenSushi.includes(displaySushi.id);

  return (
    <div className="sushi">
      <div
        className="plate"
        onClick={() => eatSushi(displaySushi.id, displaySushi.price)}
      >
        {isEaten ? null : (
          <img
            src={displaySushi.img_url}
            alt={displaySushi.name}
            width="100%"
          />
        )}
      </div>
      <h4 className="sushi-details">
        {displaySushi.name} - ${displaySushi.price}
      </h4>
    </div>
  );
};

export default Sushi;

import React, { Fragment } from "react";
import Button from "../components/Button";
import Sushi from "../components/Sushi";

const SushiContainer = (props) => {
	return (
		<Fragment>
			<div className="belt">
				{Array.isArray(props.sushis) &&
				props.sushis.map((sushi, index) => (
					<Sushi
						displaySushi={sushi}
						eatSushi={props.eatSushi}
						key={index}
						eatenSushi={props.eatenSushi}
					/>
				))}

				<div className="button-group">
				<Button moreSushis={props.goBack} buttonText="Go Back" />
				<Button moreSushis={props.moreSushis} buttonText="More sushi!" />

				</div>
			</div>
		</Fragment>
	);
};

export default SushiContainer;

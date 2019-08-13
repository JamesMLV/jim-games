import React, { SFC } from "react";
import Helmet from "react-helmet";

import PlayedNotOwned from "./PlayedNotOwned";
import PlayedNotRated from "./PlayedNotRated";
import WantToTrade from "./WantToTrade";

const Cleanup: SFC = () => (
	<>
		<Helmet>
			<meta
				name="description"
				content="Sometimes I let my game database get out of date.  This is a list of games that might need cleanup in the database."
			/>
		</Helmet>
		<PlayedNotRated />
		<PlayedNotOwned />
		<WantToTrade />
	</>
);

export default Cleanup;

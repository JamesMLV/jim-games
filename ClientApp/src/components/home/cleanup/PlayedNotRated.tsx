import { observer } from "mobx-react-lite";
import React, { SFC, useContext } from "react";

import StoresContext from "../../../stores/StoresContext";
import BackToTop from "../core/BackToTop";
import Thumbnails from "../core/Thumbnails";
import GameList from "../core/GameList";
import styles from "./PlayedNotRated.module.scss";

const PlayedNotRated: SFC<{ visible: boolean }> = observer(({ visible }) => {
	const { playStore, viewStateStore } = useContext(StoresContext);
	if (!visible) {
		return null;
	}
	const games = playStore.playedNotRated;
	return (
		<div className={styles["notowned"]} id="notowned">
			<div className="title is-4">
				<BackToTop />
				Played But Not Rated
			</div>
			{viewStateStore.isMobile ? <GameList games={games} /> : <Thumbnails games={games} multiRow={true} />}
		</div>
	);
});

export default PlayedNotRated;

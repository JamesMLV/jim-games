import cx from "classnames";
import React, { SFC } from "react";

import styles from "./BackToTop.module.scss";

/* eslint jsx-a11y/anchor-is-valid: "off" */

const BackToTop: SFC = React.memo(() => {
	const scrollToTop = () => {
		const masthead = document.getElementById("masthead");
		if (masthead) {
			masthead.scrollIntoView();
		}
	};
	return (
		<a className={cx(styles["top-link"], "is-hidden-tablet")} onClick={scrollToTop}>
			<i className="fal fa-arrow-to-top" />
		</a>
	);
});

export default BackToTop;

import cx from "classnames";
import React, { SFC, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Navbar.module.scss";

/* eslint jsx-a11y/anchor-is-valid: "off" */

const Navbar: SFC<{ showMenu: boolean }> = React.memo(({ showMenu }) => {
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	const closeMenu = () => {
		setMenuOpen(false);
	};

	return (
		<nav className={cx("navbar", styles["masthead"])} id="masthead">
			<div className="container">
				<div className="navbar-brand">
					<div className="navbar-item">
						<div className={styles["logo"]}>
							<span className={styles["slashes"]}>{"// "}</span>
							<a href="https://www.ewal.net">Ewal.net</a>
						</div>
						<div className={cx(styles["description"], "is-hidden-mobile")}>Chronicles of a board game addict...</div>
					</div>
					<a
						role="button"
						className={cx("navbar-burger", "is-hidden-tablet", menuOpen && "is-active")}
						onClick={toggleMenu}
						aria-label="menu"
						aria-expanded="false">
						<span aria-hidden="true" />
						<span aria-hidden="true" />
						<span aria-hidden="true" />
					</a>
				</div>
				<div className={cx("navbar-menu", "is-hidden-tablet", menuOpen && "is-active")}>
					<div className="navbar-end">
						<Link to="/recentplays" className="navbar-item" onClick={closeMenu} >
							Recent Plays
						</Link>
						<Link to="/mostplays" className="navbar-item" onClick={closeMenu} >
							Most Played
							</Link>
						<Link to="/topten" className="navbar-item" onClick={closeMenu} >
							Top 10
							</Link>
						<Link to="/comingsoon" className="navbar-item" onClick={closeMenu} >
							Coming Soon / Unplayed
							</Link>
						<Link to="/collection" className="navbar-item" onClick={closeMenu} >
							Collection
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
});

export default Navbar;

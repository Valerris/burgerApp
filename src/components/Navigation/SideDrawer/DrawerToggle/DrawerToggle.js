import React from "react";
import menuIcon from "../../../../assets/images/burger-white.svg";
import classes from "./DrawerToggle.module.css";

const drawerToggle = props => (
	<div className={classes.DrawerToggle} onClick={props.toggle}>
		<img src={menuIcon} alt="" />
	</div>
);

export default drawerToggle;

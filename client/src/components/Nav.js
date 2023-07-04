import React from "react";
import { useNavigate } from "react-router-dom";

const Nav = () => {
	const navigate = useNavigate();

	const onNotificationClick = (notification) =>
		navigate(notification.cta.data.url);

	const signOut = () => {
		localStorage.removeItem("_id");
		navigate("/");
	};
	return (
		<nav className='navbar'>
			<h2>MartialChat</h2>

			<div className='navbarRight'>
				<button onClick={signOut}>Sign out</button>
			</div>
		</nav>
	);
};

export default Nav;
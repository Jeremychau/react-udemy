import React, { useContext } from "react";

import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import Buttton from "../FormElements/Button"
import "./NavLinks.css";

const NavLinks = (props) => {
    const auth = useContext(AuthContext)

	return (
		<ul className="nav-links">
			<li>
				<NavLink to="/" exact>
					{" "}
					All Users{" "}
				</NavLink>
			</li>
            {
                auth.isLoggedIn && (
                    <li>
                        <NavLink to={`/${auth.userId}/places`}> My Places </NavLink>
                    </li>
                )
            }
            {
                auth.isLoggedIn && (
                    <li>
                        <NavLink to="/places/new"> Add Places </NavLink>
                    </li>
                )
            }
            {
                !auth.isLoggedIn && (
                    <li>
                        <NavLink to="/auth"> Authenticate </NavLink>
                    </li>
                )
            }
            {
                auth.isLoggedIn && (
                    <li>
                        <Buttton onClick={auth.logout}>
                            Logout
                        </Buttton>
                    </li>
                )
            }
		</ul>
	);
};

export default NavLinks;

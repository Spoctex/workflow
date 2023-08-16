import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
// import { userInfo } from "../../store/teams";
import "./Landing.css";

function Landing({ isLoaded }) {
    const user = useSelector((state) => state.session.user);
    const history = useHistory();
    // const dispatch = useDispatch();

    useEffect(()=>{
        if (user){
            history.push('/myIssues');
        }
    },[user])

    let sessionLinks = (
        <li>
            <OpenModalButton
                buttonText="Log In"
                modalComponent={<LoginFormModal />}
            />
            <OpenModalButton
                buttonText="Sign Up"
                modalComponent={<SignupFormModal />}
            />
        </li>
    );

    return (
        <ul>
            {isLoaded && sessionLinks}
        </ul>
    );
}

export default Landing;

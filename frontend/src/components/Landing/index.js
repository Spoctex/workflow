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

    useEffect(() => {
        if (user) {
            history.push('/myIssues');
        }
    }, [user])

    return (
        <div id="landBody">
            <div id="header">
                {isLoaded &&
                    <>
                        <h2 id="logo">Workflow</h2>
                        <div className="userButtons">
                            <OpenModalButton
                                buttonText="Log In"
                                modalComponent={<LoginFormModal />}
                            />
                            <OpenModalButton
                                buttonText="Sign Up"
                                modalComponent={<SignupFormModal />}
                            />
                        </div>
                    </>}
            </div>
            <div id="landMain">
                <h1 className="welc">Linear is a better way</h1>
                <h1 className="welc">to build products</h1>
                <h3 className="welcDesc">Meet the new standard for modern software development.</h3>
                <h3 className="welcDesc">Streamline issues, sprints, and product roadmaps.</h3>
                <div id="startButton">
                    <OpenModalButton
                        buttonText="Get Started"
                        modalComponent={<SignupFormModal />}
                    />
                </div>
            </div>
            <img id="exmplKan" src="https://linear.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhero%404x.15e3a396.jpg&w=3840&q=75" />
        </div>
    );
}

export default Landing;

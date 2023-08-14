import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { noUser } from "../../store/teams";

function Navigation({ isLoaded }) {
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(()=>{
      if (!user){
          dispatch(noUser());
          history.push('/');
      }
  },[user])


  let sessionLinks = (
      <li>
        <ProfileButton user={user} />
      </li>
    );

  return (
    <ul>
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;

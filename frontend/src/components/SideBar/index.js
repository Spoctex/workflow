import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { noUser, userInfo } from "../../store/teams";
import "./SideBar.css";

function SideBar({ isLoaded }) {
  const user = useSelector((state) => state.session.user);
  const teams = useSelector(state => Object.values(state.teams));
  const [showBar, setShowBar] = useState(false);
  const [openTeam, setOpenTeam] = useState(-1);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(noUser());
      history.push('/');
      setShowBar(false);
    } else {
      dispatch(userInfo());
      history.push('/myIssues');
      setShowBar(true);
    }
  }, [user])


  return (
    <div className={showBar ? "" : " hidden"}>
      <ProfileButton user={user} />
      <button>New Issue</button>
      <button>My Issues</button>
      <p>Your Teams</p>
      {teams.map(team => (
        <>
          <button onClick={() => { setOpenTeam(openId => openId === team.id ? -1 : team.id) }}>{team.name}</button>
          <ul className={openTeam === team.id ? '' : 'hidden'}>
            <li>
              Issues
              <ul>
                <li>Active</li>
                <li>Backlog</li>
              </ul>
            </li>
            <li>Projects</li>
          </ul>
        </>
      ))}
    </div>
  );

  // return (
  //   <ul className={showBar ? "" : " hidden"}>
  //     {isLoaded && sessionLinks}
  //   </ul>
  // );
}

export default SideBar;

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { noUser, userInfo } from "../../store/teams";
import OpenModalButton from "../OpenModalButton";
import "./SideBar.css";
import IssueModal from "../IssueModal";

function SideBar({ isLoaded }) {
  const user = useSelector((state) => state.session.user);
  const teams = useSelector(state => {
    // console.log('State',state)
    return state.teams
  });
  const [showBar, setShowBar] = useState(false);
  const [openTeam, setOpenTeam] = useState(Object.values(teams)[0]?.id);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoaded) {
      if (!user) {
        dispatch(noUser());
        history.push('/');
        setShowBar(false);
      } else {
        dispatch(userInfo());
        setShowBar(true);
      }
    }
  }, [user,isLoaded])


  return (
    <div className={showBar ? "" : " hidden"}>
      <ProfileButton user={user} />
      <OpenModalButton
        buttonText="New Issue"
        modalComponent={<IssueModal currTeam={teams[openTeam]} edit={false} />}
      />
      <button onClick={() => history.push('/myIssues')}>My Issues</button>
      <p>Your Teams</p>
      {Object.values(teams).map(team => {
        // console.log('SideBar',teams)
        return (
          <>
            <button onClick={() => { setOpenTeam(team.id) }}>{team.name}</button>
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
        )
      })}
    </div>
  );

  // return (
  //   <ul className={showBar ? "" : " hidden"}>
  //     {isLoaded && sessionLinks}
  //   </ul>
  // );
}

export default SideBar;

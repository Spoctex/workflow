import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { noUser, userInfo } from "../../store/teams";
import OpenModalButton from "../OpenModalButton";
import "./SideBar.css";
import IssueModal from "../IssueModal";
import { useContext } from "react";
import { CurrTeamContext } from "../../context/currTeam";

function SideBar({ isLoaded }) {
  const {currTeam,setCurrTeam} = useContext(CurrTeamContext)
  const user = useSelector((state) => state.session.user);
  const teams = useSelector(state => state.teams);
  const [showBar, setShowBar] = useState(false);
  // const [openTeam, setOpenTeam] = useState();
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
    // console.log(openTeam)
  }, [user, isLoaded])


  return (
    <div className={showBar ? "" : " hidden"}>
      <ProfileButton user={user} />
      {currTeam && <OpenModalButton
        buttonText="New Issue"
        modalComponent={<IssueModal currTeam={teams[currTeam]} edit={false} />}
      />}
      <button onClick={() => history.push('/myIssues')}>My Issues</button>
      <p>Your Teams</p>
      {Object.values(teams).map(team => {
        // console.log('SideBar',teams)
        return (
          <>
            <button onClick={() => {
              setCurrTeam(team.id);
              history.push(`/teams/${team.id}/issues`);
              }}>{team.name}</button>
            <ul className={currTeam === team.id ? '' : 'hidden'}>
              <li onClick={()=>history.push(`/teams/${team.id}/issues`)}>
                Issues
                {/* <ul>
                  <li>Active</li>
                  <li>Backlog</li>
                </ul> */}
              </li>
              <li onClick={()=>history.push(`/teams/${team.id}/projects`)}>Projects</li>
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

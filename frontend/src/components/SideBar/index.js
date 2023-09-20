import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteTeam, noUser, userInfo } from "../../store/teams";
import { useContext } from "react";
import { CurrTeamContext } from "../../context/currTeam";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import IssueModal from "../IssueModal";
import TeamModal from "../TeamModal";
import "./SideBar.css";

function SideBar({ isLoaded }) {
  const { currTeam, setCurrTeam } = useContext(CurrTeamContext)
  const user = useSelector((state) => state.session.user);
  const teams = useSelector(state => state.teams);
  const { teamId } = useParams();
  const [showBar, setShowBar] = useState(" hidden");
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoaded) {
      if (!user) {
        dispatch(noUser());
        history.push('/');
        setShowBar(" hidden");
      } else {
        dispatch(userInfo());
        setShowBar(" seen");
        setCurrTeam(teamId);
      }
    }
  }, [user, isLoaded, teamId])


  return (
    <div id="sideCont" className={showBar}>
      <div className={"sideBarMain" + showBar} id="sideBarMain">
        <ProfileButton user={user} />
        {currTeam && <OpenModalButton
          buttonText="+ New Issue"
          id='newIss'
          modalComponent={<IssueModal currTeam={teams[currTeam]} edit={false} />}
        />}
        <button onClick={() => history.push('/myIssues')}>My Issues</button>
        <p id="yTems">Your Teams</p>
        {Object.values(teams).map(team => {
          return (
            <>
              <button className="teamButt" onClick={() => {
                setCurrTeam(team.id);
                history.push(`/teams/${team.id}/issues`);
              }}>
                <p>
                  {team.name}
                </p>
                {team.id == currTeam ?
                  <span class="material-symbols-outlined">
                    expand_less
                  </span> :
                  <span class="material-symbols-outlined">
                    expand_more
                  </span>}</button>
              <ul className={currTeam == team.id ? '' : 'hidden'}>
                <li className="teamLinks" onClick={() => history.push(`/teams/${team.id}/issues`)}>
                  Issues
                  {/* <ul>
                  <li>Active</li>
                  <li>Backlog</li>
                </ul> */}
                </li>
                <li className="teamLinks" onClick={() => history.push(`/teams/${team.id}/projects`)}>Projects</li>
                <li>
                  <OpenModalButton
                    buttonText="Edit Team"
                    modalComponent={<TeamModal edit={team} />}
                  />
                </li>
                <li>
                  <button onClick={() => dispatch(deleteTeam(team)).then(() => history.push('/myIssues'))}>Delete Team</button>
                </li>
              </ul>
            </>
          )
        })}
        <OpenModalButton
          buttonText="+ New Team"
          id='newTeam'
          modalComponent={<TeamModal edit={false} />}
        />
      </div>
      <div id="linkContSide">
        <a
          className="connLinksSide"
          href="https://github.com/Spoctex"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>GitHub   </span>
          <i class="fab fa-github"></i>
        </a>
        <a
          className="connLinksSide"
          href="https://www.linkedin.com/in/casey-o-neil-993b7228a/"
          target="_blank"
          rel="noopener noreferer"
        >
          <span>LinkedIn   </span>
          <i class="fab fa-linkedin"></i>
        </a>
      </div>
    </div>
  );
}

export default SideBar;

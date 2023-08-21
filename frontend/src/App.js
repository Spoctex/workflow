import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import SideBar from "./components/SideBar";
import Landing from "./components/Landing";
import MyIssues from "./components/MyIssues";
import IssueDetails from "./components/IssueDetails";
import TeamIssues from "./components/TeamIssues";
import TeamProjects from "./components/TeamProjects";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector(state=>state.session.user);
  useEffect(() => {
    dispatch(sessionActions.restoreUser())
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div id='BarPageContainer' style={{display: user?'grid':'flex'}}>
      <div>
        <SideBar isLoaded={isLoaded} />
      </div>
      <div>
        {isLoaded &&
          <Switch>
            <Route exact path='/'>
              <Landing isLoaded={isLoaded} />
            </Route>
            <Route exact path='/myIssues'>
              <MyIssues />
            </Route>
            <Route exact path='/teams/:teamId/issues'>
              <TeamIssues/>
            </Route>
            <Route exact path='/teams/:teamId/projects'>
              <TeamProjects />
            </Route>
            <Route exact path='/teams/:teamId/projects/:projId/issues/:issueId'>
              <IssueDetails />
            </Route>
          </Switch>}
      </div>
    </div>
  );
}

export default App;

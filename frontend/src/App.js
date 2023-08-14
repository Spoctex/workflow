import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import SideBar from "./components/SideBar";
import Landing from "./components/Landing";
// import { noUser, userInfo } from "./store/teams";
import MyIssues from "./components/MyIssues";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser())
      // .then((user) => user ? dispatch(userInfo()) : dispatch(noUser()))
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div id='BarPageContainer'>
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
          </Switch>}
      </div>
    </div>
  );
}

export default App;

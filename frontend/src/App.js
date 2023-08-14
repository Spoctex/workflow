import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Landing from "./components/Landing";
import { noUser, userInfo } from "./store/teams";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser())
      .then((user) => user ? dispatch(userInfo()) : dispatch(noUser()))
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded &&
        <Switch>
          <Route exact path='/'>
            <Landing isLoaded={isLoaded} />
          </Route>
          <Route exact path='/home'>
            <Navigation isLoaded={isLoaded} />
          </Route>
        </Switch>}
    </>
  );
}

export default App;

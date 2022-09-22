import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotPage from "./components/SpotPage";
import SpotsPage from "./components/SpotsPage";
import CreateSpotForm from "./components/CreateSpotForm";
import Footer from "./components/Footer";
import UserSpots from "./components/UserSpots";
import UserReviews from "./components/UserReviews";

function App() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/" exact>
            <SpotsPage></SpotsPage>
          </Route>
          <Route path="/spots/:spotId">
            <SpotPage />
          </Route>
          <Route path="/createspot">
            <CreateSpotForm></CreateSpotForm>
          </Route>
          <Route path="/myreviews">
            <UserReviews></UserReviews>
          </Route>
          <Route path="/myspots">
            <UserSpots></UserSpots>
          </Route>
        </Switch>
      )}
      <Footer></Footer>
    </>
  );
}

export default App;
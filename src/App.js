import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import { getUserProfile } from 'redux/slices/spotify-slice';
import { tokenActions } from 'redux/slices/token-slice';

import './App.module.css'
import LandingPage from 'pages/landing-page/LandingPage';
import CreatePlaylist from 'pages/create-playlist/CreatePlaylist';
import HomePage from 'pages/home-page/HomePage';
import Navbar from 'components/navbar/Navbar';

function App() {
  const accessToken = useSelector(state => state.token.token)
  const dispatch = useDispatch()

  // To get params from URL after login to Spotify
  const getParamsFromUrl = (hash) => {
    const paramsInUrl = hash.substring(1).split("&")
    const paramsSplitUp = paramsInUrl.reduce((acc, currentVal) => {
      const [key, value] = currentVal.split("=")
      acc[key] = value
      return acc
    }, {})

    return paramsSplitUp
  }

  useEffect(() => {
    if (window.location.hash) {
      const { access_token } = getParamsFromUrl(window.location.hash)
      dispatch(tokenActions.getToken(access_token))
    }
    if (accessToken) {
      dispatch(getUserProfile(accessToken))
    }
  }, [accessToken, dispatch]);

  return (
    <Router>
      {accessToken && <Navbar />}
      <Switch>
        <Route path="/home">
          {!accessToken && (
            <Redirect to="/" exact />
          )}
          <HomePage />
        </Route>
        <Route path="/create-playlist">
          <CreatePlaylist />
          {!accessToken && (
            <Redirect to="/" exact />
          )}
        </Route>

        <Route path="/" exact>
          {accessToken && (
            <Redirect to="/create-playlist" />
          )}
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;

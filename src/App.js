import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import { getUserProfile } from 'redux/slices/spotify-slice';
import { getPlaylists } from 'redux/action-creators/spotify-api/get-current-playlist';
import { getAlbums } from 'redux/action-creators/spotify-api/get-current-albums';
import { getNewReleases } from 'redux/action-creators/spotify-api/get-new-releases';
import { getFeaturedPlaylists } from 'redux/action-creators/spotify-api/get-featured-playlists';
import { tokenActions } from 'redux/slices/token-slice';

import './App.module.css'
import LandingPage from 'pages/landing-page/LandingPage';
import CreatePlaylist from 'pages/create-playlist-page/CreatePlaylistPage';
import HomePage from 'pages/home-page/HomePage';
import Navbar from 'components/navbars/Navbar';
import AlbumsPage from 'pages/albums-page/AlbumsPage';
import PlaylistPage from 'pages/playlists-page/PlaylistPage';
import PrivateRoute from 'components/routers/PrivateRoute';

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
      dispatch(tokenActions.setToken(access_token))
    }
    if (accessToken) {
      dispatch(getUserProfile(accessToken))
      dispatch(getPlaylists(accessToken))
      dispatch(getAlbums(accessToken))
      dispatch(getNewReleases(accessToken))
      dispatch(getFeaturedPlaylists(accessToken))
    }
  }, [accessToken, dispatch]);

  return (
    <Router>
      {accessToken && <Navbar />}

      <Switch>
        {/* Home */}
        <PrivateRoute component={HomePage} path="/home" exact />

        {/* Playlists */}
        <PrivateRoute component={PlaylistPage} path="/playlists" exact />

        {/* Albums */}
        <PrivateRoute component={AlbumsPage} path="/albums" exact />

        {/* Create Playlist */}
        <PrivateRoute component={CreatePlaylist} path="/create-playlist" exact />

        {/* Landing Page */}
        <Route exact path="/">
          {accessToken && <Redirect to="/home" />}
          <LandingPage />
        </Route>

        {/* When any non-existing URL is entered */}
        <Route path="/:sembarang">
          {!accessToken && <Redirect to="/" />}
        </Route>

      </Switch>
    </Router>
  )
}

export default App;

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
import CreatePlaylist from 'pages/create-playlist-page/CreatePlaylistPage';
import HomePage from 'pages/home-page/HomePage';
import Navbar from 'components/navbar/Navbar';
import AlbumsPage from 'pages/albums-page/AlbumsPage';
import PlaylistPage from 'pages/playlists-page/PlaylistPage';
import SearchPage from 'pages/search-page/SearchPage';

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

        {/* Home */}
        <Route path="/home">
          {!accessToken && (
            <Redirect to="/" exact />
          )}
          <HomePage />
        </Route>

        {/* Search */}
        <Route path="/search">
          {!accessToken && (
            <Redirect to="/" exact />
          )}
          <SearchPage/>
        </Route>

        {/* Home */}
        <Route path="/playlists">
          {!accessToken && (
            <Redirect to="/" exact />
          )}
          <PlaylistPage/>
        </Route>

        {/* Home */}
        <Route path="/albums">
          {!accessToken && (
            <Redirect to="/" exact />
          )}
          <AlbumsPage/>
        </Route>

        {/* Create Playlist */}
        <Route path="/create-playlist">
          <CreatePlaylist />
          {!accessToken && (
            <Redirect to="/" exact />
          )}
        </Route>

        {/* Landing Page */}
        <Route path="/" exact>
          {accessToken && (
            <Redirect to="/home" />
          )}
          <LandingPage />
        </Route>

      </Switch>
    </Router>
  )
}

export default App;

# Utafy - Spotify Clone


Hello! 

This is my Final Project as a YABB's GenerasiGigih Intermediate Phase Frontend Engineering Path.

This responsive app works both in Mobile screen and Laptop screen.
**I strongly suggest you to use this app using Google Chrome.**

This app utilizes Spotify Web APIs to authenticate your account first,  and then after you are authenticated, you can use all the features that I will mention below.

## Features

 1. **Search song** based on the title, artist name, or album name.
 2. **Select songs from search result to add/remove** it to your new playlist
 3. **Create new playlist** with playlist name, short description, and selected songs
 4. **Menus** :
	 1. **Home**
	 This will shows **New Releases** and **Featured playlists**. When you click those cards, it will open to new tab of its Spotify page .
	 2. **Playlists**
	 This section will shows your **saved Playlists** from your Spotify
	 3. **Albums**
	 In this page, it will shows your **saved Albums** from your Spotify
	 4. **Create Playlist**
	 In this page, it has features that I've mentioned on **point 1 - 3**

## How to Run This App

 1. Clone this repo
 2. Run **npm install**
 3. Generate your Spotify Cliend ID in https://developer.spotify.com/dashboard/applications
 4. Create http://localhost:[portNumber] as a Redirect URI in the dashboard settings
 5. **Create .env file** in the root folder, and then add :
	 

	> REACT_APP_SPOTIFY_CLIENT_ID=[yourSpotifyClientID]
6. Run **npm run start** or **yarn start**
7. Done :)

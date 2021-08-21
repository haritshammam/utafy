import { useState } from "react";
import styles from "./styles.module.css";

interface AlbumProps {
  images: {
    url: string;
  }[];
}

interface ArtistProps {
  name: string;
}

interface TrackDataProps {
  uri: string;
  name: string;
  album: AlbumProps;
  artists: ArtistProps[];
}

interface TrackCardProps {
  buttonState: boolean;
  trackData: TrackDataProps;
  pushToSelectedTracks: Function;
  deleteFromSelectedTracks: Function;
}

const TrackCard = ({
  buttonState,
  trackData,
  pushToSelectedTracks,
  deleteFromSelectedTracks,
}: TrackCardProps) => {
  const [isTrackSelected, setTrackSelected] = useState(buttonState);

  const handleSelectTrack = () => {
    setTrackSelected(!isTrackSelected);
    if (!isTrackSelected) {
      pushToSelectedTracks(trackData.uri);
    } else {
      deleteFromSelectedTracks(trackData.uri);
    }
  };

  return (
    <div className={styles.track_card_container} onClick={handleSelectTrack}>
      {isTrackSelected && <div className={styles.track_card_border}></div>}
      <img
        src={trackData.album.images[1].url}
        alt="Album"
        className={styles.track_image}
        data-testid="track-image"
      />
      <div className={styles.track_info}>
        <p className={styles.track_name} data-testid="track-title">
          {trackData.name}
        </p>
        <p className={styles.track_artist} data-testid="track-artist">
          {trackData.artists[0].name}
        </p>
      </div>
      <div className={styles.track_info_background}></div>
    </div>
  );
};

export default TrackCard;

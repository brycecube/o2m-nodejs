import styles from 'styles/player.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeHistory } from 'helpers';
import { fetchStreamUrl } from 'actions/player';
import AudioModule from './AudioModule';

class Player extends Component {
  componentWillMount() {
    const { fetchStreamUrl, player, search: { query } } = this.props;
    // make an initial fetch on mount
    makeHistory(query, player.track.id);
    fetchStreamUrl(player.track.id);
  }

  componentWillReceiveProps(nextState) {
    const { fetchStreamUrl, player, search: { query } } = this.props;
    if (nextState.player.track.id !== player.track.id) {
      fetchStreamUrl(nextState.player.track.id);
      makeHistory(query, nextState.player.track.id);
    }
  }

  render() {
    const { player, onToggleShuffle, onTogglePlayPause, onNextTrack, onPercentUpdate, onSoundCreated, onPreviousTrack } = this.props;
    return (
      <div className={styles.player}>
        { player ? <AudioModule onSoundCreated={onSoundCreated} onNextTrack={onNextTrack} onPercentUpdate={onPercentUpdate} streamUrl={player.streamUrl} /> : ''}
        <span className={styles.previous} onClick={onPreviousTrack}>Previous Track</span>
        { player.playing ? <span className={styles.pause} onClick={onTogglePlayPause}>Pause</span> : <span className={styles.play} onClick={onTogglePlayPause}>Play</span>}
        <span className={styles.next} onClick={onNextTrack}>Next Track</span>
        { player.shuffle ? <span className={`${styles.shuffle} ${styles.on}`} onClick={onToggleShuffle}>Shuffle On</span> : <span className={styles.shuffle} onClick={onToggleShuffle}>Shuffle Off</span>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    search: state.search
  };
}


export default connect(mapStateToProps, { fetchStreamUrl })(Player);

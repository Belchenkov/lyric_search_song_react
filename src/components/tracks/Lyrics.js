import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import Spinner from "../layout/Spinner";

class Lyrics extends Component {
    state = {
        track: {},
        lyrics: {}
    };

    componentDidMount() {
        // get lyrics
        axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
            .then(res => {
                this.setState({ lyrics: res.data.message.body.lyrics });
                // get track
                return axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
            })
            .then(res => {
                this.setState({ track: res.data.message.body.track });
            })
            .catch(err => console.error(err));
    }

    render() {
        const { track, lyrics } = this.state;
        if (track === undefined
            || lyrics === undefined
            || Object.keys(track).length === 0
            || Object.keys(lyrics).length === 0
        ) {
            return <Spinner />;
        } else {
            console.log();
            return (
                <Fragment>
                    <Link to="/" className="btn btn-dark btn-sm mb-4">
                        <i className="fas fa-chevron-left mr-2" />
                        Go Back
                    </Link>
                    <div className="card">
                        <h4 className="card-header bg-primary text-white">
                            <i className="fas fa-music mr-2" />
                            { track.track_name }  by
                            <i className="fas fa-user mx-2" />
                            <span className="text-secondary">{ track.artist_name }</span>
                        </h4>
                        <div className="card-body">
                            <p className="card-text">{ lyrics.lyrics_body }</p>
                        </div>
                    </div>

                    <ul className="list-group mt-3">
                        <li className="list-group-item">
                            <strong>Song Genre</strong>:
                            { track.primary_genres.music_genre_list.length !== 0
                                ? track.primary_genres.music_genre_list[0].music_genre.music_genre_name
                                : 'unknown'}
                        </li>
                        <li className="list-group-item">
                            <strong>Explicit Words</strong>: { track.explicit === 0 ? 'No' : 'Yes' }
                        </li>
                        <li className="list-group-item">
                            <strong>Release Date</strong>: <Moment format="MM/DD/YYYY">{ track.first_release_date }</Moment>
                        </li>
                    </ul>
                </Fragment>
            );
        }
    }
}

export default Lyrics;

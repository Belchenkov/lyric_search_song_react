import React, { Component } from 'react';
import axios from 'axios';

import { Consumer } from '../../context';

class Search extends Component {
    state = {
        trackTitle: ''
    };

    onChange(e) {
       this.setState({ [e.target.name]: e.target.value });
    }

    findTrack = (dispatch, e) => {
        e.preventDefault();

        axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating&apikey=${process.env.REACT_APP_MM_KEY}`)
            .then(res => {
                dispatch({
                    type: 'SEARCH_TRACKS',
                    payload: res.data.message.body.track_list
                });

                this.setState({ trackTitle: '' })
            })
            .catch(err => console.error(err));
    };

    render() {
        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;

                    return (
                        <div className="card card-body mb-4 p-4 bg-gray">
                            <h1 className="display-4 search-header text-center">
                                <img src="https://img.icons8.com/bubbles/80/000000/search-property.png" />
                                Search For A Song
                            </h1>
                            <p className="lead text-center">Get the lyrics for any song</p>
                            <form onSubmit={this.findTrack.bind(this, dispatch)}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Song title ..."
                                        name="trackTitle"
                                        value={this.state.trackTitle}
                                        onChange={this.onChange.bind(this)}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg btn-block btn-search font-weight-bold"
                                >
                                    <i className="fas fa-search mr-2" />
                                    Get Track Lyrics</button>
                            </form>
                        </div>
                    );
                }}
            </Consumer>
        );
    }
}

export default Search;

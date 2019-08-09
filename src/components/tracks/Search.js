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

    render() {
        return (
            <Consumer>
                {value => {
                    return (
                        <div className="card card-body mb-4 p-4 search-block bg-gray">
                            <h1 className="display-4 text-center">
                                <img src="https://img.icons8.com/bubbles/80/000000/search-property.png" />
                                Search For A Song
                            </h1>
                            <p className="lead text-center">Get the lyrics for any song</p>
                            <form>
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
                            </form>
                        </div>
                    );
                }}
            </Consumer>
        );
    }
}

export default Search;

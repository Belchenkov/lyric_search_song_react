import React, { Component, Fragment } from 'react';

import { Consumer } from '../../context';
import Spinner from "../layout/Spinner";
import Track from "./Track";

class Tracks extends Component {
    render() {
        return (
            <div>
                <Consumer>
                    {value => {
                        const { track_list, heading } = value;

                        if (track_list === undefined || track_list.length === 0) {
                            return <Spinner />;
                        } else {
                            return (
                                <Fragment>
                                    <h2 className="text-center mb-4">
                                        <img src="https://img.icons8.com/plasticine/50/000000/music.png" />
                                        { heading }
                                    </h2>
                                    <div className="row">
                                        {track_list.map(item => (
                                            <Track
                                                track={item.track}
                                                key={item.track.track_id}
                                            />
                                        ))}
                                    </div>
                                </Fragment>
                            );
                        }
                    }}
                </Consumer>
            </div>
        );
    }
}

export default Tracks;

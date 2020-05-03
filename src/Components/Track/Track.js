import React from 'react';
import './Track.css';

class Track extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }
    // renderAction() {
    //     // return <button className="Track-action">{isRemoval ? '-' : '+'}</button>;
    //     if (isRemoval) {
    //         return <button className="Track-action" onClick={this.removeTrack}>'-'</button>;
    //     } else {
    //         return (
    //             <button className="Track-action" onClick={this.addTrack}>
    //                 '+'
    //             </button>
    //         );
    //     }
    // }
    addTrack() {
        // ???
    }
    removeTrack() {
        /// ???
    }
    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    {/* <h3><!-- track name will go here --></h3> */}
                    <h3>{this.props.track.name}</h3>
                    {/* <p><!-- track artist will go here--> | <!-- track album will go here --></p> */}
                    <p>
                        {this.props.track.artist} | {this.props.track.album}
                    </p>
                </div>
                {/* <button className="Track-action"><!-- + or - will go here --></button> */}
            </div>
        );
    }
}

export default Track;

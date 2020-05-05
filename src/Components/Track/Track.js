import React from 'react';
import './Track.css';

class Track extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }
    renderAction() {
        // return <button className="Track-action">{isRemoval ? '-' : '+'}</button>;
        if (this.props.isRemoval) {
            return (
                <button className="Track-action" onClick={this.removeTrack}>
                    -
                </button>
            );
        } else {
            return (
                <button className="Track-action" onClick={this.addTrack}>
                    +
                </button>
            );
        }
    }
    addTrack() {
        this.props.onAdd(this.props.track);
    }
    removeTrack() {
        this.props.onRemove(this.props.track);
    }
    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    {/* <h3><!-- track name will go here --></h3> */}
                    {/* <h3>track name</h3> */}
                    <h3>{this.props.track.name}</h3>
                    {/* <p><!-- track artist will go here--> | <!-- track album will go here --></p> */}
                    {/* <p>track.artist | track.album</p> */}
                    <p>
                        {this.props.track.artist} | {this.props.track.album}
                    </p>
                </div>
                {/* <button className="Track-action"><!-- + or - will go here --></button> */}
                {this.renderAction()}
            </div>
        );
    }
}

export default Track;

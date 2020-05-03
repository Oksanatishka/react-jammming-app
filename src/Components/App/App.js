import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [], //  { searchResults: [{ name: '', artist: '', album: '', id: '' }]}
            playlistName: '',
            playlistTracks: [], //  { playlistTracks: [{ name: '', artist: '', album: '', id: '' }]}
        };
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
    }
    // ???
    addTrack(track) {
        // if (this.state.playlistTracks[track.id]) {
        //     this.setState({ playlistTracks: this.state.playlistTracks.push(track.id) });
        // }
        if (this.state.playlistTracks.find((savedTrack) => savedTrack.id === track.id)) {
            return;
        }
    }
    removeTrack(track) {
        if (this.state.playlistTracks.filter((playlistTrack) => playlistTrack.id === track.id)) {
            // this.setState({playlistTracks: this.state.playlistTracks. })
            return;
        }
    }
    updatePlaylistName(name) {
        // ???
        this.setState({ playlistName: name });
    }
    savePlaylist() {
        // ???
    }
    search(search_term) {
        console.log(search_term);
    }
    render() {
        return (
            <div>
                <h1>
                    Ja<span className="highlight">mmm</span>ing
                </h1>
                <div className="App">
                    <SearchBar onSearch={this.search} />
                    <div className="App-playlist">
                        <SearchResults
                            searchResults={this.state.searchResults}
                            onAdd={this.addTrack}
                        />
                        <Playlist
                            playlistName={this.state.playlistName}
                            playlistTracks={this.state.playlistTracks}
                            onRemove={this.removeTrack}
                            onNameChange={this.updatePlaylistName}
                            onSave={this.savePlaylist}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;

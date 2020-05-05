let accessToken;
const clientId = '1abd49735694401c8cce39b34c91b0c5'; // refresh it in your account before adding to github
// const redirectUri = 'http://localhost:3000/';
const redirectUri = 'http://dependent-support.surge.sh/';

const Spotify = {
    // The method will get a user’s access token so that they can make requests to the Spotify API.
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        // https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow
        // check for access token match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/); // if you check in console  window.location.href, it'll be "http://localhost:3000/" for now
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            // This clears the parameters, allowing us to grab a new access token when it expires
            window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },
    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
            .then((response) => {
                return response.json();
            })
            .then((jsonResponse) => {
                if (!jsonResponse.tracks) {
                    return [];
                }
                return jsonResponse.tracks.items.map((track) => ({
                    id: track.id,
                    name: track.name,
                    artists: track.artists[0].name, // artist ??
                    album: track.album.name,
                    uri: track.uri,
                }));
            });
    },
    savePlaylist(name, trackUris) {
        if (!name || !trackUris.length) {
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userId;
        return fetch('https://api.spotify.com/v1/me', { headers: headers })
            .then((response) => {
                return response.json();
            })
            .then((jsonResponse) => {
                userId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ name: name }),
                })
                    .then((response) => {
                        return response.json();
                    })
                    .then((jsonResponse) => {
                        const playlistId = jsonResponse.id;
                        return fetch(
                            `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
                            {
                                headers: headers,
                                method: 'POST',
                                body: JSON.stringify({ uris: trackUris }),
                            }
                        );
                    });
            });
    },
};

export default Spotify;

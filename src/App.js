import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const scope = encodeURIComponent("user-library-modify");

function App() {
    const [accessToken, setAccessToken] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    /* global chrome */ // This is to prevent the linter from throwing an error

    const handleLogin = () => {
        chrome.identity.launchWebAuthFlow(
            {
                url: `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${chrome.identity
                    .getRedirectURL()
                    .slice(0, -1)}&scope=${scope}&response_type=token`,
                interactive: true,
            },
            (redirectUri) => {
                console.log(redirectUri);
                const url = new URL(redirectUri);
                const accessToken = url.hash.match(
                    /[#&]access_token=([^&]*)/
                )[1];
                setAccessToken(accessToken);
                console.log("AccessToken Successfully Set!");
            }
        );
    };

    useEffect(() => {
        async function getTracks() {
            if (accessToken) {
                const title = (
                    await chrome.tabs.query({
                        active: true,
                        currentWindow: true,
                    })
                )[0].title;
                const encodedTitle = encodeURIComponent(title); // Encode the title to ensure URL safety
                console.log(encodedTitle);
                // API Access Token
                const headers = {
                    Authorization: `Bearer ${accessToken}`,
                };

                axios
                    .get(
                        `https://api.spotify.com/v1/search?q=${encodedTitle}&type=track&limit=10`,
                        { headers }
                    )
                    .then((response) => {
                        setSearchResults(response.data.tracks.items);
                        console.log(
                            "Search Results:",
                            response.data.tracks.items
                        );

                        // Handle the response data here
                    })
                    .catch((error) => {
                        console.log(
                            "Error fetching data from Spotify API:",
                            error
                        );
                    });
            }
        }
        getTracks();
    }, [accessToken]);

    useEffect(() => {
        console.log(
            "searchResults: let's see, if it works, it works",
            searchResults
        );
    }, [searchResults]);

    const handleLike = (trackId) => {
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        axios
            .put(
                `https://api.spotify.com/v1/me/tracks?ids=${trackId}`,
                {},
                { headers }
            )
            .then((response) => {
                console.log("Track liked!");
            })
            .catch((error) => {
                console.log("Error liking track:", error);
            });
        return <section>Track Liked!</section>;
    };

    return (
        <>
            <section className="w-[500px] min-h-screen bg-gradient-to-br from-[#020221] to-black flex flex-col justify-center ">
                {!accessToken ? (
                    <>
                        <section className="text-4xl text-white self-center mt-12 font-light">
                            Login to Spotify
                        </section>
                        <button
                            className="bg-gradient-to-br from-[#191625] to-[#0c012d] border border-[#514bff] hover:bg-gradient-to-t hover:from-[#000440] hover:to-[#011045] text-white font-bold m-12 p-4 rounded-xl w-fit self-center"
                            onClick={() => handleLogin()}
                        >
                            Login
                        </button>
                    </>
                ) : !searchResults ? (
                    <>
                        <section className="text-white">Logged in</section>
                    </>
                ) : (
                    <>
                        <section>
                            {searchResults.map((tracks, index) => (
                                <button
                                    onClick={() => handleLike(tracks.id)}
                                    className="flex p-4 m-2 border items-center rounded-3xl border-cyan-500 w-[480px] hover:bg-gradient-to-t hover:from-[#000440] hover:to-[#021763] text-cyan-200 mx-2 font-light text-xl font-sans"
                                >
                                    <img
                                        className="mx-2 rounded-xl w-[64px]"
                                        src={tracks.album.images[1].url}
                                    />
                                    <section className="mx-2">
                                        {tracks.name}
                                    </section>
                                </button>
                            ))}
                        </section>
                    </>
                )}
            </section>
        </>
    );
}

export default App;

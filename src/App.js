import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Button from "./components/button";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const REDIRECT_URI = "https://easylike.token";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const scope = encodeURIComponent("user-library-modify");

function App() {
    const [accessToken, setAccessToken] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    /*eslint-disable */

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

    // empty array means that this useEffect will only run once when the component mounts
    // use effect is a hook that lets you perform side effects in function components
    // it runs after the component has rendered
    // it is used to fetch data, subscribe to events, or manipulate the DOM directly
    // right now we are using it to fetch the access token from the Spotify API.
    // it runs as soon as the component mounts because of the empty array

    // how else con we modify the empty array?
    // we can add a dependency to the array
    // if we add a variable to the array, the useEffect will run every time that variable changes
    // if we add multiple variables to the array, the useEffect will run every time any of the variables change
    // if we remove the array, the useEffect will run every time the component renders
    // if we return a function from the useEffect, that function will run when the component unmounts

    /* eslint-disable */

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
    };

    return (
        <>
            <section className="w-[500px] min-h-screen bg-gradient-to-br from-cyan-800 to-green-900 flex flex-col justify-center ">
                {!accessToken ? (
                    <>
                        <section className="text-4xl text-white self-center mt-12 font-light">
                            Login to Spotify
                        </section>
                        <Button onClick={handleLogin} />
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
                                    onClick={handleLike(tracks.id)}
                                    className="flex p-2 m-2 border"
                                >
                                    <img
                                        width={64}
                                        height={64}
                                        src={tracks.album.images[2]}
                                    />
                                    <section>{tracks.name}</section>
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

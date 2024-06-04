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
    const [searchResults, setSearchResults] = useState({});
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
            }
        );
    };
  
    useEffect(async () => {
        const title = (
            await chrome.tabs.query({ active: true, currentWindow: true })
        )[0].title;
        const encodedTitle = encodeURIComponent(title); // Encode the title to ensure URL safety

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
                setSearchResults(response.data);
                // Handle the response data here
            })
            .catch((error) => {
                console.error("Error fetching data from Spotify API:", error);
            });
    }, [accessToken]); // empty array means that this useEffect will only run once when the component mounts
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

    
    return (
        <>
            <section className="border-red-700 rounded-2xl w-[500px] min-h-screen bg-gradient-to-br from-cyan-800 to-green-700 flex flex-col justify-center ">
                {!accessToken ? (
                    <>
                        <section className="text-4xl text-white self-center mt-12 font-light">
                            Login to Spotify
                        </section>
                        <Button id="login" onClick={handleLogin} />
                    </>
                ) : (
                    <>
                        <section>Your access token is </section>
                        <section className="text-white">{accessToken}</section>
                    </>
                )}
            </section>
        </>
    );
}

export default App;

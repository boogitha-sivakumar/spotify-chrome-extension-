import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Button from "./components/button";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const scope = encodeURIComponent("user-library-modify");

function App() {
    const [accessToken, setAccessToken] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    /* 
    
    useEffect(() => {
        // API Access Token
        const authParameters = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                // tells the server what kind of content we are sending
                // application/x-www-form-urlencoded is the default content type for POST requests
                // it is used to send data to the server as key-value pairs
                // example : key1=value1&key2=value2
                // see the body variable below
            },
        };

        const body = `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;

        axios
            .post(
                "https://accounts.spotify.com/api/token",
                body,
                authParameters
            )
            .then((response) => {
                setAccessToken(response.data.access_token);
                console.log(response.data.access_token);
                //we're getting the access token from the response and storing it in the AccessToken state(variable))
            })
            .catch((error) => {
                console.error("Error fetching access token", error);
            });
    }, []); // empty array means that this useEffect will only run once when the component mounts
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

    */

    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data && event.data.type === "ACCESS_TOKEN") {
                setAccessToken(event.data.accessToken);
            }
        };
        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, []);

    return (
        <>
            <section className="border-red-700 rounded-2xl w-[500px] min-h-screen bg-gradient-to-br from-cyan-800 to-green-700 flex flex-col justify-center ">
                {!accessToken ? (
                    <>
                        <section className="text-4xl text-white self-center mt-12 font-light">
                            Login to Spotify
                        </section>
                        <a
                            className="self-center"
                            href={`https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scope}&response_type=token`}
                        >
                            <Button />
                        </a>
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

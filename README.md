# YouTune: A Chrome Extension for Liking Songs on Spotify from YouTube

## How to Use YouTune

### Getting Started

1. **Create a Spotify App**:

    - Visit the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) and log in.
    - Click on "Create an App" and follow the instructions.
    - Note the **Client ID** and **Client Secret** provided by Spotify.
    - Set the **Redirect URI** as shown in the extension and paste it into the appropriate place on the Spotify Developer Dashboard.

2. **Setup Environment Variables**:

    - Create a `.env` file in the root directory of the project.
    - Add the following lines to the `.env` file:
        ```plaintext
        CLIENT_ID=your_spotify_client_id
        CLIENT_SECRET=your_spotify_client_secret  # Optional if contributing to extension
        ```

3. **Install Dependencies**:

    - Use one of the following commands to install the necessary dependencies:
        ```bash
        npm install
        # or
        npm i
        # or
        yarn add
        # or
        pnpm i
        # or
        pnpm install
        ```

4. **Build the Project**:

    - For a production build, use:
        ```bash
        pnpm run build
        ```
    - For debugging, you can use:
        ```bash
        nodemon
        ```

5. **Load the Extension into Chrome**:

    - Open Chrome and navigate to `chrome://extensions`.
    - Turn on **Developer mode** using the toggle switch in the upper right corner.
    - Click on **Load Unpacked** and select the `build` folder created during the build step.

6. **Using the Extension**:
    - With the extension loaded, you can now browse YouTube.
    - When you find a song you like, simply click on it and the extension will automatically like the song on Spotify.

## About YouTune

**YouTune** is a Chrome extension designed to enhance your music browsing experience on YouTube by integrating with Spotify. It allows you to effortlessly like songs on Spotify while watching music videos on YouTube.

### Key Features

-   **Spotify Integration**: Utilizes the Spotify API and OAuth 2.0 for seamless liking of songs.
-   **Automatic Liking**: Click on a song in YouTube, and it will be automatically liked on Spotify.
-   **Environment Configuration**: Easily configurable through a `.env` file for storing your Spotify Client ID and Client Secret.
-   **Build Tools**: Use modern JavaScript build tools and package managers like npm, yarn, or pnpm.
-   **Chrome Extension**: Easily loadable into Chrome through the Developer mode for quick and easy access.

### Technical Details

-   **Spotify API and OAuth 2.0**: The extension uses Spotify's API for liking songs and handles authentication through OAuth 2.0.
-   **ESLint Configuration**: Managed with custom ESLint configurations to ensure code quality and compatibility, e.g., `/* global chrome */`.
-   **No Background or Content Scripts**: The extension operates without the need for background.js or content.js files.
-   **Automatic Build with Nodemon**: Utilizes nodemon to automatically execute the build process whenever files are saved or changed.

By following the setup instructions and utilizing the key features, YouTune offers a streamlined and efficient way to manage your music preferences across YouTube and Spotify. Happy listening!

# Lunch Finder Web

[![Build Status](https://travis-ci.org/iumehara/lunchFinderWeb.svg?branch=master)](https://travis-ci.org/iumehara/lunchFinderWeb)

Web app that interacts with [Lunch Finder Server API](https://github.com/iumehara/lunchFinderServer)

### Dependencies
- Node
- NPM

### Getting Started
- Setup .env file
    - `cp .envSample..js .env` then set the env vars for local environment
    - `export GOOGLE_API_KEY=ask project commiter, or look in deployed app`
    - `export SERVER_URL='http://localhost:8080/`
    
- Start the app
    - `npm install`
    - `source .env`
    - `npm start`
    - app is available at `http://localhost:8000/`

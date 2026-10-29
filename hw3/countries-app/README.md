
# HW3 - CS465P

## Overview

This homework includes three projects:
- React tic-tac-toe tutorial
- Socket.IO chat tutorial
- REST Countries application using Express and Pug

## React Tic-Tac-Toe

I followed the React tutorial to create a tic-tac-toe game.

The game allows two players to take turns placing X and O on the board. It detects winners and draws, keeps track of move history, and allows players to return to previous moves.

### How to Run

1. Navigate to the React project folder:
   `cd hw3/react`
2. Install dependencies:
   `npm install`
3. Start the development server:
   `npm run dev`
4. Open the local URL displayed in the terminal.

## Socket.IO Chat

I followed the Socket.IO tutorial to create a basic chat application.

The application allows users to send and receive messages in real time. Messages are broadcast to all connected users.

### How to Run

1. Navigate to the Socket.IO project folder:
   `cd hw3/socketio`
2. Install dependencies:
   `npm install`
3. Start the server:
   `node index.js`
4. Open `http://localhost:3000` in your browser.

You can open the application in multiple browser tabs to test sending and receiving messages.

## REST Countries Application

The application uses the REST Countries API to display country information.

### Routes

- `/home` - Welcome page
- `/countries` - Countries and capitals sorted alphabetically
- `/populous` - Countries with populations of 50 million or more, sorted by population, with flags
- `/regions` - Countries grouped by region with country counts

### How to Run

1. Navigate to the application folder:
   `cd hw3/countries-app`
2. Install dependencies:
   `npm install`
3. Create a `.env` file containing:
   `REST_COUNTRIES_API_KEY=your_api_key`
4. Start the server:
   `node server.js`
5. Open `http://localhost:3000/home` in your browser.

The REST Countries application may take some time to load initially because it retrieves country information from the API.

### REST Countries API

While developing the REST Countries application, I encountered HTTP 500 and 503 errors when requesting country data.

To address this, I reduced the number of countries requested per page, added retry logic for temporary API errors, and requested only the fields needed for the application.

The initial load can still take some time because the application retrieves multiple pages of data. Once the data is retrieved, it is cached to avoid repeating the requests.

### Country Flags

I initially had trouble displaying country flags. I resolved this by using each country's two-letter country code to construct a flag image URL.

## Technologies Used

JavaScript, Node.js, Express, Pug, React, Socket.IO, HTML, and CSS.

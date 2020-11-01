# Communal Calculator

## Description

This is a basic (yet stylish!~) [calculator](https://communal-calculator-baa12.web.app) that anyone anywhere can use.  Users may feel sneaky since they can see the ten most recent calculations are stored beneath the calculator.  I went with React in case I eventually spend time adding additional features to this project.  I also decided to go with Firebase as opposed to something like Node & Express with a database like PostgreSQL & Postico to cut down on code - work smarter not harder, right?  If anyone reading this is interested in learning more about Node & Express and how they could be used for something like this you can check out this [basic walkthrough](https://github.com/AwrenNuit/node-express-basics) I made a few months back.

## To Run App

- Download or clone this repository
- [Sign into Firebase and create a project](https://firebase.google.com/)
- [Set up a Firebase Realtime Database](https://firebase.google.com/docs/database/web/start)
- Choose one of the following:
  - Make a `.env` file for your Firebase config
  - Plug the Firebase config directly into [firebase.js](src/firebase.js)
- `npm i` from the command line
- `npm start` from the command line to run the project

## Future Plans

If I continue to build this out and add extra features, number one on the list would be to add some user authentication for added security. Plugging in the logic for more advanced maths and making the recent calculation history look nicer (I ran out of steam!) would be high on the list, too.

If you have any questions or comments, feel free to email me at awren.nuit@gmail.com.
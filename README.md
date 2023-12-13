# NourishU

## Introduction

Recipe sharing/Meal tracking application catered towards post-secondary students.
Allows users to:

- Create and Edit Recipes
- Log Meals using recipes
- View and review recipes
- View profile, follow, unfollow other users, and see their created recipes.

Also comes with Admin application

- Allows admins to add new ingredients
- Allows admin to manage recipe reviews

## Tech Stack

Currently we are using the following technologies:

`client`/`admin`

- React.js
- Material UI
- HTML/CSS

`server`

- Node.js
- Express.js
- MySQL2

### Running

In each of the three subdirectories `admin`, `client`, and `server`. Please run `npm install` to install all of the required packages.
The `server` currently contains a script to autopopulate the MySQL database, which can be run using `npm run getbeans`. This reqipres that a schema called `NourishuDB` is already present inside your MySQL database.
The `server` currently runs on `localhost:3001` and the `admin` and `client` apps will run on available ports. Each of these can be run using `npm start`.

To set this up we used the following videos (we removed sequelize and implemented MySQL2)

1. https://www.youtube.com/watch?v=Hl7diL7SFw8&list=PLpPqplz6dKxUaZ630TY1BFIo5nP-_x-nL&index=2&ab_channel=PedroTech
1. https://www.youtube.com/watch?v=pJx-HGwaL3w&list=PLpPqplz6dKxUaZ630TY1BFIo5nP-_x-nL&index=3&ab_channel=PedroTech
1. https://www.youtube.com/watch?v=DO_wR1tx-O0&list=PLpPqplz6dKxUaZ630TY1BFIo5nP-_x-nL&index=3&ab_channel=PedroTech
1. https://www.w3schools.com/react/react_router.asp

## Resources used

MaterialUI:
https://mui.com/material-ui/getting-started/

Need to use react-auth-kit@2.12.7. Docs [here](https://authkit.arkadip.dev/)
As stated in the docs: Please note that react >= 16, js-cookie = 2.2.1 and react-router-dom = 6.0 are peer dependencies.
Based off of: https://www.youtube.com/watch?v=wr3VmbZdVA4

favicon from:
https://www.pngimages.in/download/coffee-beans-png-picture
how to set favicon:
https://noaheakin.medium.com/changing-the-default-react-browser-tab-title-and-icon-1240239d92d3
adding images:
https://noaheakin.medium.com/changing-the-default-react-browser-tab-title-and-icon-1240239d92d3

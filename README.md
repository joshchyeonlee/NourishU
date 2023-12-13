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

React:
https://react.dev/

React Router:
https://reactrouter.com/en/main

React Auth Kit:
https://authkit.arkadip.dev/

MaterialUI:
https://mui.com/material-ui/getting-started/

day.js:
https://day.js.org/docs/en/installation/installation

axios:
https://axios-http.com/docs/intro

express:
https://expressjs.com/en/guide/routing.html

Need to use react-auth-kit@2.12.7. Docs [here](https://authkit.arkadip.dev/)
As stated in the docs: Please note that react >= 16, js-cookie = 2.2.1 and react-router-dom = 6.0 are peer dependencies.
Based off of: https://www.youtube.com/watch?v=wr3VmbZdVA4

favicon from:
https://www.pngimages.in/download/coffee-beans-png-picture
how to set favicon:
https://noaheakin.medium.com/changing-the-default-react-browser-tab-title-and-icon-1240239d92d3
adding images:
https://noaheakin.medium.com/changing-the-default-react-browser-tab-title-and-icon-1240239d92d3

children to pass props from:
https://stackoverflow.com/questions/60439210 how-to-pass-props-to-screen-component-with-a-tab-navigator

autocomplete:
//https://stackoverflow.com/questions/58666189/getting-the-value-in-the-react-material-ui-autocomplete

checking email is valid:
https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript

remove state from:
https://stackoverflow.com/questions/40099431/how-do-i-clear-location-state-in-react-router-on-page-reload

handling multiple input boxes/select:
https://stackoverflow.com/questions/69206649/handle-multiple-input-boxes-rendered-using-map-function-javascript

create Theme:
https://mui.com/material-ui/customization/theming/

redirect
https://stackoverflow.com/questions/63690695/react-redirect-is-not-exported-from-react-router-dom

check table based off of:
https://stackoverflow.com/questions/8829102/check-if-mysql-table-exists-without-using-select-from-syntax

find all tables based off of:
https://tableplus.com/blog/2018/08/mysql-how-to-drop-all-tables.html

handling datestrings:
https://stackoverflow.com/questions/11187961/date-format-in-node-js

handling recipe:
https://www.chelseasmessyapron.com/triple-chocolate-chunk-brownie-protein-shake/

Node/MySQL based off of:
https://www.youtube.com/watch?v=EN6Dx22cPRI

MySQL Crud:
https://www.youtube.com/watch?v=fPuLnzSjPLE

Preventing SQL injections:
https://www.youtube.com/watch?v=vYFZDRraMnw&t=4s
https://planetscale.com/blog/how-to-prevent-sql-injection-attacks-in-node-js

Prevenging XSS attacks:
https://www.stackhawk.com/blog/react-xss-guide-examples-and-prevention/

CURDATE from:
https://www.w3schools.com/sql/func_mysql_curdate.asp

DATEDIFF from:
https://www.w3schools.com/sql/func_mysql_datediff.asp

Check row exists in table:
https://stackoverflow.com/questions/1676551/best-way-to-test-if-a-row-exists-in-a-mysql-table

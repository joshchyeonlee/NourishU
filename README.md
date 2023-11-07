# NourishU

## Welcome

Ok so I think I got this set up so hopefully we should be good to go whenever we're ready to actually start implementing our stuff

## Github

Whenever we're adding new features, let's use branches off of main and then create pull requests (hopefully we're familiar with branches, if not Josh can provide an overview). Though I only use git on command line so I'm not entirely familiar with the desktop version and how that works.

### Common commands

- `git status`: check the status of your current git state
- `git fetch`: fetch remote version
- `git pull`: pull in remote changes to your local
- `git add <file>`: add files to be committed later (you can use `git add .` to add all changed files)
- `git commit`: add a commit (I usually just use `git commit -m <commit message>`)
- `git push`: push local changes to remote
- `git checkout`: check out a branch. `git checkout -b <branch name>` will create and branch with the chosen name and check out into it
- `git branch`: see list of branches you have locally. I think there's somethign to see remote branches but I can't remember it off the top of my head

These should be the main commands we use, hopefully we won't have too many merge conflicts or anything. We should also have at least one person review our pull requests before merging things in to minimize this as well

## The actual "fun" coding part

The repo is divided into 2 directories, `client` represents the front-end and `server` represents the back-end and database.

### Running

- Open a terminal session in the `server` directory. Run `npm start` this will automatically create a server session on `localhost:3001`.
- Open a terminal session in the `client` directory. Run `npm start` to run the client on `localhost:3000`.

You'll probably need both running at the same time unless you're only working on one part of it and it doesn't depend on the other side being live.
Hopefully the `npm` stuff works within this repo without needing extra installations!

Currently we are using the following technologies:

`client`

- React.js: This is like the foundation of the front end
- Material UI: We're using version 5 (I think 4 is deprecated now?), this gives us waaaaaay nicer components to work with so we don't have to worry about css styling as much
- HTML/CSS: Shouldn't need too much of it hopefully

`server`

- Node.js
- Express.js
- MySql - honestly hope it's really easy for us to work with local versions of the same database, we may need a script to populate the database with the same set of mock values.

To set this up I used the following videos, it might be worth watching for more context.

1. https://www.youtube.com/watch?v=Hl7diL7SFw8&list=PLpPqplz6dKxUaZ630TY1BFIo5nP-_x-nL&index=2&ab_channel=PedroTech
1. https://www.youtube.com/watch?v=pJx-HGwaL3w&list=PLpPqplz6dKxUaZ630TY1BFIo5nP-_x-nL&index=3&ab_channel=PedroTech
1. https://www.youtube.com/watch?v=DO_wR1tx-O0&list=PLpPqplz6dKxUaZ630TY1BFIo5nP-_x-nL&index=3&ab_channel=PedroTech
1. https://www.w3schools.com/react/react_router.asp

### More Detail

First of all, you will need to have MySql installed. I have configured the databse in our BE with the `root` user and an empty string as the password - I don't know how this will affect you. Hopefully it won't be a pain to figure out the DB cuz I've never used MySql before...

#### server

The only parts that really matter are `models` `routes` and `index.js`
`index.js` is the main part of the server.
For `models`: ignore the `index.js` - this is automatically created.

- there is an `Ingredients.js` file that will automatically create a table in MySql called `Ingredients`. We can basically follow that to create the rest of the tables that we need
  In `routes`: these are basically the API calls used for the BE and FE to communicate. There's an `Ingredients.js` here as well that we can mimic for other implementations
  I think everything else, more or less, can be ignored.

#### client

Again, most of this can probably be ignored. The only thing we really need to be concerned about is `src/App.js` which basically acts as the root of the FE. Currently there's way more stuff in there with the `UseEffect` which we will likely need to move into `src/components` after.
In react, you'll most likely be making a bunch of modular `components` that we can store in `src/components`. Using materialUI (mui) will be helpful for handling a lot of the styling, but we can also throw in css files for each component in `src/components`. There's a basic compoent wit ha mui button that increases the number every time you click on it if you run `npm start` which hopefully will give you a sense of how to use components if you're new to react.

I always find having [mui documentation](https://mui.com/material-ui/react-button/) helpful for building components

Pro tips:

- if you have the client and server running, you can just save changes and it should just automatically recompile and update things.
- don't forget to hit `ctrl+c` to kill the server/client when you're not working on it. Pretty sure killing the terminal will quit the processes though.

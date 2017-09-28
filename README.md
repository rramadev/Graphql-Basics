# GraphQL Basics

## Synopsis

A GraphQL project demo, to test and understand the fundamentals concepts of this query language for APIs and related technologies, including: 

- GraphQL node packages
- GraphiQL Tool

## Built With

- GraphQL
- Express
- Node-fetch
- Json-server
- Axios
- Npm scripts
- Github API

## Commands

command | description
--- | ---
`npm run server`| run server.js using node

## Installation

1) Open a command prompt in the project's root directory

2) Type: `npm install`
    This installs the dependencies as defined in the package.json file.

3) Type: `npm serve`
    This starts the express server running the in-browser GraphQL IDE.

4) Open a new browser tab with the following url: http://localhost:8080/graphql

Query Example for the Github Api using GraphQL:
```
query {
  user(name: "rramadev") {
    login
    id
    name
    url
    location
    repos {
      name
      description
      git_url
    }
  }
}
```
## Acknowledgments

* [Mattias Petter Johansson](https://www.youtube.com/watch?v=lAJWHHUz8_8) - Video series of the Youtube channel "Funfunfunction" about GraphQL Basics.
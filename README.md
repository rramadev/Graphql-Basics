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

3) Type: `npm server`
    This starts the express server running the in-browser GraphQL IDE.

4) Open a new browser tab with the following url: http://localhost:8080/graphql

5) Type: `npm json-server`
    This starts a local json server using the file data.json.

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
```
mutation {
  addUser (login: "testUser", name: "Fi foofoo") {
    id,
    login,
    name
  }
}
```
```
mutation {
  deleteUser (id: 11)
}
```
## Acknowledgments

* [Mattias Petter Johansson](https://www.youtube.com/watch?v=lAJWHHUz8_8) - Video series of the Youtube channel "Funfunfunction" about GraphQL Basics.
* [Traversy Media
](https://www.youtube.com/watch?v=PEcJxkylcRM&list=PLillGF-RfqbYZty73_PHBqKRDnv7ikh68) - Video series about Building a GraphQL Server.
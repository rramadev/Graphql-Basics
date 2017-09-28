const fetch = require('node-fetch');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require ('graphql');

// Repository Type
const RepoType = new GraphQLObjectType({
  name: 'Repository',
  description: 'repository type',
  fields: () => ({
    name: { 
      type: GraphQLString, 
      resolve: repo => repo.name
    },
    description: { 
      type: GraphQLString, 
      resolve: repo => repo.description
    },
    git_url: { 
      type: GraphQLString, 
      resolve: repo => repo.git_url
    }
  })
});

// Customer Type
const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'user type',
  fields: () => ({
    login: { 
      type: GraphQLString, 
      resolve: user => user.login
    },
    id: { 
      type: GraphQLString, 
      resolve: user => user.id
    },
    name: { 
      type: GraphQLString, 
      resolve: user => user.name
    },
    url: { 
      type: GraphQLString, 
      resolve: user => user.url
    },
    location: { 
      type: GraphQLString, 
      resolve: user => user.location
    },
    repos: { 
      type: new GraphQLList(RepoType), 
      resolve: user => fetch(
        `https://api.github.com/users/${user.login}/repos`
      )
      .then(res => res.json())
    }
  })
})

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'test query to github api',
  fields: () => ({
    user: {
      type: UserType,
      args: {
        login: { type: GraphQLString }
      },
      resolve: (root, args) => fetch(
        `https://api.github.com/users/${args.login}`
      )
      .then(res => res.json())
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: (root, args) => fetch(
        'https://api.github.com/users'
      )
      .then(res => res.json())
    }      
  })
});

// Mutation
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'mutation query to local json server',
  fields: () => ({
    addUser: {
      type: UserType,
      args: {
        login: { type: GraphQLString },
        name: { type: GraphQLString }
      },
      resolve: (root, args) => fetch(
        'http://localhost:3000/users', 
        { 
          method: 'POST', 
          body: JSON.stringify({ 
            login: 'aaa', 
            name: 'bbb' 
          }) 
        }
      )
      .then(res => res.json())
    }    
  })
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
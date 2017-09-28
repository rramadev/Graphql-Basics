const fetch = require('node-fetch');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require ('graphql');

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

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'user type',
  fields: () => ({
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

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
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
      }      
    })
  })
});
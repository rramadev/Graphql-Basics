const fetch = require('node-fetch');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} = require ('graphql');

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
          name: { type: GraphQLString }
        },
        resolve: (root, args) => fetch(
          `https://api.github.com/users/${args.name}`
        )
        .then(res => res.json())
      }      
    })
  })
});
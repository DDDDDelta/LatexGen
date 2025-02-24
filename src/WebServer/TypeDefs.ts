import gql from 'graphql-tag';

const typeDefs = gql`
  type Query { 
    hello: String 
  } 
  type Mutation { 
    storeInfo(owner: String!, text: String!): Boolean! 
  }
`;

export { typeDefs };
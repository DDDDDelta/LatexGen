import gql from 'graphql-tag';

const typeDefs = gql`
  type Query { 
    viewInfo(owner: String!): String
  } 
  type Mutation { 
    storeInfo(owner: String!, text: String!): Boolean! 
  }
`;

export { typeDefs };
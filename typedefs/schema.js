import { merge } from 'lodash';
const { transpileSchema } = require('graphql-s2s').graphqls2s;

import { typeDefs as studentTypeDefs } from './student';
import { typeDefs as schoolClassTypeDefs } from './schoolClass';
import { resolvers as studentResolvers } from '../resolvers/student';
import { resolvers as schoolClassResolvers } from '../resolvers/schoolClass';
import { makeExecutableSchema } from 'apollo-server-express';

const Query = `
  type Query {
    _empty: String
  }
  type Mutation {
    _void: String
  }
  `;

const resolvers = {};

export default makeExecutableSchema({
    typeDefs: [Query, studentTypeDefs, schoolClassTypeDefs],
    resolvers: merge(resolvers, studentResolvers, schoolClassResolvers)
});
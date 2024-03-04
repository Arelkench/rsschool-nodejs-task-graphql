import { GraphQLObjectType } from 'graphql';
import { UserQueries } from '../models/user/queries.js';
import { PostQueries } from '../models/post/queries.js';
import { MemberQueries } from '../models/member/queries.js';
import { ProfileQueries } from '../models/profile/queries.js';

export const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        ...MemberQueries,
        ...PostQueries,
        ...ProfileQueries,
        ...UserQueries,
    }),
});

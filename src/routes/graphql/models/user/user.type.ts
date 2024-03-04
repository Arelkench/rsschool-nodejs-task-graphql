import {
    GraphQLFloat,
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';

import { UUIDType } from '../../types/uuid.js';
import { ProfileType } from '../profile/profile.type.js';
import { Context } from '../../types/types.js';
import { PostType } from '../post/post.type.js';
import { User } from './types.js';

export const UserType: GraphQLObjectType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: UUIDType },
        name: { type: GraphQLString },
        balance: { type: GraphQLFloat },

        profile: {
            type: ProfileType,
            resolve: async (parent: User, _, { dataLoader }: Context) =>
                await dataLoader.profile.findUnique({ where: { id: parent.id } }),
        },

        posts: {
            type: new GraphQLList(PostType),
            resolve: async (parent: User, _, { dataLoader }: Context) =>
                await dataLoader.post.findMany({ where: { id: parent.id } }),
        },

        userSubscribedTo: {
            type: new GraphQLList(UserType),
            resolve: async (parent: User, _, { dataLoader }: Context) =>
                await dataLoader.user.findMany({ where: { userSubscribedTo: { some: { authorId: parent.id } } } }),
        },

        subscribedToUser: {
            type: new GraphQLList(UserType),
            resolve: async (parent: User, _, { dataLoader }: Context) =>
                await dataLoader.user.findMany({ where: { subscribedToUser: { some: { subscriberId: parent.id } } } }),
        },
    }),
});

export const CreateUserInputType = new GraphQLInputObjectType({
    name: 'CreateUserInput',
    fields: () => ({
        name: { type: new GraphQLNonNull(GraphQLString) },
        balance: { type: new GraphQLNonNull(GraphQLFloat) },
    }),
});

export const ChangeUserInputType = new GraphQLInputObjectType({
    name: 'ChangeUserInput',
    fields: () => ({
        id: { type: UUIDType },
        name: { type: GraphQLString },
        balance: { type: GraphQLFloat },
    }),
});

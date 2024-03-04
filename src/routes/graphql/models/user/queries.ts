import { GraphQLList, GraphQLNonNull, GraphQLResolveInfo } from 'graphql';
import { Args, Context } from '../../types/types.js';
import { UUIDType } from '../../types/uuid.js';
import { UserType } from './user.type.js';

export const UserQueries = {
    users: {
        type: new GraphQLList(UserType),
        resolve: async (
            _parent,
            _args,
            { dataLoader }: Context,
            info: GraphQLResolveInfo,
        ) => {
            const users = await dataLoader.user.findMany();
            return users;
        },
    },

    user: {
        type: UserType,
        args: {
            id: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: async (_, { id }: Args, { dataLoader }: Context) => {
            return await dataLoader.user.findUnique({
                where: { id },
            });
        },
    },
};

import { GraphQLList, GraphQLNonNull } from 'graphql';
import { Args, Context } from '../../types/types.js';
import { UUIDType } from '../../types/uuid.js';
import { ProfileType } from './profile.type.js';

export const ProfileQueries = {
    profiles: {
        type: new GraphQLList(ProfileType),
        resolve: (_parent, _args, { dataLoader }: Context) => dataLoader.profile.findMany(),
    },

    profile: {
        type: ProfileType,
        args: {
            id: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: async (_, { id }: Args, { dataLoader }: Context) =>
            await dataLoader.profile.findUnique({
                where: { id },
            }),
    },
};

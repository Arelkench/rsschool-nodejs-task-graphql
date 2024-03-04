import { GraphQLList, GraphQLNonNull } from 'graphql';
import { Args, Context } from '../../types/types.js';
import { MemberType } from './member-type.type.js';
import { MemberTypeId } from '../../types/memberTypeId.js';

export const MemberQueries = {
    memberTypes: {
        type: new GraphQLList(MemberType),
        resolve: (_, _args, { dataLoader }: Context) => dataLoader.memberType.findMany(),
    },

    memberType: {
        type: MemberType,
        args: {
            id: { type: new GraphQLNonNull(MemberTypeId) },
        },
        resolve: async (_, { id }: Args, { dataLoader }: Context) =>
            await dataLoader.memberType.findUnique({
                where: { id },
            }),
    },
};

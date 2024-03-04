import { GraphQLList, GraphQLNonNull } from 'graphql';
import { Args, Context } from '../../types/types.js';
import { UUIDType } from '../../types/uuid.js';
import { PostType } from './post.type.js';

export const PostQueries = {
    posts: {
        type: new GraphQLList(PostType),
        resolve: (_parent, _args, { dataLoader }: Context) => dataLoader.post.findMany(),
    },

    post: {
        type: PostType,
        args: {
            id: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: async (_, { id }: Args, { dataLoader }: Context) =>
            await dataLoader.post.findUnique({
                where: { id },
            }),
    },
};

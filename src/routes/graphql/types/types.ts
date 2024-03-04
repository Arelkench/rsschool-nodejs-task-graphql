import { PrismaClient } from '@prisma/client';

export type Args = {
    id: string;
};


export type Context = {
    dataLoader: PrismaClient;
};

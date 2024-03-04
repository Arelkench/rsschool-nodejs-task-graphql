export type User = {
    id: string;
    name: string;
    balance: number;
};

export type CreateUser = {
    dto: Omit<User, 'id'>;
};


type SubsId = {
    subscriberId: string;
    authorId: string;
};

type SubsType = 'userSubscribedTo' | 'subscribedToUser';

type Example = Record<SubsType, SubsId>;
export type subscribedToUser = Omit<Example, 'subscribedToUser'>;

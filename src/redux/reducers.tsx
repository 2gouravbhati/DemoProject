import types from './type'

const initState = {
    users_following: {}
};

const UserPostReducer = (state = initState, action: any) => {
    switch (action.type) {
        case types.FOLLOW_USER:
            return {
                users_following: {
                    ...state.users_following,
                    [action.id]: true,
                },
            };
        case types.UN_FOLLOW_USER:
            return {
                users_following: {
                    ...state.users_following,
                    [action.id]: false,
                },
            };
    }
    return state;
};

export default UserPostReducer;


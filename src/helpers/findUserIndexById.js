// Function to find user index by user id
export const findUserIndexById = (usersFromDB, userId) => {
    return usersFromDB.findIndex(dbUser => dbUser.id === userId);
}
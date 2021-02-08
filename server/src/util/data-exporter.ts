import DB from '../database';

export const exportUserData = async (userId: string) => {
  const user = await DB.Models.User.findById(userId);

  // Remove things that shouldn't be exported
  //user.password = undefined;

  return {
    user,
  };
};

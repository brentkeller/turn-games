import { generateRandomString } from '../../util/strings';
import DB from '../../database';

export async function generateGameCode() {
  let code = generateRandomString(4, '23456789ABCDEFGHJKLMNPQRSTUVWXYZ');
  const games = await DB.Models.Game.find({ code, endDate: null }).lean();
  if (games?.length > 0) return generateGameCode();
  return code;
}

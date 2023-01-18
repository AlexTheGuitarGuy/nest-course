import * as bcrypt from 'bcrypt';

export const encodePassword = (password: string) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const comparePasswords = (
  introducedPassword: string,
  hashedPassword: string,
) => {
  return bcrypt.compareSync(introducedPassword, hashedPassword);
};

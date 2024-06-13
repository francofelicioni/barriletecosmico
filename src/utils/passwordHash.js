import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
   return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}
export const comparePassword = async (user, password) => {
    return bcrypt.compareSync(password, user.password);
}
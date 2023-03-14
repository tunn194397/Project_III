import { User } from 'src/database/entities/User.entity';

const userResponseSerializer = (user: User) => {
  delete user.passwordHash;
};

export default userResponseSerializer;

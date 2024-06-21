import { AppDataSource } from "../datasource";
import { User } from "../entity/user.entity";
import bcrypt from "bcrypt";

const userRepository = AppDataSource.getRepository(User);

export const getAllUsers = async () => {
  const rows = await userRepository.find({
    select: {
      id: true,
      username: true,
      email: true,
    },
  });
  return rows;
};

export const addUser = async (
  username: string,
  email: string,
  password: string
) => {
  const existingUser = await userRepository.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  const encryptPass = await bcrypt.hash(password, 10);
  const result = userRepository.create({
    username,
    email,
    password: encryptPass,
  });
  await userRepository.save(result);
  console.log(result);
};

export const loginUser = async (email: string, password: string) => {
  const user = await userRepository.findOne({ where: { email } });
  if (!user) {
    throw new Error("User not found");
  }
  const passCheck = await bcrypt.compare(password, user.password);
  if (!passCheck) {
    throw new Error("Incorrect Password");
  }
  return user;
};

export const getImage = async (userId: number, imageUrl: string) => {
  const user = await userRepository.findOneBy({ id: userId });
  if (!user) {
    throw new Error("User Not found");
  }
  user.imageUrl = imageUrl;
  await userRepository.save(user);
  return user;
};

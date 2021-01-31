import { plainToClass } from "class-transformer";
import User from "./user.type";

const loadUsers = (): User[] => {
  return plainToClass(User, [
    {
      id: 1,
      name: "Fateen Khaled",
      email: "fateen_khaled@hotmail.com",
      password: "fateen@123",
      status: 1
    },
  ])
};

export default loadUsers;
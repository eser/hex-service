import { mongo } from "./core/deps.ts";
import { MongoRepository } from "./core/data/mongo.ts";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

const client = new mongo.MongoClient();
const db = await client.connect("mongodb://localhost:27017/datapad_test");

const userRepository = new MongoRepository<User>(db.collection<User>("users"));

// const record = await userRepository.add({ firstName: "Eser", lastName: "Ozvataf", email: "eser@ozvataf.com" });
// console.log(record);

// await userRepository.update("632fb5ca60d317e05192ea8c", { email: "eser@ozvataf.com" });
// await userRepository.replace("632fb5ca60d317e05192ea8c", { firstName: "Eser", lastName: "Ozvataf", email: "eser@ozvataf.com" });

// await userRepository.remove("632fb5ca60d317e05192ea8c");

// const user = await userRepository.get("632fb5ca60d317e05192ea8c");
// console.log(user);

const users = await userRepository.getAll();
console.log(users);

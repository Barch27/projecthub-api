import bcrypt from "bcrypt";

const password = "Password123";

const hash = await bcrypt.hash(password, 10);

console.log(hash);

const match = await bcrypt.compare("password1234", hash);

console.log(match);
import { cleanEnv, port, str, url } from "envalid";

export default cleanEnv(process.env, {
  JWT_SECRET: str(),
  MAIL_USER: str(),
  MAIL_PASS: str(),
  EXPRESS_PORT: port(),
  COOKIE_NAME:str(),

});

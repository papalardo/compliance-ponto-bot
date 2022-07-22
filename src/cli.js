import batePonto from "./bate-ponto.js";
import env from "dotenv";

env.config();

void batePonto(
    process.env['CREDENTIAL_EMAIL'],
    process.env['CREDENTIAL_PASSWORD']
);
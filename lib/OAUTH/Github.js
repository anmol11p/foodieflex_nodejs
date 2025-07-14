import { GitHub } from "arctic";

const clientId = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
const redirectURI = `${process.env.FRONTEND_URL}/github/callback`;
export const github = new GitHub(clientId, clientSecret, redirectURI);

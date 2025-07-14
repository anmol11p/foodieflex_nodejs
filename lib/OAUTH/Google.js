import { Google } from "arctic";

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirectURI = `${process.env.FRONTEND_URL}/google/callback`;
export const google = new Google(clientId, clientSecret, redirectURI);

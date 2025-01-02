import { settings } from "./../config/settings";
import jwt from "jsonwebtoken";

export function generate_token(id : string) {
    return jwt.sign({ id }, settings.jwtSecret, { algorithm : 'HS256'});
}

export function verify_token(token : string) {
    const decoded = jwt.verify(token, settings.jwtSecret, { algorithms : ['HS256']}) as { id : string };
    return decoded['id'];
}
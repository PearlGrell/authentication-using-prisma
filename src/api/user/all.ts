import { db } from "./../../database/database";
import { users as table } from "./../../database/schema";
import { response, sanitize_user } from "./../../helpers/response";
import { Context } from "./../../types";

export async function all({ req, res }: Context){
    try{
        const users_ = await db.select().from(table).all();

        if(users_.length === 0){
            response.error_message(res, "No users found", 404);
            return;
        }

        const users = users_.map(sanitize_user);
        response.success(res, users, "users");
    }
    catch(err){
        response.error(res, err);
    }
}

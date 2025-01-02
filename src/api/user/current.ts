import { eq } from "drizzle-orm";
import { db } from "../../database/database";
import { users as table } from "../../database/schema";
import { response, sanitize_user } from "../../helpers/response";
import { Context } from "../../types";
import { verify_token } from "../../helpers/token";

export async function current({ req, res }: Context){
    try{

        const token = req.headers.authorization.split(" ")[1];

        if(!token){
            response.error(res, "Token not found", 401);
            return;
        }

        const id = verify_token(token);

        const user = await db.select().from(table).where(eq(table.id, id)).get();

        if(!user){
            response.error(res, "User not found", 404);
            return;
        }

        response.success(res, sanitize_user(user), "user");
    }
    catch(err){
        response.error(res, err);
    }
}

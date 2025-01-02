import { eq } from "drizzle-orm";
import { db } from "./../../database/database";
import { users as table } from "./../../database/schema";
import { response, sanitize_user } from "./../../helpers/response";
import { Context } from "./../../types";

export async function id({ req, res }: Context){
    try{

        const id = req.params.id;

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

import { db } from "../../database/database";
import { response } from "../../helpers/response";
import { validator } from "../../helpers/validator";
import { users } from "../../database/schema";
import UserModel from "../../models/user";
import { Context } from "../../types";
import { generate_token } from "../../helpers/token";
import { eq } from "drizzle-orm";

function query_users(email: string) {
    return db.select().from(users).where(eq(users.email, email)).all();
}

export async function create({ req, res } : Context) {
    try{
        const { firstName, lastName, email, dob } = await req.body;

        const validate = validator({ firstName, lastName, email, dob });

        if(!validate.value){
            return response.error(res, validate.error, 400);
        }
        
        const existingUsers = await query_users(email);

        if (existingUsers.some((user) => user.email === email)) {
            response.error_message(res, `User with email '${email}' already exists`, 400);
            return;
        }
        
        const user = new UserModel({ firstName, lastName, email, dob });

        await user.setPassword(`${firstName}_${lastName}_${dob.split("-")[0]}`);

        const token = generate_token(user.id);

        const result = await db.insert(users).values(user.database()).returning();

        if (result.length === 0) {
            response.error_message(res, "User could not be created", 500);
            return;
        }

        response.success(res, token, "token");
    }
    catch(err){
        response.error(res, err, 500);
    }
}
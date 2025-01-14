import { db } from "../../database/database";
import { users } from "../../database/schema";
import { eq } from "drizzle-orm";
import { response } from "../../helpers/response";
import { verify_token } from "../../helpers/token";
import UserModel from "../../models/user";
import { Context } from "../../types";

export async function forgotPassword({ req, res }: Context) {
    try{
        const { email } = req.body;

        const userData =  await db.select().from(users).where(eq(users.email, email)).get();  
        
        if(!userData) return response.error(res, "User not found", 404);

        const user = new UserModel(userData);

        await user.sendPasswordResetEmail();

        await db.update(users).set(user).where(eq(users.email, email)).run();

        response.success(res, "OTP Sent Successfully", "message");
    }
    catch(e){
        console.error(e);
    }
}
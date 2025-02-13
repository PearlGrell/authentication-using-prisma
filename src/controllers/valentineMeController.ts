import { NextFunction, Request, Response } from "express";
import db from "../database";
import { response } from "../helper/response";

export default async function valentineMe(req: Request, res: Response, next: NextFunction){
    const {name, date_time, coffee} = req.body;
    if(!name || !date_time || !coffee){
        next(new Error("Input fields required"));
    }
    await db.valentine_Me.create({
        data: {
            name,
            coffee,
            date_time
        }
    }).then(()=>response(res,200,"Added")).catch(next);
}
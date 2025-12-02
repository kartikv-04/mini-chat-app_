import type { Request, Response, NextFunction } from "express";
import { signupService, loginService, logoutService } from "../services/auth.service.js";

export const signup = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        const result = await signupService(username, email, password);
        res.status(201).json({
            success: true,
            data: result
        })
    }
    catch(error : any){
        res.status(400).json({
            success : false,
            error : error.message || "Error in signing up user"
        })
    }

}

export const signin = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        const result = await loginService(email, password);
        res.status(200).json({
            success: true,
            data: result
        })
    }
    catch(error : any){
        res.status(400).json({
            success : false,
            error : error.message || "Error in logging in user"
        })
    }

    
}

export const signout = async (req : Request, res : Response) => {
    try {
        const { userId} = req.body;
        const result = await logoutService(userId);
        res.status(200).json({
            success : true,
            data : result
        })
    }
    catch(error : any){
        res.status(400).json({
            success : false,
            error : error.message || "Error in logging out user"
        })
    }
}
import type { Request, Response, NextFunction } from "express";
import { signupService, loginService, logoutService, getMeService } from "../services/auth.service.js";
import type { AuthRequest } from "../middleware/authenticate.js";

export const signup = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        const result = await signupService(username, email, password);
        res.status(201).json({
            success: true,
            data: result
        })
    }
    catch (error: any) {
        res.status(400).json({
            success: false,
            error: error.message || "Error in signing up user"
        })
    }

}

export const signin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const { user, accessToken, refreshToken } = await loginService(email, password);

        // drop refresh token into HttpOnly cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,        // set to false only on localhost if needed
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        // frontend only gets what it needs
        return res.status(200).json({
            success: true,
            data: {
                user,
                accessToken,
            }
        });

    } catch (error: any) {
        return res.status(400).json({
            success: false,
            error: error.message || "Error logging in",
        });
    }
};


export const signout = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;
        const result = await logoutService(userId);
        res.status(200).json({
            success: true,
            data: result
        })
    }
    catch (error: any) {
        res.status(400).json({
            success: false,
            error: error.message || "Error in logging out user"
        })
    }
}

export const getMe = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                error: "Unauthorized"
            });
        }
        const user = await getMeService(req.user.id);
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            error: error.message || "Error fetching user profile"
        });
    }
}
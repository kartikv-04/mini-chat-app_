import bcrypt from "bcryptjs";
import logger from "../config/logger.js";
import userModel from "../model/user.model.js";
import jwt from "jsonwebtoken";
import { ACCESS_SECRET, REFRESH_SECRET } from "../config/env.js";


// auth service file to handle authenticatoin login 

export const signupService = async (username : string, email: string, password: string) => {

    try {
        // Check if feilds are not empty
        if (!username || !email || !password) {
            logger.error("USername, Email and Password are required!");
            throw new Error("Username, Email and password are required!");
        }

        // Check if email already exists or not
        const emailExist = await userModel.findOne({ email });
        if (emailExist) {
            logger.error("Email already exists!");
            throw new Error("Email already exists!");
        }

        const usernameExist = await userModel.findOne({ username})
        if(usernameExist){
            logger.error("USername already exists!");
            throw new Error("Username already exists!");
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const createUser = new userModel({
            username,
            email,
            password: hashPassword
        })

        // save user to database
        const newUser = await createUser.save();
        logger.info("User created successfully!");
        return {
            id : newUser._id,
            username : newUser.username,
            email : newUser.email,


        }
    }
    catch (error: any) {
        logger.error("Error in creating new USer");
        throw new Error(error.message || "Error in creating new User");
    }



}

export const loginService = async (email: string, password: string) => {

    try {
        // logic to aunthenticate user
        if (!email || !password) {
            logger.error("Email and password are required!");
            throw new Error("Email and passwrod are required!");
        }
        const userExist = await userModel.findOne({ email });
        if (!userExist) {
            logger.error("Invalid email or password!");
            throw new Error("Invalid email or password!");
        }

        // Check hash password and compare
        const isMatch = await bcrypt.compare(password, userExist.password);
        if (email !== userExist.email || !isMatch) {
            logger.error("Invalid email or password!");
            throw new Error("Invalid email or password!");
        }

        // Generate Rrfresh and Access Token
        if (!REFRESH_SECRET || !ACCESS_SECRET) {
            logger.error("REFRESH_TOKEN is not DEfined");
            throw new Error("REFRESH_TOKEN is not Defined!");
        }
        const accessToken = jwt.sign({ id: userExist._id, email: userExist.email }, ACCESS_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ id: userExist._id, email: userExist.email }, REFRESH_SECRET, { expiresIn: '30d' });

        // Save accessToken to databse
        userExist.refreshToken = refreshToken;
        userExist.isOnline = true;
        userExist.lastSeen = new Date();
        await userExist.save();

        // Return Tokens
        logger.info("User logged in Successfully!");
        return userExist;
    }
    catch (error : any) {
        logger.error("Error in signing in user");
        throw new Error("Error in signing in user :", error.message);
    }

    
}

export const logoutService = async (userid : string) => {
    try {
        const user = await userModel.findById(userid);
        if(!user){
            logger.error("User not found ");
            throw Error("USer not found");
        }

        user.refreshToken = null;
        user.lastSeen = new Date();
        user.isOnline = false;
        await user.save();
        logger.info("USer logged out Successfully");
        return { message : "Logged out Successfully" };
    }
    catch(error : any){
        logger.error("Error in loggin out user");
        throw new Error("Error in loggin out user : " + error.message);
    }
}

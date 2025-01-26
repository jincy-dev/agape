'use server';

import {signInFormSchema} from "..//validators";
import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import {prisma} from "@/db/prisma";
import { hashSync } from "bcrypt-ts-edge";
import { formatError } from "../utils";


//sign in the user with credentials

export async function signInWithcredentials(prevState:unknown, formData:FormData){
    try {
        const user=signInFormSchema.parse({
            name:formData.get('name'),
            email:formData.get('email'),
            password:formData.get('password'),
        })
        await signIn('credentials', user);
        return {success:true, message:'Signed in successfully'};
    } catch (error) {
        if(isRedirectError(error)){
            throw error;
        }

            return {success:false, message:'Invalid email or password'};
        }
    }

//sign out the user

export async function signOutUser(){
    await signOut();
}

//sign up user

export async function signUpUser(prevState:unknown, formData:FormData){
    try {
        const user=signInFormSchema.parse({
            name:formData.get('name'),
            email:formData.get('email'),
            password:formData.get('password'),
            confirmPassword:formData.get('confirmPassword'),
        })

        const plainpassword=hashSync(user.password, 10);
        
        user.password=hashSync(user.password, 10);

        await prisma.user.create({
            data:{
                name:user.name,
                email:user.email,
                password:user.password,
            },
        });
        await signIn('credentials', {
            email:user.email,
            password:plainpassword,
        });
        return {success:true, message:'User registered successfully'};
    } catch (error) {
        if(isRedirectError(error)){
            throw error;
        }

        return {success:false, message:formatError(error)};
    }
}
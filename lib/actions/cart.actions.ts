'use server';

import { cookies } from "next/headers";
import { CartItem } from "@/types";
import { formatError } from "../utils";

export async function addItemToCart(data: CartItem) {
    try{
        const sessionCartId=(await cookies()).get('sessionCartId')?.value;

        if(!sessionCartId)throw new Error('No session cart id found');

        const session=await auth();
        const userId=session?.user?.id ? (session.user.id as string):undefined;

        console.log({
            'Session Cart Id':sessionCartId,
            'UserZ Id':userId,
        });
        
    return{
        success:true,
        message:'Item added to cart',  
    };
}
catch (error) {
    return {
        success: false,
        message: formatError(error)
    };
}
}
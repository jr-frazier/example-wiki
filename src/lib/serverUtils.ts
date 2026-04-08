import {authServer} from "@/lib/auth/server";
import {redirect} from "next/navigation";

export async function requireAuth() {
    const {data: session} = await authServer.getSession();

    if (!session?.user) {
        redirect('/auth/sign-in');
    }

    return session.user; // return the user so you can use it in the page
}
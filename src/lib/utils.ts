import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import {authServer} from "@/lib/auth/server";
import {redirect} from "next/navigation";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}


"use server";

import {redirect} from "next/navigation";
import {authServer} from "@/lib/auth/server";

export type CreateArticleInput = {
    title: string;
    content: string;
    authorId: string;
    imageUrl?: string;
};

export type UpdateArticleInput = {
    title?: string;
    content?: string;
    imageUrl?: string;
};

export async function createArticle(data: CreateArticleInput) {

    return {success: true, message: "Article create logged (stub)"};
}

export async function updateArticle(id: string, data: UpdateArticleInput) {
    const {data: session} = await authServer.getSession();

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    return {success: true, message: `Article ${id} update logged (stub)`};
}

export async function deleteArticle(id: string) {
    // TODO: Replace with actual database delete
    return {success: true, message: `Article ${id} delete logged (stub)`};
}

// Form-friendly server action: accepts FormData from a client form and calls deleteArticle
export async function deleteArticleForm(formData: FormData): Promise<void> {
    const id = formData.get("id");
    if (!id) {
        throw new Error("Missing article id");
    }

    await deleteArticle(String(id));
    // After deleting, redirect the user back to the homepage.
    redirect("/");
}
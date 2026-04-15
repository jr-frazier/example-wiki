"use server";
import {authServer} from "@/lib/auth/server";
import {authUserToEditArticle} from "@/db/authz";
import {eq} from "drizzle-orm";
import db from "@/db"
import {articles} from "@/db/schema";

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

    const {data: session} = await authServer.getSession();

    if (!session?.user) {
        throw new Error("Unauthorized");
    }


    const user = session.user;

    await db.insert(articles).values({
        title: data.title,
        content: data.content,
        slug: `${Date.now()}`,
        published: true,
        authorId: user.id
    })

    return {success: true, message: "Article create logged (stub)"};
}

export async function updateArticle(id: string, data: UpdateArticleInput) {
    const {data: session} = await authServer.getSession();

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    if (!(await authUserToEditArticle(session.user.id, Number(id)))) {
        throw new Error("Unauthorized");
    }

    const user = session.user;

    await db.update(articles).set({
        title: data.title,
        content: data.content,
        imageUrl: data.imageUrl
    }).where(eq(articles.id, Number(id)));

    return {success: true, message: `Article ${id} update logged (stub)`};
}

export async function deleteArticle(id: string) {

    return {success: true, message: `Article ${id} delete logged (stub)`};
}

// Form-friendly server action: accepts FormData from a client form and calls deleteArticle
export async function deleteArticleForm(formData: FormData): Promise<void> {
    const id = formData.get("id");
    const {data: session} = await authServer.getSession();

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    if (!id) {
        throw new Error("Missing article id");
    }

    if (!(await authUserToEditArticle(session.user.id, Number(id)))) {
        throw new Error("Unauthorized");
    }

    await db.delete(articles).where(eq(articles.id, Number(id)));


}
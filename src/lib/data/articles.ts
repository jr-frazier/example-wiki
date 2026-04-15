import db from "@/db/index"
import {articles} from "@/db/schema"
import {eq} from "drizzle-orm"
import {usersSync} from "@/db/schema"


export const getArticles = async () => {
    const response = await db
        .select({
            id: articles.id,
            title: articles.title,
            content: articles.content,
            createdAt: articles.createdAt,
            author: usersSync.name
        })
        .from(articles)
        .leftJoin(usersSync, eq(articles.authorId, usersSync.id))

    return response
}

export const getArticleById = async (id: number) => {
    const response = await db
        .select({
            id: articles.id,
            title: articles.title,
            content: articles.content,
            createdAt: articles.createdAt,
            author: usersSync.name,
            imageUrl: articles.imageUrl
        })
        .from(articles)
        .where(eq(articles.id, id))
        .leftJoin(usersSync, eq(articles.authorId, usersSync.id))

    return response[0] ? response[0] : null;
}
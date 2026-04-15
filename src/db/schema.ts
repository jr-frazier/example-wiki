import {pgTable, serial, text, timestamp, boolean, pgSchema, uuid} from "drizzle-orm/pg-core"

const neonAuth = pgSchema("neon_auth")

// Define usersSync FIRST so articles can reference it
export const usersSync = neonAuth.table("user", {
    id: text("id").primaryKey(),
    name: text("name"),
    email: text("email"),
    createdAt: timestamp("created_at", {mode: "string"}),
    updatedAt: timestamp("updated_at", {mode: "string"}),
})

export type User = typeof usersSync.$inferSelect;

export const articles = pgTable("articles", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    content: text("content").notNull(),
    imageUrl: text("image_url"),
    published: boolean("published").default(false).notNull(),
    authorId: uuid("author_id")
        .notNull()
        .references(() => usersSync.id),
    createdAt: timestamp("created_at", {mode: "string"}).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", {mode: "string"}).defaultNow().notNull(),
})

export type Article = typeof articles.$inferSelect;
export type NewArticle = typeof articles.$inferInsert;

const schema = {articles}
export default schema
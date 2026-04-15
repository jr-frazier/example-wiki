import WikiArticleViewer from "@/components/WikiArticleViewer";
import {authServer} from "@/lib/auth/server";
import {getArticleById} from "@/lib/data/articles";


interface ViewArticlePageProps {
    params: Promise<{
        id: number;
    }>;
}

export default async function ViewArticlePage({
                                                  params,
                                              }: ViewArticlePageProps) {
    const {id} = await params;

    // Mock permission check - in a real app, this would come from auth/user context
    const {data: session} = await authServer.getSession();


    const article = await getArticleById(id);

    if (!article) {
        return <div>Article not found</div>;
    }

    const canEdit = !!session?.user && session?.user.name === article?.author

    return <WikiArticleViewer article={article} canEdit={canEdit}/>;
}
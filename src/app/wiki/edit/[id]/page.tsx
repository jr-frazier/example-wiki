import WikiEditor from "@/components/wiki-editor";
import {requireAuth} from "@/lib/serverUtils";
import {getArticleById} from "@/lib/data/articles";

interface EditArticlePageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditArticlePage({params}: EditArticlePageProps) {
    await requireAuth();

    const {id} = await params;

    const article = await getArticleById(Number(id));

    if (!article) {
        return <div>Article not found</div>;
    }


    return (
        <WikiEditor
            initialTitle={article.title}
            initialContent={article.content}
            isEditing={true}
            articleId={id}
        />
    );
}
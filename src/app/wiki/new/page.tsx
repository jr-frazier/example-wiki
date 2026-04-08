import WikiEditor from "@/components/wiki-editor";
import {requireAuth} from "@/lib/serverUtils";

export default async function NewArticlePage() {
    await requireAuth();

    return <WikiEditor isEditing={false}/>;
}
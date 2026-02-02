import styles from "./EditArticle.module.scss";
import { Button } from "@/components/Button/Button.jsx";
import { postArticle } from "@/services/articleService.js";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Input } from "@/components/Input/Input.jsx";
import { Editor } from "@/components/Editor/Editor.jsx";

export function EditArticlePage() {
  const navigate = useNavigate();
  const [articleTitle, setArticleTitle] = useState("");
  const [editorState, setEditorState] = useState("");
  const [error, setError] = useState(null);

  const handlePostArticle = async () => {
    try {
      const result = await postArticle(articleTitle, editorState);

      navigate(`/posts/${result.post.id}/edit`, { replace: true });
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  return (
    <>
      <section className={styles.container}>
        <Input
          value={articleTitle}
          onChange={(event) => setArticleTitle(event.target.value)}
          type="text"
          placeholder="Title"
          isFullWidth={true}
          required={true}
        />
        <Editor editorState={editorState} setEditorState={setEditorState} />

        <Button kind="action" style="primary" onClick={handlePostArticle}>
          Save
        </Button>
        <Button kind="action" style="secondary" onClick={() => { }}>
          Publish
        </Button>
        <Button kind="danger" style="tertiary">
          Cancel
        </Button>
      </section>
    </>
  );
}

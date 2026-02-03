import styles from "./EditArticle.module.scss";
import { Button } from "@/components/Button/Button.jsx";
import { postArticle } from "@/services/articleService.js";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Input } from "@/components/Input/Input.jsx";
import { Editor } from "@/components/Editor/Editor.jsx";
import ServerValidationError from "@/errors/ServerValidationError.js";
import ServerError from "@/errors/ServerError.js";

export function EditArticlePage() {
  const navigate = useNavigate();
  const [articleTitle, setArticleTitle] = useState("");
  const [editorState, setEditorState] = useState("");
  const [error, setError] = useState({ status: null, errors: [] });

  const handlePostArticle = async () => {
    try {
      const result = await postArticle(articleTitle, editorState);

      navigate(`/posts/${result.post.id}/edit`, { replace: true });
    } catch (err) {
      if (err instanceof ServerValidationError) {
        setError({ status: err.status, errors: err.fields });
      } else if (err instanceof ServerError) {
        setError({ status: err.status, errors: [err.message] });
      }
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

        <ul className={styles.formErrors}>
          {error.errors.map((e, i) => (
            <li key={i}>{e.msg}</li>
          ))}
        </ul>

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

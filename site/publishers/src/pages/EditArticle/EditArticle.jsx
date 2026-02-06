import styles from "./EditArticle.module.scss";
import { Button } from "@/components/Button/Button.jsx";
import {
  postArticle,
  getArticleById,
  updateArticle,
} from "@/services/articleService.js";
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import { Input } from "@/components/Input/Input.jsx";
import { Editor } from "@/components/Editor/Editor.jsx";
import { ServerValidationError } from "@/errors/ServerValidationError.js";
import { ServerGenericError } from "@/errors/ServerGenericError.js";
import { useRef } from "react";

export function EditArticlePage() {
  const navigate = useNavigate();
  const [articleTitle, setArticleTitle] = useState("");

  // Empty editor state
  const [editorState, setEditorState] = useState(
    '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":null,"format":"","indent":0,"type":"root","version":1}}',
  );
  const [error, setError] = useState({ status: null, errors: [] });
  let params = useParams();

  const [isLoading, setIsLoading] = useState(params.postId ? true : false);

  useEffect(() => {
    async function handleGetArticle() {
      try {
        if (isLoading) {
          const result = await getArticleById(params.postId);
          const article = result.article;

          setIsLoading(false);
          setArticleTitle(article.title);
          setEditorState(article.content);
        }
      } catch (err) {
        if (err instanceof ServerValidationError) {
          setError({ status: err.status, errors: err.fields });
        } else if (err instanceof ServerGenericError) {
          setError({ status: err.status, errors: [err.message] });
        }
      }
    }

    handleGetArticle();
  }, [isLoading, params.postId]);

  const handlePostOrUpdateArticle = async () => {
    try {
      const result = !params.postId
        ? await postArticle(articleTitle, editorState)
        : await updateArticle(params.postId, articleTitle, editorState);

      if (!params.postId)
        navigate(`/articles/${result.post.id}/edit`, { replace: true });
    } catch (err) {
      if (err instanceof ServerValidationError) {
        setError({ status: err.status, errors: err.fields });
      } else if (err instanceof ServerGenericError) {
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

        {!isLoading ? (
          <Editor editorState={editorState} setEditorState={setEditorState} />
        ) : null}

        <ul className={styles.formErrors}>
          {error.errors.map((e, i) => (
            <li key={i}>{e.msg}</li>
          ))}
        </ul>

        <Button
          kind="action"
          style="primary"
          onClick={handlePostOrUpdateArticle}
        >
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

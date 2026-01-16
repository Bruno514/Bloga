import { useRef } from "react";

import { Editor } from "@tinymce/tinymce-react";
import styles from "./NewArticle.module.scss";
import { Button } from "@/components/Button/Button.jsx";
import { postArticle } from "@/services/articleService.js";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Input } from "@/components/Input/Input.jsx";

export function EditArticlePage() {
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const [articleTitle, setArticleTitle] = useState("");
  const [error, setError] = useState(null);

  const handlePostArticle = async () => {
    try {
      const content = editorRef.current.getContent();

      const result = await postArticle(articleTitle, content);

      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
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
        />
        <Editor
          apiKey={import.meta.env.VITE_TINYMCE_API}
          onInit={(evt, editor) => (editorRef.current = editor)}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />

        <Button variant="primary" onClick={handlePostArticle}>
          Save
        </Button>
        <Button variant="secondary">Publish</Button>
      </section>
    </>
  );
}

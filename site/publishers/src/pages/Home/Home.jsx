import styles from "./Home.module.scss";

import { Button } from "@/components/Button/Button.jsx";
import { getArticles } from "@/services/articleService.js";
import { useEffect } from "react";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { ServerValidationError } from "@/errors/ServerValidationError.js";
import { ServerGenericError } from "@/errors/ServerGenericError.js";

export function HomePage() {
  let loaderData = useLoaderData();
  let navigate = useNavigate();

  const userId = loaderData.user.id;
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    async function handleGetArticles() {
      try {
        const result = await getArticles(undefined, userId);

        setArticles(result.articles);
      } catch (err) {
        if (err instanceof ServerValidationError) {
          setError({ status: err.status, errors: err.fields });
        } else if (err instanceof ServerGenericError) {
          setError({ status: err.status, errors: [err.message] });
        }
      }
    }

    handleGetArticles();
  }, [userId]);

  return (
    <>
      <div className={styles.container}>
        <h1> Hello {loaderData.user.name}! 👋</h1>

        <Button
          kind="action"
          style="primary"
          onClick={() => navigate("/articles/new")}
        >
          New article!
        </Button>

        <section className={styles.articles}>
          {articles.map((article) => (
            <a key={article.id} href={`/articles/${article.id}/edit`}>
              <article className={styles.article}>
                <h1 className="article-title">{article.title}</h1>
                <p>{article.content}</p>
                <p className="date">
                  {new Date(article.updatedAt).toDateString()}
                </p>
                <p className="not-published">
                  {article.published ? "Published" : "Not Published"}
                </p>
              </article>
            </a>
          ))}
        </section>
      </div>
    </>
  );
}

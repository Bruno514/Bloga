import { Button } from "@/components/Button/Button.jsx";
import { useLoaderData, useNavigate } from "react-router";

export function HomePage() {
  let loaderData = useLoaderData();
  let navigate = useNavigate();

  function handleCreateArticle() {
    navigate("/articles/new");
  }

  return (
    <>
      <h1> Hello {loaderData.user.name}! 👋</h1>

      <Button kind="action" style="primary" onClick={handleCreateArticle}>
        New article!
      </Button>
    </>
  );
}

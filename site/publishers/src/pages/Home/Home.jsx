import { Button } from "@/components/Button/Button.jsx";
import { useLoaderData, useNavigate } from "react-router";

export function HomePage() {
  let loaderData = useLoaderData();
  let navigate = useNavigate();

  function handleCreateArticle() {
    navigate("/new");
  }

  return (
    <>
      <h1> Hello {loaderData.user.name}! 👋</h1>

      <Button variant="primary" onClick={handleCreateArticle}>
        New article!
      </Button>
    </>
  );
}

import { Button } from "@/components/Button/Button.jsx";
import { useLoaderData } from "react-router";

export function HomePage() {
  let loaderData = useLoaderData();

  function handleCreateArticle() {
    console.log("Hello");
  }

  console.log(loaderData);
  return (
    <>
      <h1> Hello {loaderData.user.name}! 👋</h1>
      <Button text="Hello" variant="tertiary" onClick={handleCreateArticle} />
    </>
  );
}

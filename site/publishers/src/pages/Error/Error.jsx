import { useRouteError } from "react-router";
import styles from "./Error.module.scss";

export function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id={styles.errorPage}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

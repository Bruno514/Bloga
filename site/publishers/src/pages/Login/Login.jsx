import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { postSession } from "@/services/authService.js";
import { Button } from "@/components/Button/Button.jsx";
import styles from "./Login.module.scss";
import { Input } from "@/components/Input/Input.jsx";

export function LoginPage() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function login(formData) {
    try {
      const email = formData.get("email");
      const password = formData.get("password");

      const result = await postSession(email, password);

      localStorage.setItem("token", result.token);

      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  }

  return (
    <section className={styles.section}>
      <form className={styles.form} action={login}>
        <Input
          id="email"
          name="email"
          placeholder="Email"
          type="email"
          minLength={6}
          maxLength={60}
          required
        />
        <Input
          id="password"
          name="password"
          placeholder="Password"
          type="password"
          minLength={8}
          maxLength={25}
          required
        />

        {error ? <p className={styles.error}>{error}</p> : null}

        <Button kind="action" style="primary" type="submit">
          Login
        </Button>
        <p className={styles.signUp}>
          Don't have an account?{" "}
          <Link className={styles.link} to="/signup">
            Sign up!
          </Link>
        </p>
      </form>
    </section>
  );
}

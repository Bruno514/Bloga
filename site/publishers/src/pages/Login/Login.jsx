import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { postSession } from "@/services/authService.js";
import styles from "./Login.module.scss";

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
        <input
          id="email"
          name="email"
          placeholder="Email"
          type="email"
          minLength={6}
          maxLength={60}
          required
        />
        <input
          id="password"
          name="password"
          placeholder="Password"
          type="password"
          minLength={8}
          maxLength={25}
          required
        />

        {error ? <p className={styles.error}>{error}</p> : null}

        <button className={styles.submitButton} type="submit">
          Log in
        </button>
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

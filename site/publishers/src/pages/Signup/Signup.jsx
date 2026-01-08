import { Link, useNavigate } from "react-router";
import { useState } from "react";
import styles from "./Signup.module.scss";
import { createUser } from "@/services/userService.js";

export function SignupPage() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function register(formData) {
    try {
      const username = formData.get("username");
      const email = formData.get("email");
      const password = formData.get("password");
      const confirmPassword = formData.get("confirmPassword");

      const result = await createUser(
        username,
        email,
        password,
        confirmPassword,
      );

      navigate("/login");
    } catch (err) {
      if (err.statusCode >= 500) throw err;
      setError(err.message);
    }
  }

  return (
    <section className={styles.section}>
      <form className={styles.form} action={register}>
        <input
          id="username"
          name="username"
          placeholder="Username"
          type="text"
          minLength={6}
          maxLength={60}
          required
        />
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
        <input
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm password"
          type="password"
          minLength={8}
          maxLength={25}
          required
        />

        {error ? <p className={styles.error}>{error}</p> : null}

        <button className={styles.submitButton} type="submit">
          Sign up
        </button>
        <p className={styles.login}>
          Already have an account?{" "}
          <Link className={styles.link} to="/login">
            Log in!
          </Link>
        </p>
      </form>
    </section>
  );
}

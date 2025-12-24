import { Link } from "react-router";

export default function LoginPage() {
  return (
    <section>
      <form>
        <input id="email" name="email" placeholder="Email" />
        <input id="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/sign-up">Sign up</Link></p>
    </section>
  )
}

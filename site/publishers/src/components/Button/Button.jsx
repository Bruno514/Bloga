import styles from "./Button.module.scss";

export function Button({ children, onClick, style, kind }) {
  const variant =
    styles[`${kind}${style.charAt(0).toUpperCase() + style.slice(1)}`];
  return (
    <>
      <button className={variant} onClick={onClick}>
        {children}
      </button>
    </>
  );
}

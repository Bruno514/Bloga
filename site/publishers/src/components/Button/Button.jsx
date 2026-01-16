import styles from "./Button.module.scss";

export function Button({ children, onClick, variant, type, className = [] }) {
  const buttonStyle = [styles.button, styles[variant]]
    .concat(className)
    .join(" ");
  return (
    <>
      <button className={buttonStyle} onClick={onClick} type={type}>
        {children}
      </button>
    </>
  );
}

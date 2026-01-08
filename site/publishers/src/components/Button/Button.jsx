import styles from "./Button.module.scss";

export function Button({ text, onClick, variant, type, classNames = [] }) {
  const buttonStyle = [styles.button, styles[variant]].concat(classNames);
  return (
    <>
      <button className={buttonStyle} onClick={onClick} type={type}>
        {text}
      </button>
    </>
  );
}

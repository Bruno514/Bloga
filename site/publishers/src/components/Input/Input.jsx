import styles from "./Input.module.scss";

export function Input({
  id,
  name,
  onChange,
  children,
  type,
  placeholder,
  isFullWidth,
  maxLength,
  minLength,
  required,
  ...props
}) {
  return (
    <>
      <input
        id={id}
        name={name}
        onChange={onChange}
        className={isFullWidth ? styles.inputFullWidth : styles.input}
        placeholder={placeholder}
        type={type}
        maxLength={maxLength}
        minLength={minLength}
        required={required}
        {...props}
      >
        {children}
      </input>
    </>
  );
}

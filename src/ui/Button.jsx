import { Link } from "react-router-dom";

export default function Button({ children, disabled, to, type, onClick }) {
  // const className = "inline-block rounded-full bg-yellow-500 px-4 py-2 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-200 hover:bg-yellow-400 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed sm:px-5 sm:py-3";
  const base =
    "inline-block rounded-full bg-yellow-500 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-200 hover:bg-yellow-400 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed text-sm";
  const styles = {
    primary: base + " px-4 py-2 md:px-5 md:py-3",
    small: base + " px-2 py-1.5 md:px-3 text-xs",
    round: base + " px-2 py-1.5 md:px-3 text-sm",
    secondary:
      "inline-block rounded-full border-2 border-stone-600 font-semibold uppercase tracking-wide text-stone-600 transition-colors duration-200 hover:bg-stone-800 hover:text-stone-200 focus:bg-stone-800 focus:outline-none focus:ring focus:ring-stone-500 focus:ring-offset-1 disabled:cursor-not-allowed px-4 py-2 md:px-5 md:py-3 text-sm",
  };
  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button className={styles[type]} disabled={disabled} onClick={onClick}>
        {children}
      </button>
    );
  return (
    <button className={styles[type]} disabled={disabled}>
      {children}
    </button>
  );
}

import useTheme from "../hooks/useTheme";

function Footer() {
  const { theme } = useTheme();

  return (
    <footer
      className={`
        mt-10 py-8
        text-center
        transition-colors
        duration-300

        ${
          theme === "dark"
            ? "border-t border-white/10 text-gray-400"
            : "border-t border-black/10 text-gray-500"
        }
      `}
    >
      (c) 2026 LeoStore - Demo ecommerce.
    </footer>
  );
}

export default Footer;

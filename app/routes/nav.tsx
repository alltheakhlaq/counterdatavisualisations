import { Link } from "react-router";

const navItems = [
  { title: "Home", to: "/" },
  { title: "Documentation", to: "/documentation" },
  { title: "Vocabulary", to: "/Vocabulary" },
  { title: "Literature", to: "/Literature" },
];

export function Nav() {
  return (
    <nav className="flex flex-row justify-center m-3">
      {navItems.map((item) => (
        <div>
          <Link
            className="group flex justify-center p-3 underline hover:decoration-amber-300"
            to={item.to}
          >
            {item.title}
          </Link>
        </div>
      ))}
    </nav>
  );
}

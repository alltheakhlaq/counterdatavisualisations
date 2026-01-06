import { Link } from "react-router";

const navItems = [
  { title: "Home", to: "/" },
  { title: "Documentation", to: "/documentation" },
  { title: "Vocabulary", to: "/Vocabulary" },
  { title: "Literature", to: "/Literature" },
];

export function Nav() {
  return (
    <nav className="flex flex-row">
      {navItems.map((item) => (
        <div className="border-solid border-2">
          {/* {item.title} */}
          <Link
            className="group flex items-center gap-3 self-stretch pt-3 leading-normal underline hover:decoration-amber-300"
            to={item.to}
          >
            {item.title}
          </Link>
        </div>
      ))}
    </nav>
  );
}

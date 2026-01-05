const navItems = [
  { title: "Home" },
  { title: "Documentation" },
  { title: "Vocabulary" },
  { title: "Literature" },
];

export function Nav() {
  return (
    <nav className="flex flex-row">
      {navItems.map((item) => (
        <div className="border-solid border-2">{item.title}</div>
      ))}
    </nav>
  );
}

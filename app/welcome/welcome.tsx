import { title } from "process";
import logo from "./logo.png";
import { Link } from "react-router";

export function Welcome() {
  return (
    <main className="flex items-center justify-center pt-16 pb-16">
      <div className="flex-1  flex-col items-center gap-5 min-h-0">
        <header className="flex flex-col items-center gap-9">
          {/* <div className="w-[500px] max-w-[100vw] p-4">
            <img src={logo} alt="React Router" className="block w-full" />
          </div> */}
          <div className="p-5 font-bold">
            <h1>Counterdata Visualisation</h1>
            <p className="text-2xl">of Digital Museum Collections</p>
          </div>
        </header>
        <div className="flex flex-row">
          {resources.map(({ to, title, linktext, bodyText }) => (
            <div className="max-w-[400px] w-screen space-y-6 px-4">
              <nav className="bg-white rounded-2xl border border-black-200 p-6">
                <ul>
                  <li key={to}>
                    <h2>{title}</h2>
                    <p className="pt-3">{bodyText}</p>
                    <Link
                      className="group flex items-center gap-3 self-stretch pt-3 leading-normal underline hover:decoration-amber-300"
                      to={to}
                    >
                      {linktext}
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

const resources = [
  {
    to: "",
    title: "What is counterdata visualisation?",
    linktext: <p>more details</p>,
    bodyText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    to: "/sloane",
    title: "Sloane Collection",
    linktext: <p>View counterdata visualisation of objects from collection of Sir Hans Sloane</p>,
    bodyText: "",
  },
  {
    to: "/clive",
    title: "Clive Collection",
    linktext: <p>View counterdata visualisation of objects from collection of the Clive Family </p>,
    bodyText: "",
  },
];

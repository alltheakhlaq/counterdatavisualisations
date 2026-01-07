import { title } from "process";
import logo from "./logo.png";
import { Link } from "react-router";
import { Nav } from "~/routes/nav";

function InfoBlock({ resource }: { resource: Resource }) {
  const { bodyText, title, to, linktext } = resource;
  return (
    <div className="space-y-6">
      <nav className="bg-white rounded-2xl border border-black-200 p-6">
        {/* "bg-[#f9ada0]" */}
        <ul>
          <li>
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
  );
}

export function Welcome() {
  return (
    <main className="flex items-center">
      <div className="flex-1  flex-col items-center min-h-0">
        <header className="flex flex-col items-center">
          {/* <div className="w-[500px] max-w-[100vw] p-4">
            <img src={logo} alt="React Router" className="block w-full" />
          </div> */}
          <div className="pt-5 font-bold">
            <h1>Counterdata Visualisation</h1>
            <p className="text-2xl">of Digital Museum Collections</p>
          </div>
        </header>
        <Nav />
        <div className="flex flex-row justify-center">
          <div className="w-2/3">
            <InfoBlock resource={resources[0]} />
          </div>
          <div className="flex flex-col w-1/3">
            <InfoBlock resource={resources[1]} />
            <InfoBlock resource={resources[2]} />
          </div>
        </div>
      </div>
    </main>
  );
}

interface Resource {
  to: string;
  title: string;
  linktext: any;
  bodyText: string;
}

const resources: Resource[] = [
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

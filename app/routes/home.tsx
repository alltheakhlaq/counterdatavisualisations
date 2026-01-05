import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Counterdata Visualisation of Digital Museum Collections" },
    {
      name: "description",
      content:
        "Challenging power in digital museum collections through data and visual interventions",
    },
  ];
}

export default function Home() {
  return <Welcome />;
}

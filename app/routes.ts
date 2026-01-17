import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/sloane", "./sloanecol/sloanecol.tsx"),
  route("/sloane-new", "./sloanecol/sloanecol-new.tsx"),
  route("/sloane-new/:objectIndex", "./object-page.tsx"),
  route("/clive", "./clivecol/clivecol.tsx"),
  route("/rdf-test", "./rdf-test.tsx"),
] satisfies RouteConfig;

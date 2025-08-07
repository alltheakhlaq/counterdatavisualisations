import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/sloane", "./sloanecol/sloanecol.tsx"),
  route("/clive", "./clivecol/clivecol.tsx"),
] satisfies RouteConfig;

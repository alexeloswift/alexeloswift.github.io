import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("yes", "routes/yes.tsx"),
    route("no", "routes/no.tsx"),
] satisfies RouteConfig;

import { flattenPaths } from "../helpers/flattenPaths";

/* 
public: rutas de acceso público
auth: rutas de acceso solo para usuarios autenticados
guest: rutas de acceso solo para visitantes (no autenticados)
*/
const PATH_ACCESS_TYPES = {
  public: "public",
  auth: "auth",
  guest: "guest",
};

export const PATHS = {
  root: {
    absolute: "/",
    access: PATH_ACCESS_TYPES.auth,
    tags: {
      relative: "tags",
      absolute: "/tags",
      access: PATH_ACCESS_TYPES.auth,
      new: {
        relative: "new",
        absolute: "/tags/new",
        access: PATH_ACCESS_TYPES.auth,
      },
      edit: {
        relative: "edit/:id",
        absolute: "/tags/edit/:id",
        generate: ({ id = "" }: { id: string }) => `/tags/edit/${id}`,
        access: PATH_ACCESS_TYPES.auth,
      },
    },
    accounts: {
      relative: "accounts",
      absolute: "/accounts",
      access: PATH_ACCESS_TYPES.auth,
      new: {
        relative: "new",
        absolute: "/accounts/new",
        access: PATH_ACCESS_TYPES.auth,
      },
    },
    transactions: {
      relative: "transactions",
      absolute: "/transactions",
      access: PATH_ACCESS_TYPES.auth,
      new: {
        relative: "new",
        absolute: "/transactions/new",
        access: PATH_ACCESS_TYPES.auth,
      },
    },
    signIn: {
      relative: "sign-in",
      absolute: "/sign-in",
      access: PATH_ACCESS_TYPES.guest,
    },
    signUp: {
      relative: "sign-up",
      absolute: "/sign-up",
      access: PATH_ACCESS_TYPES.guest,
    },
  },
};

const FLAT_PATH_NODES = flattenPaths(PATHS.root);
export const PATHS_GUEST = FLAT_PATH_NODES.filter(
  (p) => p.access === PATH_ACCESS_TYPES.guest
).map((p) => p.absolute);
export const PATHS_AUTH = FLAT_PATH_NODES.filter(
  (p) => p.access === PATH_ACCESS_TYPES.auth
).map((p) => p.absolute);
export const PATH_GUEST_FALLBACK = PATHS_GUEST[0] || "/sign-in";
export const PATH_AUTH_FALLBACK = PATHS_AUTH[0] || "/";

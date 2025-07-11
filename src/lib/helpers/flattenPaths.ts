type PathNode = {
  absolute: string;
  access: string;
};

const isPathNode = (val: unknown): val is PathNode =>
  typeof val === "object" &&
  val !== null &&
  "absolute" in val &&
  "access" in val &&
  typeof (val as Record<string, unknown>).absolute === "string" &&
  typeof (val as Record<string, unknown>).access === "string";

export const flattenPaths = (node: Record<string, unknown>): PathNode[] => {
  const list: PathNode[] = [];
  const dfs = (obj: Record<string, unknown>): void => {
    if (isPathNode(obj)) list.push(obj);
    Object.values(obj).forEach((v) => {
      if (typeof v === "object" && v !== null)
        dfs(v as Record<string, unknown>);
    });
  };
  dfs(node);
  return list;
};

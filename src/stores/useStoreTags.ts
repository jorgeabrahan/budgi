import { REQUEST_STATUS } from "@/lib/consts/request";
import type { Tables } from "@/types/database.types";
import type { RequestStatus } from "@/types/request.types";
import { create } from "zustand";

type Store = {
  tags: Tables<"tags">[];
  status: RequestStatus;
  setTags: (tags: Tables<"tags">[]) => void;
  addTag: (tag: Tables<"tags">) => void;
  updateTag: (tag: Partial<Tables<"tags">>) => void;
  removeTag: (tagId: string) => void;
  setStatus: (status: RequestStatus) => void;
};

const useStoreTags = create<Store>()((set) => ({
  tags: [],
  status: REQUEST_STATUS.idle,
  setTags: (tags) => set({ tags }),
  addTag: (tag) =>
    set((state) => ({
      tags: [tag, ...state.tags],
    })),
  updateTag: (tag) =>
    set((state) => ({
      tags: state.tags.map((t) => (t.id === tag.id ? { ...t, ...tag } : t)),
    })),
  removeTag: (tagId: string) =>
    set((state) => ({
      tags: state.tags.filter((tag) => tag.id !== tagId),
    })),
  setStatus: (status: RequestStatus) => set({ status }),
}));

export default useStoreTags;

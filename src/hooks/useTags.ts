import { useEffect } from "react";
import useStoreTags from "../stores/useStoreTags";
import { REQUEST_STATUS } from "@/lib/consts/request";
import ServiceTag from "@/services/ServiceTag";
import type { Tables } from "@/types/database.types";

const useTags = () => {
  const tags = useStoreTags((store) => store.tags);
  const storeSetTags = useStoreTags((store) => store.setTags);
  const storeAddTag = useStoreTags((store) => store.addTag);
  const storeRemoveTag = useStoreTags((store) => store.removeTag);
  const storeUpdateTag = useStoreTags((store) => store.updateTag);
  const status = useStoreTags((store) => store.status);
  const storeSetStatus = useStoreTags((store) => store.setStatus);

  useEffect(() => {
    if (status !== REQUEST_STATUS.idle) return;
    storeSetStatus(REQUEST_STATUS.loading);
    (async () => {
      const { ok, data } = await ServiceTag.getAll();
      if (ok && data) {
        storeSetTags(data);
      }
      storeSetStatus(REQUEST_STATUS.finished);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createTag = async (tag: Omit<Tables<"tags">, "id" | "created_at">) => {
    storeSetStatus(REQUEST_STATUS.loading);
    const { ok, data } = await ServiceTag.create(tag);
    if (ok && data) storeAddTag(data);
    storeSetStatus(REQUEST_STATUS.finished);
    return ok;
  };
  const deleteTag = async (id: string) => {
    storeSetStatus(REQUEST_STATUS.loading);
    const { ok } = await ServiceTag.delete(id);
    if (ok) storeRemoveTag(id);
    storeSetStatus(REQUEST_STATUS.finished);
    return ok;
  };
  const updateTag = async (
    id: string,
    tag: Omit<Tables<"tags">, "id" | "created_at">
  ) => {
    storeSetStatus(REQUEST_STATUS.loading);
    const { ok, data } = await ServiceTag.update(id, tag);
    if (ok && data) storeUpdateTag(data);
    storeSetStatus(REQUEST_STATUS.finished);
    return ok;
  };

  return { tags, status, createTag, deleteTag, updateTag };
};

export default useTags;

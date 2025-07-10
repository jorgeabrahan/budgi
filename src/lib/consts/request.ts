import type { RequestStatus } from "@/types/request.types";

export const REQUEST_STATUS: Record<RequestStatus, RequestStatus> = {
  idle: "idle",
  loading: "loading",
  finished: "finished",
};

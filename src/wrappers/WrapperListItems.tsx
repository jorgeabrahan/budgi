import { REQUEST_STATUS } from "@/lib/consts/request";
import type { RequestStatus } from "@/types/request.types";
import { CircularProgress, Grid, Typography } from "@mui/material";

export const WrapperListItems = ({
  itemsAmount,
  status,
  children,
  emptyItemsMessage = "",
  loadingItemsMessage = "",
}: {
  itemsAmount: number;
  status: RequestStatus;
  children: React.ReactNode;
  emptyItemsMessage?: string;
  loadingItemsMessage?: string;
}) => {
  return (
    <Grid container spacing={2}>
      {itemsAmount === 0 && status === REQUEST_STATUS.finished && (
        <Grid size={12}>
          <Typography
            variant="body1"
            align="center"
            sx={{ mt: 4, color: "text.secondary" }}
          >
            {emptyItemsMessage}
          </Typography>
        </Grid>
      )}
      {status === REQUEST_STATUS.loading && (
        <Grid
          size={12}
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{ mt: 4 }}
        >
          <CircularProgress />
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            {loadingItemsMessage}
          </Typography>
        </Grid>
      )}
      {children}
    </Grid>
  );
};

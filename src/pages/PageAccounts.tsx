import { SymbolIcon } from "@/components/global/SymbolIcon";
import useAccounts from "@/hooks/useAccounts";
import { PATHS } from "@/lib/consts/paths";
import UtilFormat from "@/utils/UtilFormat";
import { WrapperListItems } from "@/wrappers/WrapperListItems";
import { Add } from "@mui/icons-material";
import { Box, Fab, Grid, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export const PageAccounts = () => {
  const { accounts, status } = useAccounts();
  return (
    <Box sx={{ position: "relative", minHeight: "100vh", p: 2, mt: 10 }}>
      <WrapperListItems
        itemsAmount={accounts.length}
        status={status}
        emptyItemsMessage="Aún no has creado ninguna cuenta."
        loadingItemsMessage="Cargando cuentas…"
      >
        {accounts.map((account) => (
          <Grid size={{ xs: 12, sm: 6 }} key={account.id}>
            <Box
              component={RouterLink}
              to={PATHS.root.accounts.edit.generate({ id: account.id })}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                textDecoration: "none",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                p: 2,
                color: "inherit",
                "&:hover": { borderColor: "primary.main" },
              }}
            >
              <Box
                sx={{
                  bgcolor: account.color,
                  borderRadius: "50%",
                  width: 48,
                  height: 48,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <SymbolIcon
                  name={account.icon}
                  fontSize="medium"
                  sx={{ color: "#fff" }}
                />
              </Box>

              <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                <Typography
                  fontWeight={500}
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {account.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {UtilFormat.currency(account.balance, {
                    locale: account.currency_locale,
                    code: account.currency_code,
                    decimals: account.currency_decimals,
                  })}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </WrapperListItems>
      <Fab
        color="primary"
        size="medium"
        aria-label="Nueva transacción"
        component={RouterLink}
        to={PATHS.root.accounts.new.absolute}
        sx={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 1100,
        }}
      >
        <Add />
      </Fab>
    </Box>
  );
};

import React from "react";
import { Typography, Box, Card, CardContent, Grid } from "@mui/material";
import { useStore } from "../lib/store";

export default function Home() {
  const groups = useStore((s) => s.menuGroups);
  const menus = useStore((s) => s.menus);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome to the CMS
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        This website was created for technical testing purposes at{" "}
        <b>PT Klik Digital Sinergi</b>
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Menu Groups</Typography>
              <Typography variant="h4">{groups.length}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Menus</Typography>
              <Typography variant="h4">{menus.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
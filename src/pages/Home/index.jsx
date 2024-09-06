import { Grid, Typography } from "@mui/material";

export default function Home() {
    return (
        <Grid container>
            <Grid
            sx={{
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                display: "flex"
            }} 
            item xs={12}>
                <Typography variant="h2">SISCOMP</Typography>
                <Typography variant="h3">Sistema de Requisição de Compras</Typography>
            </Grid>
        </Grid>
    )
}
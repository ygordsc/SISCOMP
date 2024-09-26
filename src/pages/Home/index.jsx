import { Grid } from "../../components";

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
                <h1 className="text-8xl font-bold mb-10">SISCOMP</h1>
                <h2 className="text-4xl font-bold mb-10">Sistema de Requisição de Compras</h2>
            </Grid>
        </Grid>
    )
}
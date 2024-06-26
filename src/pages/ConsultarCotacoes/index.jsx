import { Button, Grid, TextField } from "../../components"
import DataTable from "react-data-table-component"

export default function ConsultarCotacoes({ cotacoes = [] }) {

    const colunas = [
        {
            name: "Fornecedor",
            selector: row => row.fornecedor
        },
        {
            name: "Produto",
            selector: row => row.produto
        },
        {
            name: "Preço",
            selector: row => row.preco
        },
        {
            name: "Data do Registro",
            selector: row => row.data
        }
    ]

    return (
        <Grid sx={{ height: "70vh" }} container>
            <Grid sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }} item xs={4}>
                <DataTable
                    columns={colunas}
                    data={cotacoes}
                />
            </Grid>
        </Grid>
    )
}
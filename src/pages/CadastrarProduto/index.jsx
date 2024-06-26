import { Button, Grid, TextField } from "../../components"
import { useForm } from "react-hook-form"
import { inserirProduto, listaProdutos } from "../../infra/produtos";
import DataTable from "react-data-table-component"

export default function CadastrarProduto({ produtos = [] }) {
    const { register, handleSubmit, reset } = useForm()

    async function submit(dados) {
        await inserirProduto(dados);
        reset()
    }

    const colunas = [
        {
            name: "Produto",
            selector: row => row.produto
        },
        {
            name: "Categoria",
            selector: row => row.categoria
        }
    ]

    return (
        <Grid sx={{ height: "70vh", justifyContent: "space-evenly" }} container>
            <Grid sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }} item xs={4}>
                <form onSubmit={handleSubmit(submit)} className="flex flex-col justify-center gap-6 items-center">
                    <h1 className="text-4xl font-bold mb-10">Cadastro de Produto</h1>
                    <div>
                        <label htmlFor="produto">Produto</label><br />
                        <input type="text" name="produto" size={60} {...register("produto")} 
                        className="border-slate-400 border" required/>
                    </div>
                    <div>
                        <label htmlFor="categoria">Categoria</label><br />
                        <input type="text" name="categoria" size={60} {...register("categoria")} 
                        className="border-slate-400 border" required/>
                    </div>
                    <Button variant="contained" type="submit">Enviar</Button>
                </form>
            </Grid>
            <Grid sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }} item xs={4}>
                <DataTable
                    columns={colunas}
                    data={produtos}
                />
            </Grid>
        </Grid>
    )
}
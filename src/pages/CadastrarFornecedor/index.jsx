import { Button, Grid, TextField } from "../../components"
import { useForm } from "react-hook-form"
import { inserirFornecedor, listaFornecedores } from "../../infra/fornecedores";
import DataTable from "react-data-table-component"

export default function CadastrarFornecedor({ fornecedores = [] }) {
    const { register, handleSubmit, reset } = useForm()

    async function submit(dados) {
        await inserirFornecedor(dados);
        alert("Fornecedor cadastrado com sucesso");
        reset()
    }

    const colunas = [
        {
            name: "Fornecedor",
            selector: row => row.fornecedor
        },
        {
            name: "E-mail",
            selector: row => row.email
        },
        {
            name: "Telefone",
            selector: row => row.telefone
        },
    ]

    return (
        <Grid sx={{ height: "70vh", justifyContent: "space-evenly" }} container>
            <Grid sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }} item xs={4}>
                <form onSubmit={handleSubmit(submit)} className="flex flex-col justify-center gap-6 items-center">
                    <h1 className="text-4xl font-bold mb-10">Cadastro de Fornecedor</h1>
                    <div>
                        <label htmlFor="fornecedor">Fornecedor</label><br />
                        <input type="text" name="fornecedor" size={60} {...register("fornecedor")} 
                        className="border-slate-400 border" required/>
                    </div>
                    <div>
                        <label htmlFor="email">E-mail</label><br />
                        <input type="email" name="email" size={60} {...register("email")} 
                        className="border-slate-400 border" required/>
                    </div>
                    <div>
                        <label htmlFor="telefone">Telefone</label><br />
                        <input type="text" name="telefone" size={60} {...register("telefone")} 
                        className="border-slate-400 border" required/>
                    </div>
                    <Button variant="contained" type="submit">Enviar</Button>
                </form>
            </Grid>
            <Grid sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }} item xs={4}>
                <DataTable
                    columns={colunas}
                    data={fornecedores}
                />
            </Grid>
        </Grid>
    )
}
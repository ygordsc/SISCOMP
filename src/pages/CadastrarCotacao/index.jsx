import { Button, Grid, TextField } from "../../components"
import { useForm } from "react-hook-form"
import { inserirCotacao } from "../../infra/cotacao";

export default function CadastrarCotacao({ produtos = [], fornecedores = [] }) {
    const { register, handleSubmit, reset } = useForm()

    async function submit(dados) {
        console.log(dados)
        await inserirCotacao(dados);
        reset()
    }

    return (
        <Grid sx={{ height: "70vh", justifyContent: "space-evenly" }} container>
            <Grid sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }} item xs={4}>
                <form onSubmit={handleSubmit(submit)} className="flex flex-col justify-center gap-6 items-center">
                    <h1 className="text-4xl font-bold mb-10">Cadastro de Cotações</h1>
                    <div>
                        <label htmlFor="fornecedor">Fornecedor</label><br />
                        <select name="fornecedor" className="border-slate-400 border w-96" {...register("fornecedor")} required>
                            <option>Selecione...</option>
                            {fornecedores.map((element) => (
                                <option key={element.id}>{element.fornecedor}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                    <label htmlFor="produto">Produto</label><br />
                        <select name="produto" className="border-slate-400 border w-96" {...register("produto")} required>
                            <option>Selecione...</option>   
                            {produtos.map((element) => (
                                <option key={element.id}>{element.produto}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="preco">Preço</label><br />
                        <input type="text" name="preco" {...register("preco")} 
                        className="border-slate-400 border w-96" required/>
                    </div>
                    <div>
                        <label htmlFor="data">Data do Registro</label><br />
                        <input type="date" name="data" size={60} {...register("data")} 
                        className="border-slate-400 border w-96" required/>
                    </div>
                    <Button variant="contained" type="submit">Enviar</Button>
                </form>
            </Grid> 
        </Grid>
    )
}
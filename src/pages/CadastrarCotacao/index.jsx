import { Button, Grid, TextField } from "../../components"
import { useForm } from "react-hook-form"
import { FormControl, getAppBarUtilityClass } from "@mui/material"

export default function CadastrarCotacao() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    function submit() {
        reset()
    }

    return (
        //<h1>Cadastro de Cotações</h1>
        <Grid sx={{ height: "70vh", justifyContent: "center" }} container>
            <Grid sx={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "5em" }} item xs={4}>
                    <form onSubmit={handleSubmit(submit)}>
                        <h1 className="text-4xl font-bold mb-10">Cadastro de Fornecedor</h1>
                        <div>
                        <label htmlFor="fornecedor">Fornecedor</label><br/>
                        <input type="text" name="fornecedor" {...register("Fornecedor", { required: "Nome do Fornecedor é obrigatório" })} />  
                        </div>    
                        <div>                 
                        <label htmlFor="email">E-mail</label><br/>
                        <input type="email" name="email" {...register("Email", { required: "E-mail é obrigatório" })} />      
                        </div>  
                        <div>               
                        <label htmlFor="telefone">Telefone</label><br/>
                        <input type="text" name="telefone" size={60} {...register("Telefone", { required: "Telefone é obrigatório" })} />
                        </div>
                        <Button variant="contained" type="submit">Enviar</Button>
                    </form>
            </Grid>
        </Grid>
    )
}
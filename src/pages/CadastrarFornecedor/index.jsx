import { Button, Grid, TextField } from "../../components"
import { useForm } from "react-hook-form"

export default function CadastrarFornecedor() {
    
    const { register, handleSubmit, formState: { errors}, reset } = useForm()

    function submit() {
        reset()
    }
    
    return (
        <Grid sx={{ height: "70vh", justifyContent: "center" }} container>
            <Grid sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }} item xs={4}>
                <form onSubmit={handleSubmit(submit)}>
                    <Grid sx={{ display: "flex", flexDirection: "column" }} container rowSpacing={2}>

                        <Grid sx={{ textAlign: "center" }} item>
                            <h1 className="text-4xl font-bold mb-10">Cadastro de Fornecedor</h1>
                        </Grid>
                        <Grid item>
                            <TextField label="Fornecedor" variant="outlined" fullWidth {...register("Fornecedor", {required: "Nome do Fornecedor é obrigatório"})} />
                        </Grid>
                        <Grid item>
                            <TextField label="E-mail" variant="outlined" type="email" fullWidth {...register("Fornecedor", {required: "E-mail é obrigatório"})} />
                        </Grid>
                        <Grid item>
                            <TextField label="Telefone" variant="outlined" fullWidth {...register("Fornecedor", {required: "Telefone é obrigatório"})} />
                        </Grid>
                        <Grid sx={{ display: "flex", justifyContent: "center" }} item>
                            <Button variant="contained" type="submit">Enviar</Button>
                        </Grid>

                    </Grid>
                </form>
            </Grid>
        </Grid>
    )
}
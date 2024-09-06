import { Button, Grid, TextField } from "../../components"
import { useForm } from "react-hook-form"
import { deletaFornecedor, inserirFornecedor } from "../../infra/fornecedores";
import DataTable from "react-data-table-component"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Fornecedores({ fornecedores = [] }) {
    const { register, handleSubmit, reset } = useForm()
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState({})

    async function submit(dados) {
        await inserirFornecedor(dados);
        window.location.reload();
        reset()
    }

    async function handleDelete() {
        await deletaFornecedor(fornecedorSelecionado.id);
        window.location.reload();
    }

    async function handleEdit() {
        await deletaFornecedor(fornecedorSelecionado.id);
        await inserirFornecedor(fornecedorSelecionado);
        window.location.reload();
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
        {
            name: "Endereço",
            selector: row => row.endereco
        },
        {
            name: "Ações",
            selector: row =>
                <>
                    <EditOutlinedIcon sx={{ cursor: "pointer" }} onClick={() => {
                        setFornecedorSelecionado(row)
                        document.querySelector("#hiddenEdit").style.display = "flex";
                    }} />
                    <DeleteOutlineIcon sx={{ cursor: "pointer" }} onClick={() => {
                        setFornecedorSelecionado(row)
                        document.querySelector("#hiddenDelete").style.display = "flex";
                    }} />
                </>
        }
    ]

    window.onclick = function (event) {
        if (event.target == hiddenDelete) {
            hiddenDelete.style.display = "none";
        } else if (event.target == hiddenEdit) {
            hiddenEdit.style.display = "none";
        }
    }


    return (
        <Grid sx={{ height: "100vh", justifyContent: "space-evenly", zIndex: 0 }} container>
            <Grid sx={{ display: "flex", flexDirection: "column", justifyContent: "center", zIndex: 0 }} item xs={4}>
                <form onSubmit={handleSubmit(submit)} className="flex flex-col justify-center gap-6 items-center">
                    <h1 className="text-4xl font-bold mb-10">Cadastro de Fornecedor</h1>
                    <div>
                        <label htmlFor="fornecedor">Fornecedor</label><br />
                        <input type="text" name="fornecedor" size={60} {...register("fornecedor")}
                            className="border-slate-400 border" required />
                    </div>
                    <div>
                        <label htmlFor="endereco">Endereço</label><br />
                        <input type="text" name="endereco" size={60} {...register("endereco")}
                            className="border-slate-400 border" required />
                    </div>
                    <div>
                        <label htmlFor="email">E-mail</label><br />
                        <input type="email" name="email" size={60} {...register("email")}
                            className="border-slate-400 border" required />
                    </div>
                    <div>
                        <label htmlFor="telefone">Telefone</label><br />
                        <input type="text" name="telefone" size={60} {...register("telefone")}
                            className="border-slate-400 border" required />
                    </div>
                    <Button variant="contained" type="submit">Enviar</Button>
                </form>
            </Grid>
            <Grid sx={{ display: "flex", flexDirection: "column", justifyContent: "center", zIndex: 0 }} item xs={4}>
                <DataTable
                    columns={colunas}
                    data={fornecedores}
                />
            </Grid>
            <Grid sx={{
                display: "none",
                flexDirection: "column",
                justifyContent: "center",
                zIndex: 1,
                position: "fixed",
                background: "rgb(0, 0, 0, 0.5)",
                width: "100%",
                height: "100%",
            }} item xs={12} id="hiddenDelete">
                <Grid container>
                    <Grid
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            margin: "auto",
                            zIndex: 1,
                            background: "white",
                            width: "100%",
                            height: "100%",
                            padding: "80px",
                            gap: "20px",
                            borderRadius: "10px"
                        }}
                        item xs={4}>
                        <CloseIcon sx={{
                            cursor: "pointer"
                        }} onClick={() => document.querySelector("#hiddenDelete").style.display = "none"} />
                        <Typography variant="h4">Deseja excluir o fornecedor?</Typography>
                        <Typography variant="h6">ID: {fornecedorSelecionado.id}</Typography>
                        <Typography variant="h6">Nome: {fornecedorSelecionado.fornecedor}</Typography>
                        <Button
                            color="error"
                            variant="contained"
                            onClick={handleDelete} >
                            Excluir
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid sx={{
                display: "none",
                flexDirection: "column",
                justifyContent: "center",
                zIndex: 1,
                position: "fixed",
                background: "rgb(0, 0, 0, 0.5)",
                width: "100%",
                height: "100%",
            }} item xs={12} id="hiddenEdit">
                <Grid container>
                    <Grid
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            margin: "auto",
                            zIndex: 1,
                            background: "white",
                            width: "100%",
                            height: "100%",
                            padding: "80px",
                            gap: "20px",
                            borderRadius: "10px"
                        }}
                        item xs={4}>
                        <CloseIcon sx={{
                            cursor: "pointer"
                        }} onClick={() => document.querySelector("#hiddenEdit").style.display = "none"} />
                        <Typography variant="h4">Editar fornecedor</Typography>
                        <TextField label="ID" value={fornecedorSelecionado.id} disabled />
                        <TextField
                            label="Nome"
                            value={fornecedorSelecionado.fornecedor}
                            onChange={(e) => setFornecedorSelecionado({ ...fornecedorSelecionado, fornecedor: e.target.value })}
                        />
                        <TextField
                            label="Endereço"
                            value={fornecedorSelecionado.endereco}
                            onChange={(e) => setFornecedorSelecionado({ ...fornecedorSelecionado, endereco: e.target.value })}
                        />
                        <TextField
                            label="E-mail"
                            value={fornecedorSelecionado.email}
                            onChange={(e) => setFornecedorSelecionado({ ...fornecedorSelecionado, email: e.target.value })}
                        />
                        <TextField
                            label="Telefone"
                            value={fornecedorSelecionado.telefone}
                            onChange={(e) => setFornecedorSelecionado({ ...fornecedorSelecionado, telefone: e.target.value })}
                        />
                        <Button
                            variant="contained"
                            onClick={handleEdit} >
                            Aplicar
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
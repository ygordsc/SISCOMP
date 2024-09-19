import { Button, Grid, TextField } from "../../components"
import { useForm } from "react-hook-form"
import { deletaProduto, editaProduto, inserirProduto, listaProdutos } from "../../infra/produtos";
import DataTable from "react-data-table-component"
import { useState } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from "@mui/material";

export default function Produtos({ produtos, setUpdate }) {
    const { register, handleSubmit, reset } = useForm()
    const [produtoSelecionado, setProdutoSelecionado] = useState({})

    async function submit(dados) {
        await inserirProduto(dados);
        setUpdate(dados);
        reset()
    }

    async function handleDelete() {
        await deletaProduto(produtoSelecionado.id);
        document.querySelector("#hiddenDelete").style.display = "none";
        setUpdate(produtoSelecionado);
    }

    async function handleEdit() {
        await editaProduto(produtoSelecionado.id, produtoSelecionado);
        document.querySelector("#hiddenEdit").style.display = "none";
        setUpdate(produtoSelecionado);
    }

    const colunas = [
        {
            name: "Produto",
            selector: row => row.produto
        },
        {
            name: "Categoria",
            selector: row => row.categoria
        },
        {
            name: "Ações",
            selector: row =>
                <>
                    <EditOutlinedIcon sx={{ cursor: "pointer" }} onClick={() => {
                        setProdutoSelecionado(row)
                        document.querySelector("#hiddenEdit").style.display = "flex";
                    }} />
                    <DeleteOutlineIcon sx={{ cursor: "pointer" }} onClick={() => {
                        setProdutoSelecionado(row)
                        document.querySelector("#hiddenDelete").style.display = "flex";
                    }} />
                </>
        }
    ]

    // window.onclick = function (event) {
    //     const hiddenDelete = document.querySelector("#hiddenDelete");
    //     const hiddenEdit = document.querySelector("#hiddenEdit");
    //     if (event.target == hiddenDelete) {
    //         hiddenDelete.style.display = "none";
    //     } else if (event.target == hiddenEdit) {
    //         hiddenEdit.style.display = "none";
    //     }
    // }

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
                        <Typography variant="h4">Deseja excluir o produto?</Typography>
                        <Typography variant="h6">ID: {produtoSelecionado.id}</Typography>
                        <Typography variant="h6">Nome: {produtoSelecionado.produto}</Typography>
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
                        <Typography variant="h4">Editar produto</Typography>
                        <TextField label="ID" value={produtoSelecionado.id} disabled />
                        <TextField
                            label="Nome"
                            value={produtoSelecionado.produto}
                            onChange={(e) => setProdutoSelecionado({ ...produtoSelecionado, produto: e.target.value })}
                        />
                        <TextField
                            label="Endereço"
                            value={produtoSelecionado.categoria}
                            onChange={(e) => setProdutoSelecionado({ ...produtoSelecionado, categoria: e.target.value })}
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
import { Button, Grid, TextField } from "../../components"
import { useForm } from "react-hook-form"
import { deletaContato, editaContato, inserirContato } from "../../infra/contatos";
import DataTable from "react-data-table-component"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Contatos({ contatos, fornecedores, setUpdate }) {
    const { register, handleSubmit, reset } = useForm()
    const [contatoSelecionado, setContatoSelecionado] = useState({})

    async function submit(dados) {
        await inserirContato(dados);
        setUpdate(dados);
        reset()
    }

    async function handleDelete() {
        await deletaContato(contatoSelecionado.id);
        document.querySelector("#hiddenDelete").style.display = "none";
        setUpdate(contatoSelecionado);
    }

    async function handleEdit() {
        await editaContato(contatoSelecionado.id, contatoSelecionado);
        document.querySelector("#hiddenEdit").style.display = "none";
        setUpdate(contatoSelecionado);
    }

    const colunas = [
        {
            name: "Nome",
            selector: row => row.nome
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
            name: "Fornecedor",
            selector: row => row.fornecedor
        },
        {
            name: "Ações",
            selector: row =>
                <>
                    <EditOutlinedIcon sx={{ cursor: "pointer" }} onClick={() => {
                        setContatoSelecionado(row)
                        document.querySelector("#hiddenEdit").style.display = "flex";
                    }} />
                    <DeleteOutlineIcon sx={{ cursor: "pointer" }} onClick={() => {
                        setContatoSelecionado(row)
                        document.querySelector("#hiddenDelete").style.display = "flex";
                    }} />
                </>
        }
    ]

    return (
        <Grid sx={{ height: "100vh", justifyContent: "space-evenly", zIndex: 0 }} container>
            <Grid sx={{ display: "flex", flexDirection: "column", justifyContent: "center", zIndex: 0 }} item xs={4}>
                <form onSubmit={handleSubmit(submit)} className="flex flex-col justify-center gap-6 items-center">
                    <h1 className="text-4xl font-bold mb-10">Cadastro de Contatos</h1>
                    <div>
                        <label htmlFor="nome">Nome</label><br />
                        <input type="text" name="nome" id="nome" {...register("nome")}
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-80 p-2.5" required />
                    </div>
                    <div>
                        <label htmlFor="email">E-mail</label><br />
                        <input type="email" name="email" id="email" {...register("email")}
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-80 p-2.5" required />
                    </div>
                    <div>
                        <label htmlFor="telefone">Telefone</label><br />
                        <input type="text" name="telefone" id="telefone" {...register("telefone")}
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-80 p-2.5" required />
                    </div>
                    <div>
                        <label htmlFor="fornecedor">Fornecedor</label><br />
                        <select name="fornecedor" id="fornecedor"  {...register("fornecedor")}
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-80 p-2.5" required>
                            <option value="">Selecione...</option>
                            {fornecedores.map((element) => (
                                <option key={element.id}>{element.fornecedor}</option>
                            ))}
                        </select>
                    </div>
                    <Button variant="contained" type="submit">Enviar</Button>
                </form>
            </Grid>
            <Grid sx={{ display: "flex", flexDirection: "column", justifyContent: "center", zIndex: 0 }} item xs={4}>
                <DataTable
                    columns={colunas}
                    data={contatos}
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
                        <Typography variant="h6">ID: {contatoSelecionado.id}</Typography>
                        <Typography variant="h6">Nome: {contatoSelecionado.nome}</Typography>
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
                        <TextField label="ID" value={contatoSelecionado.id} disabled />
                        <TextField
                            label="Nome"
                            value={contatoSelecionado.nome}
                            onChange={(e) => setContatoSelecionado({ ...contatoSelecionado, nome: e.target.value })}
                        />
                        <TextField
                            label="E-mail"
                            value={contatoSelecionado.email}
                            onChange={(e) => setContatoSelecionado({ ...contatoSelecionado, email: e.target.value })}
                        />
                        <TextField
                            label="Telefone"
                            value={contatoSelecionado.telefone}
                            onChange={(e) => setContatoSelecionado({ ...contatoSelecionado, telefone: e.target.value })}
                        />
                        <div>
                            <label htmlFor="fornecedor">Fornecedor Relacionado</label><br />
                            <select
                                name="fornecedor"
                                className="border-slate-400 border w-96"
                                onChange={(e) => setContatoSelecionado({ ...contatoSelecionado, fornecedor: e.target.value })}
                                required
                            >
                                <option>{contatoSelecionado.fornecedor}</option>
                                {fornecedores
                                    .filter(element => element.fornecedor !== contatoSelecionado.fornecedor)
                                    .map((element) => (
                                        <option key={element.id}>
                                            {element.fornecedor}
                                        </option>
                                    ))}
                            </select>
                        </div>
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
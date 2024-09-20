import { Button, Grid, TextField } from "../../components"
import { useForm } from "react-hook-form"
import { inserirCotacao } from "../../infra/cotacao";
import { deletaRequisicao, inserirRequisicao } from "../../infra/requisicoes";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

export default function Cotacoes({ produtos, fornecedores, logado, admin, cotacoes, requisicoes, setUpdate }) {
    const { register, handleSubmit, reset } = useForm()

    const [statusCotacao, setStatusCotacao] = useState(0);
    const [requisicaoSelecionada, setRequisicaoSelecionada] = useState({});

    async function submitCotacao(dados) {
        console.log(dados)
        await inserirCotacao(dados);
        reset()
    }

    const auth = getAuth();
    async function submitRequisicao(dados) {
        dados.data = new Date()
            .toISOString()
            .slice(0, 10)
            .split("-")
            .reverse()
            .join("/");

        dados.user = auth.currentUser.email;
        dados.status = "Aberta";
        await inserirRequisicao(dados);
        setUpdate(dados);
        reset()
    }

    // useEffect(() => {
    //     if (statusCotacao === 1) {
    //         alert("Cotação enviada com sucesso!")
    //         setStatusCotacao(0)
    //     }} ,[statusCotacao])

    return (
        <Grid sx={{ height: "70vh", justifyContent: "space-evenly" }} container>
            <Grid sx={{ display: "flex", flexDirection: "column", justifyContent: "center", zIndex: "0" }} item xs={12}>
                <h1 className="text-4xl font-bold mb-32 mt-32 text-center">Requisições de Compra</h1>
                <Grid sx={{ display: "flex", justifyContent: "center" }} container>
                    {
                        logado &&
                        <Grid item xs={6}>
                            <form onSubmit={handleSubmit(submitRequisicao)} className="flex flex-col justify-center gap-6 items-center">
                                <div>
                                    <label htmlFor="produto">Produto</label><br />
                                    <input type="text" name="preco" {...register("produto")}
                                        className="border-slate-400 border w-96" required />
                                </div>
                                <div>
                                    <label htmlFor="descricao">Descrição</label><br />
                                    <textarea name="descricao" {...register("descricao")}
                                        className="border-slate-400 border w-96" required />
                                </div>
                                <Button variant="contained" type="submit">Enviar</Button>
                            </form>
                        </Grid>
                    }
                    <Grid item xs={6}>
                        <Grid sx={{ display: "flex", gap: "30px", justifyContent: "center" }} container>
                            {requisicoes
                                .filter((element) => {
                                    if (logado) {
                                        return element.user === auth.currentUser.email
                                    } else {
                                        return element
                                    }
                                })
                                .map((item) => (
                                    <Grid sx={{
                                        backgroundColor: "#eee",
                                        justifyContent: "center",
                                        boxShadow: "5px 5px 30px 0px rgba(138,138,138,1);",
                                        padding: "20px",
                                    }} key={item.id} item xs={10}>
                                        <h3>{item.data}</h3>
                                        <h3>{item.user}</h3>
                                        <br />
                                        <h3>Produto: {item.produto}</h3>
                                        <h3>Descrição: {item.descricao}</h3>
                                        <br />
                                        <h3>Status: {item.status}</h3>
                                        <br />
                                        {logado
                                            ? <Button variant="contained" color="error" onClick={() => {
                                                deletaRequisicao(item.id);
                                                setUpdate(item);
                                            }}>Excluir</Button>
                                            : <Button variant="contained" onClick={() =>
                                                document.querySelector("#adminForm").style.display = "flex"
                                            }>Adicionar cotação</Button>
                                        }
                                    </Grid>
                                ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {
                admin &&
                <Grid sx={{
                    display: "none",
                    flexDirection: "column",
                    justifyContent: "center",
                    zIndex: 1,
                    position: "fixed",
                    background: "rgb(0, 0, 0, 0.5)",
                    width: "100%",
                    height: "100%",
                }} item xs={12} id="adminForm">
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
                            }} onClick={() => document.querySelector("#adminForm").style.display = "none"} />
                            <form onSubmit={handleSubmit(submitCotacao)} className="flex flex-col justify-center gap-6 items-center">
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
                                        className="border-slate-400 border w-96" required />
                                </div>
                                <div>
                                    <label htmlFor="data">Data do Registro</label><br />
                                    <input type="date" name="data" size={60} {...register("data")}
                                        className="border-slate-400 border w-96" required />
                                </div>
                                <Button variant="contained" type="submit">Enviar</Button>
                            </form>
                        </Grid>
                    </Grid>
                </Grid>
            }
        </Grid>
    )
}
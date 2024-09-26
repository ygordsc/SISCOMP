import { Button, Grid, TextField } from "../../components"
import { useForm } from "react-hook-form"
import { deletaCotacao, inserirCotacao } from "../../infra/cotacoes";
import { deletaRequisicao, editaRequisicao, inserirRequisicao } from "../../infra/requisicoes";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useMemo } from "react";

export default function Cotacoes({ produtos, fornecedores, logado, admin, requisicoes, cotacoes, setUpdate }) {
    const { register, handleSubmit, reset } = useForm()

    const [requisicaoSelecionada, setRequisicaoSelecionada] = useState({ cotacoes: [] });

    let cotacoesFiltradas = cotacoes.filter(cotacao => cotacao.idRequisicao === requisicaoSelecionada.id)

    async function submitCotacao(dados) {
        dados.data = new Date()
            .toISOString()
            .slice(0, 10)
            .split("-")
            .reverse()
            .join("/");
        dados.idRequisicao = requisicaoSelecionada.id;
        let contagemCotacoes = cotacoesFiltradas.length + 1
        console.log(contagemCotacoes)
        if (contagemCotacoes < 3) {
            setRequisicaoSelecionada({ ...requisicaoSelecionada, status: "Em cotação" })
            await editaRequisicao(requisicaoSelecionada.id, requisicaoSelecionada)
        } else if (contagemCotacoes === 3) {
            setRequisicaoSelecionada({ ...requisicaoSelecionada, status: "Cotada" })
            await editaRequisicao(requisicaoSelecionada.id, requisicaoSelecionada)
        }
        await inserirCotacao(dados);
        setUpdate(dados);
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

    async function handleDeleteCotacao(id) {
        deletaCotacao(id);
        if (cotacoesFiltradas.length === 3) {
            setRequisicaoSelecionada({ ...requisicaoSelecionada, status: "Em cotação" })
            await editaRequisicao(requisicaoSelecionada.id, requisicaoSelecionada)
        } else if (cotacoesFiltradas.length === 1) {
            setRequisicaoSelecionada({ ...requisicaoSelecionada, status: "Aberta" })
            await editaRequisicao(requisicaoSelecionada.id, requisicaoSelecionada)
        }
        setUpdate(id);
    }


    const requisicoesFiltradas = useMemo(() => {
        return requisicoes.filter((requisicao) => {
            if (logado) {
                return requisicao.user === auth.currentUser.email;
            } else {
                return requisicao;
            }
        });
    }, [requisicoes]);

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
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-80 p-2.5" required />
                                </div>
                                <div>
                                    <label htmlFor="descricao">Descrição</label><br />
                                    <textarea name="descricao" {...register("descricao")}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-80 p-2.5" required />
                                </div>
                                <Button variant="contained" type="submit">Enviar</Button>
                            </form>
                        </Grid>
                    }
                    <Grid item xs={6}>
                        <Grid sx={{ display: "flex", gap: "30px", justifyContent: "center" }} container>
                            {requisicoesFiltradas
                                .map((requisicao) => (
                                    <Grid sx={{
                                        backgroundColor: "#eee",
                                        justifyContent: "center",
                                        boxShadow: "5px 5px 30px 0px rgba(138,138,138,1);",
                                        padding: "20px",
                                    }} key={requisicao.id} item xs={10}>
                                        <h3>{requisicao.data}</h3>
                                        <h3>{requisicao.user}</h3>
                                        <br />
                                        <h3>Produto: {requisicao.produto}</h3>
                                        <h3>Descrição: {requisicao.descricao}</h3>
                                        <br />
                                        <h3>Status: {requisicao.status}</h3>
                                        <br />
                                        <Button variant="contained" onClick={() => {
                                            document.querySelector("#adminForm").style.display = "flex"
                                            setRequisicaoSelecionada(requisicao)
                                        }
                                        }>Cotações</Button>
                                        {logado
                                            ? <Button variant="contained" color="error" sx={{marginLeft:"15px"}} onClick={() => {
                                                {
                                                    cotacoes
                                                        .filter(cotacao => cotacao.idRequisicao === requisicao.id)
                                                        .map(cotacao => {
                                                            deletaCotacao(cotacao.id)
                                                        })
                                                }
                                                deletaRequisicao(requisicao.id);
                                                setUpdate(requisicao);
                                            }}>Excluir</Button>
                                            : null
                                        }
                                    </Grid>
                                ))}
                        </Grid>
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
            }} item xs={12} id="adminForm">
                <Grid sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    margin: "auto",
                    zIndex: 1,
                    background: "white",
                    width: "60%",
                    height: "50%",
                    padding: "120px",
                    gap: "20px",
                    borderRadius: "10px"
                }} container>
                    <Grid
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px",
                        }}
                        item xs={4}>
                        <CloseIcon sx={{
                            cursor: "pointer"
                        }} onClick={() => document.querySelector("#adminForm").style.display = "none"} />
                        {admin ?
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
                                {
                                    requisicaoSelecionada.status === "Cotada"
                                        ? null
                                        : <Button variant="contained" type="submit">Adicionar cotação</Button>
                                }
                            </form>
                            : null}
                    </Grid>
                    <Grid sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                    }} item xs={4}>
                        {cotacoesFiltradas
                            .map((cotacao) => (
                                <div key={cotacao.id}>
                                    <div className="border-gray-400 border my-2"></div>
                                    <div className="flex items-center justify-between">
                                        <div key={cotacao.id}>
                                            <h3>{cotacao.data}</h3>
                                            <h3>Fornecedor: {cotacao.fornecedor}</h3>
                                            <h3>Produto: {cotacao.produto}</h3>
                                            <h3>Preço: {cotacao.preco}</h3>
                                        </div>
                                        {admin ?
                                            <DeleteOutlineIcon sx={{ cursor: "pointer" }}
                                                onClick={() => handleDeleteCotacao(cotacao.id)} />
                                            : null}
                                    </div>
                                    <div className="border-gray-400 border my-2"></div>
                                </div>
                            ))}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
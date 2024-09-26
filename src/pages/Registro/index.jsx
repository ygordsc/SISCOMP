import { useForm } from "react-hook-form";
import { registrar } from "../../infra/auth";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

export default function Registro({ setLogado }) {

    const { register, handleSubmit } = useForm()
    const [mensagem, setMensagem] = useState("");

    async function submit(dados) {
        if (dados.password !== dados.confirmPassword) {
            console.log(dados.password, dados.confirmPassword)
            setMensagem("As senhas não coincidem");
        } else {
            await registrar(dados.email, dados.password, setLogado);
        }
    }

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                    SISCOMP
                </a>
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Criar conta
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(submit)}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">E-mail</label>
                                <input type="email" name="email"{...register("email")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Senha</label>
                                <input type="password" name="password" {...register("password")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" required />
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">Confirmar senha</label>
                                <input type="password" name="confirm-password" {...register("confirmPassword")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" required />
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Criar Conta</button>
                            <p className="text-sm font-light text-gray-500">
                                Já possui uma conta? <a href="/login" className="font-medium text-blue-600 hover:underline">Login</a>
                            </p>
                        </form>
                        {mensagem && <p className="text-red-500">{mensagem}</p>}
                    </div>
                </div>
            </div>
        </section>
    )
}
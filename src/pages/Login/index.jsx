import { useForm } from "react-hook-form";
import { login } from "../../infra/auth";

export default function Login({ setLogado, setAdmin }) {

    const { register, handleSubmit } = useForm()

    async function submit(dados) {
        if (dados.email.indexOf("admin") > 0) {
            await login(dados.email, dados.senha, setAdmin);
        } else {
            await login(dados.email, dados.senha, setLogado)
        }
    }

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <p className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                    SISCOMP
                </p>
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Entre em sua conta
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(submit)}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">E-mail</label>
                                <input type="text" name="email" id="email" {...register("email")} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Senha</label>
                                <input type="password" name="password" id="password" {...register("senha")} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" required />
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Entrar</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
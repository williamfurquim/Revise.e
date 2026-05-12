import { useState } from 'react';
import { login, register as registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerSchema, type LoginFormData, type RegisterFormData } from '../schemas/authSchema';
import { useForm } from "react-hook-form";
import logoRevisee from '../images/logo-revisee.png'

const Login = () => {

  const [loginOn, setLoginOn] = useState(true);

  const currentSchema =
    loginOn
      ? loginSchema
      : registerSchema;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<LoginFormData | RegisterFormData>({
    resolver: zodResolver(currentSchema)
  }); // ferramentas do react-hook-form

  const navigate = useNavigate();

  const [msg, setMsg] = useState('');



  function showMessage(message: string) {

    setMsg(message);

    setTimeout(() => {
      setMsg('');
    }, 2500);
  }

  async function handleLogin(data: LoginFormData) {

    try {

      const response = await login(
        data.email,
        data.password
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      navigate('/api/notas');

    } catch (err: any) {

      showMessage(
        err.response?.data?.message ||
        "Erro ao fazer login."
      );
    }
  }

  async function handleRegister(data: RegisterFormData) {

    try {

      await registerUser(
        data.name,
        data.email,
        data.password
      );

      showMessage(
        'Conta criada com sucesso.'
      );

      setTimeout(() => {
        navigate('/auth/login');
      }, 2500);

      setLoginOn(true);

    } catch (err: any) {

      showMessage(
        err.response?.data?.message ||
        `Erro ao registrar: ${err}`
      );
    }
  }

  return (
    <div className="auth-container">

      <form
        onSubmit={
          loginOn
            ? handleSubmit((data) =>
              handleLogin(data as LoginFormData)
            )
            : handleSubmit((data) =>
              handleRegister(data as RegisterFormData)
            )
        }
      >

        <img
          src={logoRevisee}
          alt="logo Revise.e"
        />

        {loginOn ? (

          <>

            <h1>Acesse a sua conta</h1>

            <input
              type="email"
              placeholder='Digite seu E-mail.'
              {...register("email")}
            />

            {errors.email && (
              <p>{errors.email.message}</p>
            )}

            <input
              type="password"
              placeholder='Digite sua senha.'
              {...register("password")}
            />

            {errors.password && (
              <p>{errors.password.message}</p>
            )}

            <div className="options">

              <input
                type="checkbox"
                id="checkbox"
              />

              <label htmlFor="checkbox">
                Manter-me conectado
              </label>

            </div>

            <button type='submit'>
              Entrar
            </button>

            <button
              type="button"
              onClick={() => {

                reset()

                setLoginOn(false);

                setMsg('');
              }}
            >
              Criar conta
            </button>

          </>

        ) : (

          <>
            <p>Vamos criar a sua conta!</p>

            <input
              type="text"
              placeholder='Digite seu nome.'
              {...register("name")}
            />

            {"name" in errors && errors.name && (
              <p>{errors.name.message}</p>
            )}

            <input
              type="email"
              placeholder='Digite seu E-mail.'
              {...register("email")}
            />

            {errors.email && (
              <p>{errors.email.message}</p>
            )}

            <input
              type="password"
              placeholder='Digite sua senha.'
              {...register("password")}
            />

            {errors.password && (
              <p>{errors.password.message}</p>
            )}

            <p>{msg}</p>

            <button type='submit'>
              Registrar-se
            </button>

            <button
              type="button"
              onClick={() => {

                reset();

                setLoginOn(true);

                setMsg('');
              }}
            >
              Já possuo conta
            </button>

          </>

        )}

      </form>

    </div>
  );
}

export default Login;
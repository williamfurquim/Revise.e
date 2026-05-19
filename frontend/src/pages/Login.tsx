import { useState } from 'react';
import { login, register as registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerSchema, type LoginFormData, type RegisterFormData } from '../schemas/authSchema';
import { useForm } from "react-hook-form";
import logoRevisee from '../images/logo-revisee.png'

const Login = () => {

  const [loginOn, setLoginOn] = useState(true);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  });

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

      navigate('/notas');

    } catch (err: any) {
      showMessage(err.response?.data?.message || "Erro ao fazer login.");
    }
  }

  async function handleRegister(data: RegisterFormData) {

    try {

      await registerUser(
        data.name,
        data.email,
        data.password
      );

      showMessage('Conta criada com sucesso.');

      loginForm.reset({
        email: data.email,
        password: ""
      });

      registerForm.reset();

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
            ? loginForm.handleSubmit(handleLogin)
            : registerForm.handleSubmit(handleRegister)
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
              {...loginForm.register("email")}
            />

            {loginForm.formState.errors.email && (
              <p>{loginForm.formState.errors.email.message}</p>
            )}

            <input
              type="password"
              placeholder='Digite sua senha.'
              {...loginForm.register("password")}
            />

            {loginForm.formState.errors.password && (
              <p>{loginForm.formState.errors.password.message}</p>
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

            {msg && <p>{msg}</p>}

            <button type='submit'>
              Entrar
            </button>

            <button
              type="button"
              onClick={() => {

                loginForm.reset();

                registerForm.reset();

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
              {...registerForm.register("name")}
            />

            {registerForm.formState.errors.name && (
              <p>{registerForm.formState.errors.name.message}</p>
            )}

            <input
              type="email"
              placeholder='Digite seu E-mail.'
              {...registerForm.register("email")}
            />

            {registerForm.formState.errors.email && (
              <p>{registerForm.formState.errors.email.message}</p>
            )}

            <input
              type="password"
              placeholder='Digite sua senha.'
              {...registerForm.register("password")}
            />

            {registerForm.formState.errors.password && (
              <p>{registerForm.formState.errors.password.message}</p>
            )}

            <p>{msg}</p>

            <button type='submit'>
              Registrar-se
            </button>

            <button
              type="button"
              onClick={() => {

                loginForm.reset();

                registerForm.reset();

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
import { useState } from 'react';
import { login, register } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [msg, setMsg] = useState('');

  const [loginOn, setLoginOn] = useState(true);

  function showMessage(message: string) {

    setMsg(message);

    setTimeout(() => {
      setMsg('');
    }, 2500);
  }

  async function handleLogin(e: any) {

    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      return showMessage(
        'Insira corretamente os dados.'
      );
    }

    try {

      const response = await login(
        email,
        password
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

      showMessage(
        err.response?.data?.message ||
        "Erro ao fazer login."
      );
    }
  }

  async function handleRegister(e: any) {

    e.preventDefault();

    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      return showMessage(
        'Preencha todos os campos.'
      );
    }

    try {

      await register(
        name,
        email,
        password
      );

      showMessage(
        'Conta criada com sucesso.'
      );

      setTimeout(() => {
        navigate('/login');
      }, 2500);

      setLoginOn(true);

      setName('');
      setEmail('');
      setPassword('');

    } catch (err: any) {

      showMessage(
        err.response?.data?.message ||
        "Erro ao registrar."
      );
    }
  }

  return (
    <div>

      <form
        onSubmit={
          loginOn
            ? handleLogin
            : handleRegister
        }
      >

        <h1>
          Bem-vindo(a) ao Revise.e
        </h1>

        <img
          src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png"
          height={150}
          width={200}
          alt=""
        />

        {loginOn ? (

          <>

            <input
              type="email"
              placeholder='Digite seu E-mail.'
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <input
              type="password"
              placeholder='Digite sua senha.'
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

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
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

            <input
              type="email"
              placeholder='Digite seu E-mail.'
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <input
              type="password"
              placeholder='Digite sua senha.'
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <button type='submit'>
              Registrar-se
            </button>

            <button
              type="button"
              onClick={() => {

                setLoginOn(true);

                setMsg('');
              }}
            >
              Já possuo conta
            </button>

          </>

        )}

      </form>

      <p>{msg}</p>

    </div>
  );
}

export default Login;
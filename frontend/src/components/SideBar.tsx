import { Link, useNavigate } from "react-router-dom"

const SideBar = () => {
    const navigate = useNavigate();

    function logout() {
        const confirmed = confirm('Tem certeza que quer desconectar?');
        if (confirmed){
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate('/login');
        }
    }

    return (
        <aside>
            <h2 className="logo">Revise.e</h2>

            <nav>
                <ul>
                    <li>
                        <Link to={'/notas'}>
                            <i className="fa-solid fa-notes-medical"></i>
                            Anotações
                        </Link>
                    </li>

                    <li>
                        <Link to={'/revisao'}>
                            <i className="fa-solid fa-brain"></i>
                            Revisão
                        </Link>
                    </li>

                    <li>
                        <Link to={'/configuracoes'}>
                            <i className="fa-solid fa-gear"></i>
                            Configurações
                        </Link>
                    </li>

                    <li>
                        <a href="https://github.com/williamfurquim/Revise.e"
                        target="_blank"
                        rel="noopener noreferrer">
                            <i className="fa-brands fa-github"></i>
                            GitHub
                        </a>
                    </li>

                    <li onClick={logout}>
                        <a style={{ cursor: "pointer" }}>
                            <i className="fa-solid fa-right-from-bracket"></i>
                            Desconectar
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

export default SideBar
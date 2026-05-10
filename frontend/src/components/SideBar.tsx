import { Link, useNavigate } from "react-router-dom"

const SideBar = () => {
    const navigate = useNavigate();

    function logout() {
        const confirmed = confirm('Tem certeza que quer desconectar?');
        if (confirmed){
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate('/auth/login');
        } else {
            return
        }
    }

    return (
        <aside>
            <h2 className="logo">Revise.e</h2>

            <nav>
                <ul>
                    <li><Link to={'/api/notas'}>Anotações</Link></li>
                    <li><Link to={'/api/configuracoes'}>Configurações</Link></li>
                    <li><a href="https://github.com/williamfurquim/Revisee"
                        target="_blank"
                        rel="noopener noreferrer">
                        {/* Evita vulnerabilidade de segurança */}
                        GitHub
                    </a></li>
                    <li onClick={logout}>
                        <button>
                            Desconectar
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

export default SideBar
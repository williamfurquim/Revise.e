import SideBar from '../components/SideBar'
import { Theme } from '../components/Theme'

const Configs = () => {
    return (
        <div className='layout'>
            <SideBar></SideBar>

            <main className="configs-page">
                <Theme></Theme>
                <button style={{ marginRight: 10 }}>Trocar idioma</button>
                <button style={{ marginRight: 10 }}>Alterar E-mail</button>
                <button style={{ marginRight: 10 }}>Alterar senha</button>                
            </main>
        </div>
    )
}

export default Configs
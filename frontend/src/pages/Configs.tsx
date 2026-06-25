import SideBar from '../components/SideBar'
import UseTheme from '../components/UseTheme';

const Configs = () => {

    const { isDark, setIsDark } = UseTheme();

    return (

        <div className='layout'>
            <SideBar />

            <main className="configs-page">
                <button onClick={() => setIsDark(prev => !prev)}>
                    Ativar modo {isDark ? 'claro' : 'escuro'}
                </button>

                <button style={{ marginRight: 10 }}>Trocar idioma</button>
                <button style={{ marginRight: 10 }}>Alterar E-mail</button>
                <button style={{ marginRight: 10 }}>Alterar senha</button>                
            </main>
        </div>

    )
}

export default Configs
import { useNavigate } from 'react-router-dom';
import { finishTutorial } from '../services/api';
import formularioImg from "../images/formulario.png";
import reviewImg from "../images/review.png";

const TutorialPage = () => {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    async function handleFinishTutorial() {

        if (user.tutorial) {
            navigate("/notas");
            return;
        }

        try {
            await finishTutorial();

            user.tutorial = true;

            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );

            navigate("/notas");

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="layout">

            {/* {!user.tutorial && <SideBar />} */}

            <main className="tutorial-page">

                <section className="tutorial-hero">

                    <div className="tutorial-hero-content">

                        <span className="tutorial-badge">
                            Bem-vindo ao Revise.e
                        </span>

                        <h1>
                            Aprenda mais rápido com revisões inteligentes
                        </h1>

                        <p>
                            {/* TEXTO PRINCIPAL */}
                            Guarde suas anotações para ver quando quiser e marque as palavras importantes
                            com <span className="mark">chaves duplas</span> para realizar a revisão ativa.
                        </p>

                    </div>

                    <div className="tutorial-hero-image">

                        {/* IMAGEM PRINCIPAL */}
                        <img
                            className='tutorial-image'
                            src={formularioImg}
                            alt="formulário com chaves duplas em palavras-chave"
                        />

                    </div>

                </section>

                <section className="tutorial-section">

                    <div className="tutorial-card">

                        <div className="tutorial-card-image">

                            {/* SEGUNDA IMAGEM */}
                            <img
                                className="tutorial-image"
                                src={reviewImg}
                                alt="Card de revisão ocultando palavra-chave"
                            />

                        </div>


                        <div className="tutorial-card-content">

                            <h2>
                                Crie cards e use sua memória
                            </h2>

                            <p>
                                {/* TEXTO SECUNDÁRIO */}
                                O card identifica palavras entre
                                chaves duplas e as <span className="mark">oculta
                                    automaticamente</span>, fazendo
                                você recuperar a informação diretamente da memória
                                durante a revisão.
                            </p>

                            <ul>

                                <li>
                                    Organize seus estudos
                                </li>

                                <li>
                                    Revise automaticamente
                                </li>

                                <li>
                                    Aprenda com repetição espaçada
                                </li>

                            </ul>

                            <button className='start-now' onClick={handleFinishTutorial}>
                                Começar agora
                            </button>

                        </div>

                    </div>

                </section>

            </main>

        </div>
    );
};

export default TutorialPage;
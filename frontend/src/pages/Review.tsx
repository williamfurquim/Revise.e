import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { api } from "../services/api";
import { type ReviewCard } from "../types/allTypes";


const Review = () => {

    const [cards, setCards] =
        useState<ReviewCard[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [currentIndex, setCurrentIndex] =
        useState(0);

    const [showAnswer, setShowAnswer] =
        useState(false);

    useEffect(() => {

        async function fetchCards() {

            try {

                const response =
                    await api.get("/review/due");

                setCards(response.data);

            } catch (err) {

                console.error(err);

            } finally {

                setLoading(false);
            }
        }

        fetchCards();

    }, []);

    if (loading) {

        return <p>Carregando...</p>;
    }

    const currentCard =
        cards[currentIndex];

    return (

        <div className="layout">

            <SideBar />

            <main className="review-page">

                <h1>Revisão Ativa</h1>

                <p>
                    Card {currentIndex + 1} de {cards.length}
                </p>

                {!currentCard ? (

                    <div className="review-finished">

                        <h2>
                            Revisões concluídas 🎉
                        </h2>

                        <p>
                            Nenhum card pendente.
                        </p>

                    </div>

                ) : (

                    <div className="review-card">

                        <h2>
                            {currentCard.question}
                        </h2>

                        {!showAnswer ? (

                            <button
                                onClick={() =>
                                    setShowAnswer(true)
                                }
                            >
                                Mostrar resposta
                            </button>

                        ) : (

                            <div className="answer-area">

                                <p>
                                    {currentCard.answer}
                                </p>

                                <button
                                    onClick={() => {

                                        setCurrentIndex(
                                            prev => prev + 1
                                        );

                                        setShowAnswer(false);
                                    }}
                                >
                                    Próximo
                                </button>

                            </div>
                        )}

                    </div>
                )}

            </main>

        </div>
    );
};

export default Review;
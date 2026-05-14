import { useEffect, useState } from "react";

import SideBar from "../components/SideBar";

import { api, get } from "../services/api";

import {
    type ReviewCard,
    type tyNotes
} from "../types/allTypes";

import { formatPreview } from "../services/formatPreview";

const Review = () => {

    // =========================
    // STATES
    // =========================

    const [notes, setNotes] =
        useState<tyNotes[]>([]);

    const [selectedNote, setSelectedNote] =
        useState<number | null>(null);

    const [cards, setCards] =
        useState<ReviewCard[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [currentIndex, setCurrentIndex] =
        useState(0);

    const [showAnswer, setShowAnswer] =
        useState(false);

    // =========================
    // BUSCAR NOTAS
    // =========================

    useEffect(() => {

        async function fetchNotes() {

            try {

                const response =
                    await get();

                setNotes(response.data);

            } catch (err) {

                console.error(err);

            } finally {

                setLoading(false);
            }
        }

        fetchNotes();

    }, []);

    // =========================
    // INICIAR REVISÃO
    // =========================

    async function startReview(
        noteId: number
    ) {

        try {

            setLoading(true);

            const response =
                await api.get(
                    `/review/${noteId}`
                );

            setCards(response.data);

            setSelectedNote(noteId);

            setCurrentIndex(0);

            setShowAnswer(false);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);
        }
    }

    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (

            <div className="layout">

                <SideBar />

                <main className="review-page">

                    <h2>Carregando...</h2>

                </main>

            </div>
        );
    }

    // =========================
    // CARD ATUAL
    // =========================

    const currentCard =
        cards[currentIndex];

    // =========================
    // JSX
    // =========================

    return (

        <div className="layout">

            <SideBar />

            <main className="review-page">

                <h1>
                    Revisão Ativa
                </h1>

                {selectedNote === null ? (

                    <>
                        <p>
                            Escolha uma anotação para revisar.
                        </p>

                        <section className="s-notes">

                            {notes.length === 0 ? (

                                <p>
                                    Você ainda não possui anotações.
                                </p>

                            ) : (

                                notes.map(note => (

                                    <div
                                        key={note.id}
                                        className="note-card"
                                        onClick={() =>
                                            startReview(note.id)
                                        }
                                    >

                                        <h2>
                                            {note.title}
                                        </h2>

                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: formatPreview(note.note)
                                            }}
                                        />

                                    </div>
                                ))
                            )}

                        </section>
                    </>

                ) : !currentCard ? (

                    <div className="review-finished">

                        <h2>
                            Revisões concluídas 🎉
                        </h2>

                        <p>
                            Nenhum card pendente.
                        </p>

                        <button
                            onClick={() => {

                                setSelectedNote(null);

                                setCards([]);

                                setCurrentIndex(0);

                                setShowAnswer(false);
                            }}
                        >
                            Voltar para anotações
                        </button>

                    </div>

                ) : (

                    <>
                        <p>
                            Card {currentIndex + 1} de {cards.length}
                        </p>

                        <div className="review-card">

                            <h2
                                dangerouslySetInnerHTML={{
                                    __html: formatPreview(currentCard.question)
                                }}
                            />

                            {/* <h2>
                                {currentCard.question}
                            </h2> */}

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
                                        Resposta: "<span className="answer-p">{currentCard.answer}</span>" ✅
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
                    </>
                )}

            </main>

        </div>
    );
};

export default Review;
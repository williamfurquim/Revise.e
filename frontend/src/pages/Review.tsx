import SideBar from "../components/SideBar";
import { useEffect, useState, useRef } from "react";
import { api, get } from "../services/api";
import { type ReviewCard, type tyNotes } from "../types/allTypes";
import { formatPreview } from "../services/formatPreview";
import { patch } from "../services/api";

const Review = () => {

    // ===== VARIÁVEIS GLOBAIS =====

    const [notes, setNotes] =
        useState<tyNotes[]>([]);

    const [selectedNote, setSelectedNote] =
        useState<number | null>(null);

    const [cards, setCards] =
        useState<ReviewCard[]>([]);

    const [currentIndex, setCurrentIndex] =
        useState(0);

    const [loading, setLoading] =
        useState(true);

    const [showAnswer, setShowAnswer] =
        useState(false);

    const lineRef = useRef<HTMLDivElement | null>(null);

    // ==== FUNÇÃO PARA BUSCAR ANOTAÇÕES DO USUÁRIO =====

    async function fetchNotes() {
        try {
            const response = await get();
            setNotes(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchNotes();
    }, []);

    // ==== ADICIONAR +1 REVISÃO NA ANOTAÇÃO =====

    useEffect(() => {
        async function finishReview() {
            if (
                selectedNote !== null &&
                currentIndex >= cards.length &&
                cards.length > 0
            ) {

                await patch(selectedNote);
                await fetchNotes();
            }
        }
        finishReview();
    }, [currentIndex]);

    // ===== ARRASTA A TELA DO USUÁRIO ATÉ A PALAVRA OCULTA ====

    useEffect(() => {
        if (!lineRef.current) return;

        const element = lineRef.current.querySelector("#active-cloze");

        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }
    }, [currentIndex])

    // ==== INICIAR REVISÃO =====

    async function startReview(noteId: number) {
        try {
            setLoading(true);
            // Busca todos os cards
            const response = await api.get(`/review/${noteId}`);
            setCards(response.data);

            setSelectedNote(noteId);
            setShowAnswer(false);
            setCurrentIndex(0);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    // ==== CANCELAR REVISÃO =====

    function cancelReview() {
        setSelectedNote(null);
        setCards([]);
        setCurrentIndex(0);
        setShowAnswer(false);
    }

    // ==== TELA DE LOADING ====

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

    // ==== CARD ATUAL E SELECIONADO ====

    const currentCard = cards[currentIndex];

    return (
        <div className="layout">
            <SideBar />

            <main className="review-page">
                <h1>
                    Revisão Ativa
                </h1>

                {/* Header da página: */}
                {selectedNote === null ? (
                    <>
                        <p>
                            Escolha uma anotação para revisar.
                        </p>

                        {/* Exibe as anotações do usuário */}
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
                                        }>

                                        {/* Mostra as informações das anotações */}
                                        <h2>
                                            {note.title}
                                        </h2>

                                        <p className="note-text"
                                            dangerouslySetInnerHTML={{
                                                __html: formatPreview(note.note)
                                            }}
                                        />

                                        {(note.reviewCount ?? 0) > 1
                                            ? <h4 className="status">Revisado {note.reviewCount ?? 0} vezes 🔥</h4>
                                            : (note.reviewCount ?? 0) === 0
                                                ? <h4 className="status">Não revisado ✖️</h4>
                                                : <h4 className="status">Revisado {note.reviewCount ?? 0} vez 🔥</h4>
                                        }
                                    </div>
                                ))
                            )}
                        </section>
                    </>

                ) : !currentCard ? (
                    // Nenhum card sobrando
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
                            }}>
                            Voltar para anotações
                        </button>

                    </div>

                ) : (
                    // Cards com palavras ocultas:
                    <>
                        <div className="review-card" ref={lineRef}>
                            <div className="review-content">
                                <h2
                                    dangerouslySetInnerHTML={{
                                        __html: formatPreview(
                                            currentCard.question,
                                            currentCard.answer,
                                            showAnswer
                                        )
                                    }}
                                />
                            </div>

                            {/* Aqui tem a lógica da barra inferior do card */}
                            {/* Começando com a palavra ainda não revelada */}
                            
                            {!showAnswer ? (
                                <div className="answer-area">

                                    <h3 className="stage">
                                        {currentIndex + 1} de {cards.length}
                                    </h3>

                                    <p className="answer-text">
                                        Lembre-se da palavra oculta
                                    </p>

                                    <div className="review-actions">

                                        <button
                                            onClick={() =>
                                                setShowAnswer(true)
                                            }>
                                            Mostrar resposta
                                        </button>

                                        <button
                                            className="btn-cancel"
                                            onClick={cancelReview}>
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="answer-area">
                                    <h3 className="stage">
                                        {currentIndex + 1} de {cards.length}
                                    </h3>

                                    <p>
                                        Resposta: <span className="answer-p">{currentCard.answer}</span> ✅
                                    </p>

                                    <div className="review-actions">
                                        <button
                                            onClick={() => {

                                                setCurrentIndex(
                                                    prev => prev + 1
                                                );

                                                setShowAnswer(false);
                                            }}>
                                            Próximo
                                        </button>

                                        <button
                                            className="btn-cancel"
                                            onClick={cancelReview}>
                                            Cancelar
                                        </button>
                                    </div>
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
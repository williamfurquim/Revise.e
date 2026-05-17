import { useCallback, useMemo, useState, useEffect } from "react";
import { update } from "../services/api";
import { type INoteCardProps } from "../types/allTypes";
import { formatPreview } from "../services/formatPreview";

const NoteCard = ({
    notesList,
    setNoteSelected,
    noteSelected,
    handleDelete,
    search,
    setNotesList
}: INoteCardProps) => {

    // estados locais de edição
    const [editTitle, setEditTitle] = useState("");
    const [editNote, setEditNote] = useState("");

    const [saving, setSaving] = useState(false);

    // sincroniza quando seleciona outra nota
    useEffect(() => {
        if (noteSelected) {
            setEditTitle(noteSelected.title);
            setEditNote(noteSelected.note);
        }
    }, [noteSelected]);

    // auto-save com debounce + proteção
    useEffect(() => {
        if (!noteSelected) return;

        const noteId = noteSelected.id;
        let isCancelled = false;

        const timeout = setTimeout(async () => {

            if (
                editTitle === noteSelected.title &&
                editNote === noteSelected.note
            ) return;

            try {
                setSaving(true);

                if (!editTitle.trim() || !editNote.trim()) {
                    return;
                }

                await update(noteId, {
                    title: editTitle,
                    note: editNote
                });

                if (isCancelled) return;

                setNotesList(prev =>
                    prev.map(n => {
                        if (n.id !== noteId) return n;
                        if (n.title === editTitle && n.note === editNote) return n;

                        return {
                            ...n,
                            title: editTitle,
                            note: editNote
                        };
                    })
                );

            } catch (err) {
                console.error("Erro ao salvar:", err);
            } finally {
                if (!isCancelled) setSaving(false);
            }

        }, 500);

        return () => {
            isCancelled = true;
            clearTimeout(timeout);
        };

    }, [editTitle, editNote, noteSelected, setNotesList]);

    // filtro inteligente
    const normalize = useCallback((text: string) => {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, " ")
            .trim();
    }, []);

    // filtro da search
    const filtered = useMemo(() => {
        const normalizedSearch = normalize(search);

        if (!normalizedSearch) return notesList;

        const terms = normalizedSearch.split(" ");

        return notesList.filter((note) => {
            const title = normalize(note.title || "");
            return terms.every((term) => title.includes(term));
        });
    }, [notesList, search, normalize]);

    return (
        <>
            <section className="s-notes">
                {filtered.length > 0 ? (
                    filtered.map((not) => (
                        <div
                            key={not.id}
                            className="note-card"
                            onClick={(e) => {
                                const target = e.target as HTMLElement;

                                if (target.closest("button")) return;

                                setNoteSelected(not);
                            }}
                        >
                            <h2>{not.title}</h2>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: formatPreview(not.note)
                                }}
                            />

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const confirmed = confirm('Sua anotação será excluída pra sempre (muito tempo).');
                                    if (confirmed) {
                                        handleDelete(not.id);
                                    }
                                }}
                            >
                                Excluir
                            </button>
                        </div>
                    ))
                ) : (
                    <p>Não há tarefas.</p>
                )}
            </section>

            {noteSelected && (
                <div className="modal">
                    <div className="modal-content">

                        <div className="modal-header">

                            <button onClick={() => setNoteSelected(null)}>
                                Fechar
                            </button>

                            <button
                                className="btn-excluir"
                                onClick={() => {
                                    const confirmed = confirm('Sua anotação será excluída pra sempre (muito tempo).');
                                    if (confirmed) {
                                        handleDelete(noteSelected.id);
                                        setNoteSelected(null);
                                    }                                   
                                }}
                            >
                                Excluir
                            </button>

                        </div>

                        <input
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            placeholder="Título"
                        />

                        <textarea
                            value={editNote}
                            onChange={(e) => setEditNote(e.target.value)}
                            placeholder="Conteúdo"
                        />

                        {saving && <span>Salvando...</span>}

                    </div>
                </div>
            )}
        </>
    );
};

export default NoteCard;
export interface tyNotes {
    id: number,
    title: string,
    note: string
    reviewCount?: number
}

export type tyCreateNote = Omit<tyNotes, "id">;

export interface INoteCardProps {
    notesList: tyNotes[];
    setNoteSelected: React.Dispatch<React.SetStateAction<tyNotes | null>>;
    noteSelected: tyNotes | null;
    handleDelete: (id: number) => void;
    search: string;
    setNotesList: React.Dispatch<React.SetStateAction<tyNotes[]>>
}

export type ReviewCard = {
    id: number;
    question: string;
    answer: string;
};
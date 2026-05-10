export interface tyNotes {
    id: number,
    title: string,
    note: string
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

export interface IFormProps {
    handleSubmit: (e: React.FormEvent) => void;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    note: string;
    setNote: React.Dispatch<React.SetStateAction<string>>;
}
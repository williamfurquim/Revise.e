import { useState, useEffect } from 'react';
import { get, post, remove } from './services/api';
import { type tyNotes } from './types/allTypes';
import SideBar from './components/SideBar.js';
import Form from './components/Form.tsx';
import NoteCard from './components/NoteCard.tsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { noteSchema, type NoteFormData } from './schemas/notesSchema.ts';

function App() {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<NoteFormData>({
    resolver: zodResolver(noteSchema)
  });

  // ===== VARIÁVEIS GLOBAIS ===== 

  const [notesList, setNotesList] = useState<tyNotes[]>([]);
  const [noteSelected, setNoteSelected] = useState<tyNotes | null>(null);
  const [search, setSearch] = useState("");
  let totalList = notesList.length;
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // ===== FUNÇÃO GET NOTAS DA API =====

  async function getApi() {
    try {
      const response = await get();
      setNotesList(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getApi();
  }, []);

  // ===== FUNÇÃO DELETE NOTA DA API =====

  async function handleDelete(id: number) {
    try {
      await remove(id);
      getApi();
    } catch (err) {
      console.error(err);
    }
  }

  // ===== FUNÇÃO POST NOTA DA API =====

  async function onSubmit(data: NoteFormData) {
    try {
      const postApi = await post(data);

      setNotesList(prev => [
        ...prev,
        postApi.data
      ]);

      reset();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="layout">
      <SideBar />

      <main>
        <p>
          Olá, {user.name}!
        </p>

        <Form
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
        />

        <h2>
          {totalList === 1
            ? `${totalList} nota encontrada`
            : `${totalList} notas encontradas`
          }
        </h2>

        {/* Barra de pesquisa */}
        <input
          className='inputSearch'
          type="text"
          placeholder="Pesquisar..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        {/* Anotações do usuário */}
        <NoteCard
          notesList={notesList}
          setNotesList={setNotesList}
          noteSelected={noteSelected}
          setNoteSelected={setNoteSelected}
          handleDelete={handleDelete}
          search={search}
        />

      </main>
    </div>
  );
}

export default App;
import React, { useState, useEffect } from 'react'
import './App.css'
import { get, post, remove } from './services/api'
import { type tyNotes } from './types/allTypes';
import SideBar from './components/SideBar.js';
import Form from './components/Form.tsx';
import NoteCard from './components/NoteCard.tsx';

function App() {
  const [notesList, setNotesList] = useState<tyNotes[]>([]);
  const [noteSelected, setNoteSelected] = useState<tyNotes | null>(null);
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [search, setSearch] = useState("");

  let totalList = notesList.length;

  const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

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

  async function handleDelete(id: number) {
    try {
      await remove(id);
      getApi();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim() || !note.trim()) return;

    const newNote = {
      title, note
    };

    try {
      const postApi = await post(newNote);
      setNotesList(prev => [...prev, postApi.data]);

      setTitle('');
      setNote('');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="layout">
      <SideBar />

      <main>
        <p>Olá, {user.name}!</p>
        <Form
          handleSubmit={handleSubmit}
          title={title}
          setTitle={setTitle}
          note={note}
          setNote={setNote}
        />

        <h2>Total de notas: {totalList}</h2>
        <input className='inputSearch'
          type="text"
          placeholder="Pesquisar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <NoteCard
          notesList={notesList}
          setNoteSelected={setNoteSelected}
          noteSelected={noteSelected}
          handleDelete={handleDelete}
          search={search}
          setNotesList={setNotesList}
        />
      </main>
    </div>
  )
}

export default App
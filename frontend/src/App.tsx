import React, {
  useState,
  useEffect
} from 'react';

import './App.css';

import {
  get,
  post,
  remove
} from './services/api';

import {
  type tyNotes
} from './types/allTypes';

import SideBar from './components/SideBar.js';

import Form from './components/Form.tsx';

import NoteCard from './components/NoteCard.tsx';

import { useForm } from 'react-hook-form';

import {
  zodResolver
} from '@hookform/resolvers/zod';

import {
  noteSchema,
  type NoteFormData
} from './schemas/notesSchema.ts';

function App() {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<NoteFormData>({
    resolver: zodResolver(noteSchema)
  });

  const [notesList, setNotesList] =
    useState<tyNotes[]>([]);

  const [noteSelected, setNoteSelected] =
    useState<tyNotes | null>(null);

  const [search, setSearch] =
    useState("");

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

  async function onSubmit(
    data: NoteFormData
  ) {

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
          Total de notas: {totalList}
        </h2>

        <input
          className='inputSearch'
          type="text"
          placeholder="Pesquisar..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
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
  );
}

export default App;
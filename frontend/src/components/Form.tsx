import { type IFormProps } from '../types/allTypes'

const Form = ({handleSubmit, title, setTitle, note, setNote}: IFormProps) => {
  return (
    <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Digite o título."
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Digite suas anotações."
            value={note}
            onChange={e => setNote(e.target.value)}
          />

          <button type="submit">Enviar</button>
        </form>
  )
}

export default Form
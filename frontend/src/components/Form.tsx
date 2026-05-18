import { type FieldErrors, type UseFormHandleSubmit, type UseFormRegister } from "react-hook-form";
import { type NoteFormData } from "../schemas/notesSchema";

type IFormProps = {
  register: UseFormRegister<NoteFormData>;
  handleSubmit: UseFormHandleSubmit<NoteFormData>;
  onSubmit: (data: NoteFormData) => Promise<void>;
  errors: FieldErrors<NoteFormData>;
};

const Form = ({
  register,
  handleSubmit,
  onSubmit,
  errors
}: IFormProps) => {

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <input
        type="text"
        placeholder="Digite o título."
        {...register("title")}
      />

      {errors.title && (
        <p>{errors.title.message}</p>
      )}

      <textarea
        placeholder="Digite suas anotações."
        {...register("note")}
      />

      {errors.note && (
        <p>{errors.note.message}</p>
      )}

      <button type="submit">
        Enviar
      </button>

    </form>
  );
};

export default Form;
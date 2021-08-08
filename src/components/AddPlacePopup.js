import { useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const [name, setName] = useState('');
  const link = useRef('');

  const handleChange = (e) => {
    setName(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onAddPlace({
      name,
      link: link.current.value,
    });
    setName('');
        link.current.value = '';
  }

  return (
    <PopupWithForm
      name={'add-card'}
      title={'Новое место'}
      buttonText={'Добавить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit} >
      <label htmlFor="place-name-input" className="form__label">
        <input type="text" name="name" value={name} onChange={handleChange} id="place-name-input" placeholder="Название" className="form__input"
          minLength="2" required />
        <span className="form__input-error form__input-error_visible place-name-input-error"></span>
      </label>
      <label htmlFor="place-link-input" className="form__label">
        <input ref={link} type="url" name="link" id="place-link-input" placeholder="Ссылка на картинку"
          className="form__input" required />
        <span className="form__input-error form__input-error_visible place-link-input-error"></span>
      </label>
    </PopupWithForm>
  )
}
import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup (props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleNameChange = (e) => {
      setName(e.target.value);
    }

    const handleAboutChange = (e) => {
      setDescription(e.target.value);
    }

    return (
        <PopupWithForm
          name={'edit-profile'}
          title={'Редактировать профиль'}
          buttonText={'Сохранить'}
          isOpen={props.isOpen}
          onClose={props.onClose}>
          <label htmlFor="name-input" className="form__label">
            <input type="text" name="name" value={name} id="name-input" placeholder="Имя" className="form__input" minLength="2" maxLength="40"
                  required onChange={handleNameChange} />
            <span className="form__input-error form__input-error_visible name-input-error"></span>
          </label>
          <label htmlFor="about-input" className="form__label">
            <input type="text" name="about" value={description} id="about-input" placeholder="Занятие" className="form__input" minLength="2" maxLength="200"
                  required onChange={handleAboutChange} />
            <span className="form__input-error form__input-error_visible about-input-error"></span>
          </label>
        </PopupWithForm>
    )
}
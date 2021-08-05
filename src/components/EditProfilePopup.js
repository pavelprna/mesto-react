import { useContext, useEffect, useState } from "react";
import { currentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup (props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = useContext(currentUserContext);
    
    useEffect(() => {
      setName(currentUser.name || '');
      setDescription(currentUser.about || '');
    }, [currentUser]);

    const handleChange = (e) => {
      e.target.name === 'name'
        ? setName(e.target.value)
        : setDescription(e.target.value);
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      props.onUpdateUser({
        name,
        about: description,
      });
    }

    return (
        <PopupWithForm
          name={'edit-profile'}
          title={'Редактировать профиль'}
          buttonText={'Сохранить'}
          isOpen={props.isOpen}
          onClose={props.onClose}
          onSubmit={handleSubmit}>
          <label htmlFor="name-input" className="form__label">
            <input type="text" name="name" value={name} id="name-input" placeholder="Имя" className="form__input" minLength="2" maxLength="40"
                  required onChange={handleChange} />
            <span className="form__input-error form__input-error_visible name-input-error"></span>
          </label>
          <label htmlFor="about-input" className="form__label">
            <input type="text" name="about" value={description} id="about-input" placeholder="Занятие" className="form__input" minLength="2" maxLength="200"
                  required onChange={handleChange} />
            <span className="form__input-error form__input-error_visible about-input-error"></span>
          </label>
        </PopupWithForm>
    )
}
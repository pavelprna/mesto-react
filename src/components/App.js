import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import {useEffect, useState} from "react";
import { api } from "../utils/api";
import { currentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api.getUser()
    .then(user => setCurrentUser(user));
  }, [])

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  return (
    <div className="page">
      <currentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer />

        <PopupWithForm
          name={'edit-profile'}
          title={'Редактировать профиль'}
          buttonText={'Сохранить'}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}>
          <label htmlFor="name-input" className="form__label">
            <input type="text" name="name" id="name-input" placeholder="Имя" className="form__input" minLength="2" maxLength="40"
                  required />
            <span className="form__input-error form__input-error_visible name-input-error"></span>
          </label>
          <label htmlFor="about-input" className="form__label">
            <input type="text" name="about" id="about-input" placeholder="Занятие" className="form__input" minLength="2" maxLength="200"
                  required />
            <span className="form__input-error form__input-error_visible about-input-error"></span>
          </label>
        </PopupWithForm>

        <PopupWithForm
          name={'avatar'}
          title={'Обновить аватар'}
          buttonText={'Изменить'}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}>
          <label htmlFor="avatar-link-input" className="form__label">
            <input type="url" name="avatar" id="avatar-link-input" placeholder="Ссылка на картинку"
                  className="form__input" required />
            <span className="form__input-error form__input-error_visible avatar-link-input-error"></span>
          </label>
        </PopupWithForm>

        <PopupWithForm
          name={'add-card'}
          title={'Новое место'}
          buttonText={'Добавить'}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}>
          <label htmlFor="place-name-input" className="form__label">
            <input type="text" name="name" id="place-name-input" placeholder="Название" className="form__input"
                  minLength="2" required />
            <span className="form__input-error form__input-error_visible place-name-input-error"></span>
          </label>
          <label htmlFor="place-link-input" className="form__label">
            <input type="url" name="link" id="place-link-input" placeholder="Ссылка на картинку"
                  className="form__input" required />
            <span className="form__input-error form__input-error_visible place-link-input-error"></span>
          </label>
        </PopupWithForm>

        <PopupWithForm name='confirmation' title={'Вы уверены?'} buttonText={'Да'} onClose={closeAllPopups}/>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </currentUserContext.Provider>
    </div>
  );
}

export default App;

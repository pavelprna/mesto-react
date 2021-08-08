import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import {useEffect, useState} from "react";
import { api } from "../utils/api";
import { currentUserContext } from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUser()
    .then(user => {
      setCurrentUser(user);
    });
    api.getInitialCards()
      .then(cards => setCards(cards))
      .catch(err => Error(err));
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

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => Error(err));
  }

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id))
      })
      .catch(err => Error(err));
  }

  const handleUpdateUser = (data) => {
    api.updateUser(data)
      .then(user => {
        setCurrentUser(user);
        closeAllPopups();
      })
  }

  const handleUpdateAvatar = (data) => {
    api.changeAvatar(data)
      .then(user => {
        setCurrentUser(user);
        closeAllPopups();
      })
  }
  
  return (
    <div className="page">
      <currentUserContext.Provider value={currentUser}>

        <Header />

        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick} />

        <Footer />

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups} />

        <PopupWithForm
          name={'add-card'}
          title={'Новое место'}
          buttonText={'Добавить'}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups} >
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

import {useEffect, useState} from "react";
import {api} from "../utils/api";
import Card from "./Card";

function Main(props) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUser()
      .then(user => {
        setUserName(user.name);
        setUserDescription(user.about);
        setUserAvatar(user.avatar);
      })
      .catch(err => Error(err));
    api.getInitialCards()
      .then(cards => setCards(cards))
  }, [])

  return (
    <main className="content">

      <section className="profile">
        <button
          onClick={props.onEditAvatar}
          className="button profile__avatar-button">
          <img src={userAvatar} alt=" " className="profile__avatar" />
        </button>
        <div className="profile__info">
          <h1 className="profile__title">{userName}</h1>
          <button
            onClick={props.onEditProfile}
            className="profile__edit-button button" />
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button
          onClick={props.onAddPlace}
          type="button" className="profile__add-button button" />
      </section>

      <section className="elements" aria-label="Карточки мест">
        <ul className="elements__list">
          {cards.map(item => {
            return (
              <li className="elements__list-item" key={item._id}>
                <Card card={item} onCardClick={props.onCardClick}/>
              </li>
            )
          })}
        </ul>
      </section>

    </main>
  )
}

export default Main;

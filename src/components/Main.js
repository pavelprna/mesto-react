import React, {useEffect, useState} from "react";
import { currentUserContext } from "../contexts/CurrentUserContext";
import {api} from "../utils/api";
import Card from "./Card";

function Main(props) {
  const currentUser = React.useContext(currentUserContext);
  

  useEffect(() => {
    
  }, []);

  

  return (
    <main className="content">

      <section className="profile">
        <button
          onClick={props.onEditAvatar}
          className="button profile__avatar-button">
          <img src={currentUser.avatar} alt=" " className="profile__avatar"/>
        </button>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            onClick={props.onEditProfile}
            className="profile__edit-button button"/>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          onClick={props.onAddPlace}
          type="button" className="profile__add-button button"/>
      </section>

      <section className="elements" aria-label="Карточки мест">
        <ul className="elements__list">
          {props.cards.map(item => {
            return (
              <Card
                card={item}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
                key={item._id}
              />
            )
          })}
        </ul>
      </section>

    </main>
  )
}

export default Main;

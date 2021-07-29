function Card(props) {

  const handleOnClick = () => {
    props.onCardClick(props.card);
  }

  return (
    <li className="elements__list-item">
      <article className="element">
        <div className="element__square-container">
          <img src={props.card.link} alt={props.card.name} className="element__image" onClick={handleOnClick}/>
          <button className="element__remove-button button"/>
        </div>
        <h2 className="element__title">{props.card.name}</h2>
        <div className="like">
          <button type="button" className="like__button button"/>
          <span className="like__counter">{props.card.likes.length}</span>
        </div>
      </article>
    </li>
  )
}

export default Card;
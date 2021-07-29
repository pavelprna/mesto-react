function ImagePopup(props) {
  return (
    <div className={`popup popup_content_place-image ${props.card ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_content_place-image">
        <button onClick={props.onClose} className="popup__close button"/>
        <figure className="view-fullscreen">
          <img src={props.card?.link} alt={props.card?.name} className="view-fullscreen__image"/>
          <figcaption
            className="view-fullscreen__caption">{props.card?.name} — {props.card?.owner.name}, {props.card?.owner.about}</figcaption>
        </figure>
      </div>
    </div>
  )
}

export default ImagePopup;

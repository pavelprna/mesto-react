import PopupWithForm from "./PopupWithForm";

export default function ConfirmationPopup(props) {
  const handleSubmit = (e) => {
    e.preventDefault();

    props.onConfirm(props.card);
  }

  return (
    <PopupWithForm
      name='confirmation'
      title={'Вы уверены?'}
      buttonText={'Да'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit} />
  )
}
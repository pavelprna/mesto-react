import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup (props) {
    return (
        <PopupWithForm
          name={'edit-profile'}
          title={'Редактировать профиль'}
          buttonText={'Сохранить'}
          isOpen={props.isOpen}
          onClose={props.onClose}>
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
    )
}
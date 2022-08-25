let alphabet_regex = /^[a-zA-z\s]*$/,
  zip_regex = /^[0-9]{5}$/,
  ph_regex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
  mail_regex = /^[\w]{1,}[\w.+-]{0,}@[\w-]{1,}([.][a-zA-Z]{2,3}|[.][\w-]{2,3}[.][a-zA-Z]{2,3})$/;

/**
  energyEmptyField : Function used to validate empty fields.
*/
const energyEmptyField = (err_msg, fieldName) => {
  fieldName.addClass('is-invalid');
  fieldName.next().text(err_msg);
}

/*
  energyFieldValidation : Function used to display error if field is empty
  inputtxt : String - Field with error
  regex : String - To evaluate entered data
  err_msg : String - Message to be displayed when field is empty
*/
const energyFieldValidation = (inputtxt, regex, err_msg) => {
    inputtxt.removeClass('is-invalid');
    if (!inputtxt.val().match(regex)) {
      inputtxt.addClass('is-invalid');
      inputtxt.next().text(err_msg);
    }
  }
  
  /**
    energyValidateData : Function used to validate empty fields and regex.
  */
  
  const energyValidateData = (field, message, regex, validMessage) => {
    if (field.val() === '') {
      energyEmptyField(message, field);
    } else {
      energyFieldValidation(field, regex, validMessage);
    }
  }
  
   /**
    energyOnFirstNameFocusOut : Function used to validate First Name field.
  */
  const energyOnFirstNameFocusOut = (e) => {
    let $this = $(e.currentTarget);
    energyValidateData($this, 'The first name field is required.', alphabet_regex, 'Please enter valid first name.');
  }
  
   /**
    energyOnLastNameFocusOut : Function used to validate Last Name field.
  */
  const energyOnLastNameFocusOut = (e) => {
    let $this = $(e.currentTarget);
    energyValidateData($this, 'The last name field is required.', alphabet_regex, 'Please enter valid last name.');
  }
  
   /**
    energyOnEmailIdFocusOut : Function used to validate Email field.
  */
  const energyOnEmailIdFocusOut = (e) => {
    let $this = $(e.currentTarget);
    energyValidateData($this, 'The email field is required.', mail_regex, 'Please enter a valid email address.');
  }
  
   /**
    energyOnPhoneFocusOut : Function used to validate Phone field.
  */
  const energyOnPhoneFocusOut = (e) => {
    let $this = $(e.currentTarget);
    energyValidateData($this, 'The phone number field is required.', ph_regex, 'Please enter a valid 10 digit phone number.');
    if ($this.val().length < 14) {
      energyEmptyField('Please enter a 10 digit phone number.', $this);
    }
  }
  
   /**
    energyOnZipFocusOut : Function used to validate Zip field.
  */
  const energyOnZipFocusOut = (e) => {
    let $this = $(e.currentTarget);
    energyValidateData($this, 'The zip code field is required.', zip_regex, 'Please enter a valid zip code.');
  }

  /**
    energyReCaptchaField : Function used to validate recaptcha.
  */
const energyReCaptchaField = (err_msg, fieldName) => {
  if (grecaptcha.getResponse() == "") {
    fieldName.addClass('is-invalid');
    fieldName.next('.invalid-feedback').text(err_msg);
    fieldName.next('.invalid-feedback').show();
  } else {
    fieldName.removeClass('is-invalid');
    fieldName.next().hide();
  }
}


  export {energyValidateData, energyOnFirstNameFocusOut, energyOnLastNameFocusOut, energyOnEmailIdFocusOut, energyOnPhoneFocusOut, energyOnZipFocusOut, energyReCaptchaField};
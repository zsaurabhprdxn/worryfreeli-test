import estDateMode from "./dateToEst";
import {energyValidateData, energyReCaptchaField} from "./energyFormValidations";
let darkMode = estDateMode();
let alphabet_regex = /^[a-zA-z\s]*$/,
  zip_regex = /^[0-9]{5}$/,
  ph_regex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
  mail_regex = /^[\w]{1,}[\w.+-]{0,}@[\w-]{1,}([.][a-zA-Z]{2,3}|[.][\w-]{2,3}[.][a-zA-Z]{2,3})$/;
const zipcode_data = require('../../zipcodes.json');
let zipList = zipcode_data.map(({
  Zip
}) => Zip);

/*
Function to change styles according darkMode
*/
const formPageDarkModeToggle = () => {
    if (darkMode) {
      $('.night').addClass('active');
      $('.day').removeClass('active');
    } else {
      $('.day').addClass('active');
      $('.night').removeClass('active');
    }
  }

/*
formPageSubmit : Function to call on the energy form submit
*/
const formPageSubmit = (e) => {
    let energy_first_name = $('#energy-first-name'),
      energy_last_name = $('#energy-last-name'),
      energy_zip_code = $('#energy-zip-code'),
      energy_phone = $('#energy-phone'),
      energy_email = $('#energy-email'),
      gRecaptcha = $('.g-recaptcha');
  
    energyValidateData(energy_first_name, 'The first name field is required.', alphabet_regex, 'Please enter valid first name.');
    energyValidateData(energy_last_name, 'The last name field is required.', alphabet_regex, 'Please enter valid last name.');
    energyValidateData(energy_email, 'The email field is required.', mail_regex, 'Please enter a valid email address.');

    energyValidateData(energy_phone, 'The phone number field is required.', ph_regex, 'Please enter a valid 10 digit phone number.');
    if (energy_phone.val().length < 14) {
      energy_phone.addClass('is-invalid');
      energy_phone.next().text('Please enter a 10 digit phone number.');
    }

    energyValidateData(energy_zip_code, 'The zip code field is required.', zip_regex, 'Please enter a valid zip code.');

    if (!(zipList.includes(energy_zip_code.val())) && energy_zip_code.val() !== '' && energy_zip_code.val().match(zip_regex) ) {
      energy_zip_code.addClass('is-invalid');
      energy_zip_code.next().text('We don\'t provide service in this area yet');
    }

    energyReCaptchaField('The recaptcha field is required.', gRecaptcha);

    if($('.form-control').hasClass('is-invalid') || $('.g-recaptcha').hasClass('is-invalid')) {
      return false;
    }
    return true;
  }

  export {formPageDarkModeToggle, formPageSubmit};
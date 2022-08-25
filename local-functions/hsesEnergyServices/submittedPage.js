import estDateMode from "./dateToEst";
import {getCookie} from "../../main"
let darkMode = estDateMode();
let rmText = $('#energy-rm-contact-text').val();

/*
  getEnergyCookie: Function used to fetch cookie having multiple values
  cname : name of a cookie
*/
let delimiter = '&';
const getEnergyCookie = (name) => {
    let nameEquals = name + "=";
    if (document.cookie.split(nameEquals)[1]) {
    let whole_cookie = document.cookie.split(nameEquals)[1].split(";")[0];
    let crumbs = whole_cookie.split(delimiter);
    return crumbs[0];
    } else {
      return "";
    }
}

// general block
const block1 = () => {
  $('.submitted-msg-day').removeClass('active');
  $('.submitted-msg-night').removeClass('active');
  $('.btn-submitted-group').addClass('active');
  let phoneNo = $('.menu-item-phone .tel').text();
  $('.btn-call').text(`Call ${phoneNo}`);
}

// during hours block
const block2 = () => {
  $('.submitted-msg-day').addClass('active');
  $('.submitted-msg-night').removeClass('active');
  $('.btn-submitted-group').addClass('active');
  $('.btn-call').text(rmText);
}

// after hours block
const block3 = () => {
  $('.submitted-msg-night').addClass('active');
  $('.submitted-msg-day').removeClass('active');
  $('.btn-submitted-group').removeClass('active');
}

/*
Function to change styles according darkMode
*/
const submittedPageBlockToggle = () => {
  let isCustomer = getCookie('customer');
  let serviceSelectedVal = getEnergyCookie('service');

  if (darkMode) {
    block3()
  } else {
    if (isCustomer == "true") {
      block1();
    } else {
      serviceSelectedVal == 'Heating or Cooling Issues' ? block1() : block2();
    }
  }
}

export default submittedPageBlockToggle;
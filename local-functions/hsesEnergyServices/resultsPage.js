import estDateMode from "./dateToEst";
let darkMode = estDateMode();
let isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

/*
  getEnergyCookie: Function used to fetch cookie having multiple values
  cname : name of a cookie
*/
let delimiter = '&';
const getEnergyCookie = (name) => {
    let nameEquals = name + "=";
    let whole_cookie = document.cookie.split(nameEquals)[1].split(";")[0];
    let crumbs = whole_cookie.split(delimiter);

    return crumbs[0];
}

/*
Functions to mark tick on services option on selection
*/
const resultTickInput1 = (e) => {
    if (!isIE11) {
      $(e.currentTarget).parent().find('.option-1').show();
      $('.option-2').hide();
      $('.option-3').hide();
    }
  }
  
  const resultTickInput2 = (e) => {
    if (!isIE11) {
      $(e.currentTarget).parent().find('.option-2').show();
      $('.option-1').hide();
      $('.option-3').hide();
    }
  }
  
  const resultTickInput3 = (e) => {
    if (!isIE11) {
      $(e.currentTarget).parent().find('.option-3').show();
      $('.option-1').hide();
      $('.option-2').hide();
    }
  }

/*
  getUrlParams: Read a page's GET URL variables and return them as an associative array
*/
const getUrlParams = () => {
    let params = [], hash;
    let hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (let i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=');
      params.push(hash[0]);
      params[hash[0]] = hash[1];
    }
    return params;
  }

/*
Function to store the selected service
*/
const resultsSubmitService = (e) => {
    e.preventDefault();
    let ele = $("input[type='radio'][name='services-options']:checked");
    if (ele.length == 0) {
      $(e.currentTarget).addClass('is-invalid');
    } else {
      let serviceVal = ele.val();
      let params = getUrlParams();
      let zipVal = params['zip'];
      document.cookie = `zipcode=${zipVal}&service=${serviceVal};path=/`;    
      $(e.currentTarget).removeClass('is-invalid');
      $('.services-results-content').hide();
      $('.services-direct-call-content').show();
    }
  }

  /*
Function to redirect on form page or direct call page as per conditions
*/
const callEvent = (e) => {
    let serviceSelectedVal = getEnergyCookie('service');
    if($(e.currentTarget).hasClass('btn-non-customer')) {
      document.cookie = 'customer=false;path=/';
      if(serviceSelectedVal == 'Heating or Cooling Issues') {
        if (darkMode) {
          window.location.href = '/en-us/energy/services/form/';
        } else {
          window.location.href = '/en-us/energy/services/submitted/';
        }
      } else {
        window.location.href = '/en-us/energy/services/form/';
      }
    } else {
      document.cookie = 'customer=true;path=/';
      if (darkMode) {
        window.location.href = '/en-us/energy/services/form/';
      } else {
        window.location.href = '/en-us/energy/services/submitted/';
      }
    }
  }

  export {resultTickInput1, resultTickInput2, resultTickInput3, resultsSubmitService, callEvent};
import $ from "jquery";
import "slick-carousel";
import "whatwg-fetch";
import estDateMode from "./local-functions/hsesEnergyServices/dateToEst";
import darkModeToggle from "./local-functions/hsesEnergyServices/darkModeToggle";
import { energyOnFirstNameFocusOut, energyOnLastNameFocusOut, energyOnEmailIdFocusOut, energyOnPhoneFocusOut, energyOnZipFocusOut } from "./local-functions/hsesEnergyServices/energyFormValidations";
import { energyZipCheck, energyZipInput } from "./local-functions/hsesEnergyServices/searchPage";
import { resultTickInput1, resultTickInput2, resultTickInput3, resultsSubmitService, callEvent } from "./local-functions/hsesEnergyServices/resultsPage";
import { formPageDarkModeToggle, formPageSubmit } from "./local-functions/hsesEnergyServices/formPage";
import submittedPageBlockToggle from "./local-functions/hsesEnergyServices/submittedPage";
window.jQuery = $;
window.$ = $;

/*
  initializeSlickSlider : Function used to initialize slick slider
  sliderHolder : Object - DOM object for listing
  showDots: Object - Shows slider dots/indicator
  mobileSlide: Show slides based on particular breakpoints
*/

const initializeSlickSlider = (sliderHolder, showDots, showMobileArrows, slideToShow, mobileSlide, slideWidth) => {
  sliderHolder.slick({
    dots: showDots,
    infinite: false,
    speed: 300,
    slidesToShow: slideToShow,
    slidesToScroll: 1,
    variableWidth: slideWidth,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          arrows: showMobileArrows,
          slidesToShow: mobileSlide,
          slidesToScroll: 1,
        },
      },
    ],
  });
};


/*
  onHamburgerMenuClick : Function triggered on Hamburger Menu item click
*/
const onHamburgerMenuClick = (event) => {
  /* To set menu's height & top position calculate header height */
  let headerHeight = $('.header').outerHeight();
  let menuHeight = 'calc(100% - ' + headerHeight + 'px)';
  $('.nav-mobile .sidenav, .nav-mobile #overlay').css({
    'top': headerHeight,
    'height': menuHeight
  });
  $('.landing-container .nav-mobile .sidenav,.landing-container .nav-mobile #overlay').css({
    'height': "auto"
  });

  $('.menu-item.menu-item-zip .component').removeClass('active');
  $('.menu-item.menu-item-cart .component').removeClass('active');
  $("#header-home .menu-item-cart .header-popup .cart-container").hide();
  $("#header-home .menu-item-zip .header-zip-popup").hide();
  $('#mySidenav').toggleClass('show-sidenav');
  $('body').toggleClass('scroll-disable');
  $('#overlay').toggle();
};

/*
  closeHamburgerMenu : Function triggered to close hamburger menu
*/
const closeHamburgerMenu = (event) => {
  $('#mySidenav').removeClass('show-sidenav');
  $('body').removeClass('scroll-disable');
  $('#overlay').hide();
};

/*
  onAccordionClick : Function used to manage accordion behaviour on careers page.
*/
const onAccordionClick = (e) => {
  let $this = $(e.currentTarget);
  $this.next().slideToggle();
  $this.toggleClass("rotate-arrow");
}


$(window).on("scroll", () => {
  const desktopHeader = $('#header-home');
  // back to top
  if ($(window).scrollTop() < desktopHeader.height()) {
    $('.back-to-top').removeClass("displayFlex");
  } else {
    $('.back-to-top').addClass("displayFlex");
  }
});

/*
  onBackToTop : Function used on back to top click
*/
const onBackToTop = () => {
  $("html, body").animate({ scrollTop: 0 }, 200);
  return false;
}

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
  getCookie: Function used to fetch cookie
  cname : name of a cookie
*/
export const getCookie = (cname) => {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

/*
  document.ready: Shorthand property used
*/
$(() => {
  /*
    onClick Event
  */
  $(".hamburger-menu").on("click", onHamburgerMenuClick);
  $(".hvac-faqs .faq-question").on("click", onAccordionClick);
  $('.back-to-top').on('click', onBackToTop);

  //hses energy services validations
  $("#energy-first-name").on("focusout", energyOnFirstNameFocusOut);
  $("#energy-last-name").on("focusout", energyOnLastNameFocusOut);
  $("#energy-email").on("focusout", energyOnEmailIdFocusOut);
  $("#energy-phone").on("focusout", energyOnPhoneFocusOut);
  $("#energy-zip-code").on("focusout", energyOnZipFocusOut);


  //Populate zip input
  const zip_populate = () => {
    let params = getUrlParams();
    if (params['zip'] != undefined) {
      let zipcode = params['zip'];
      $('#wrapout-zipcode').val(zipcode);
    } else if (getEnergyCookie('zipcode') != undefined) {
      let zipcode_val = getEnergyCookie('zipcode');
      $('#wrapout-zipcode').val(zipcode_val);
    } else {
      let zipcode = "";
      $('#wrapout-zipcode').val(zipcode);
    }
  }

  //HSES identify city pages
  if ($('.service-page').length > 0) {
    if (localStorage.getItem("phone")) {
      localStorage.removeItem("phone");
    }
    let phoneNo = $('#phone-value').val();
    localStorage.setItem("phone", phoneNo);
  }

  // Energy Search page zip input event
  if ($('.services-search-content').length > 0) {
    if (localStorage.getItem("phone")) {
      localStorage.removeItem("phone");
    }
    $('body').removeClass('dark');
    $('.energy-services-container').removeClass('dark-mode');
    $('.energy-services-footer').removeClass('dark-mode');
    zip_populate();
    $('.energy-zip').on('input', energyZipCheck);
    $('.energy-zip-btn').on('click', energyZipInput);
  }

  //Energy results page checkbox tick event
  if ($('.services-results-content').length > 0 || $('.services-direct-call-content').length > 0) {
    $('body').removeClass('dark');
    $('.energy-services-container').removeClass('dark-mode');
    $('.energy-services-footer').removeClass('dark-mode');
    $('.services-results-content').show();
    zip_populate();
    $('#option-1').on('click', resultTickInput1);
    $('#option-2').on('click', resultTickInput2);
    $('#option-3').on('click', resultTickInput3);

    $('.btn-results-continue').on('click', resultsSubmitService);

    $('.btn-energy-cta').on('click', callEvent);
  }

  //Energy form page
  if ($('.services-form-content').length > 0) {
    if (window.location.href.indexOf("uathomeserve") > -1) {
      $("input[type='hidden'][name='retURL']").val('https://www.uathomeserve.com/en-us/energy/services/submitted/');
    } else if (window.location.href.indexOf("reghomeserve") > -1) {
      $("input[type='hidden'][name='retURL']").val('https://www.reghomeserve.com/en-us/energy/services/submitted/');
    }
    darkModeToggle();
    zip_populate();
    formPageDarkModeToggle();
    $('.energy-services-footer').css('position', 'unset');
    let zipCodeVal = getEnergyCookie('zipcode');

    if (zipCodeVal && zipCodeVal !== "undefined") {
      $('#energy-zip-code').val(zipCodeVal);
      $("#energy-zip-code").attr('readonly', 'readonly');
    } else {
      $("#energy-zip-code").removeAttr('readonly');
    }

    $('.btn-submit').on('click', formPageSubmit);
  }

  //Energy submitted page
  if ($('.services-submitted-content').length > 0) {
    darkModeToggle();
    submittedPageBlockToggle();
    zip_populate();
  }
});

/*
  window on load event
*/
$(window).on("load", (e) => {

  $('.header-announcement, .close-menu').on('click', closeHamburgerMenu);
  
  setTimeout(() => {
    /*
        Initializing Slick
    */
    initializeSlickSlider($('.hvac-customer-review ul'), true, false, 2, 1, false);
    initializeSlickSlider($('.why-choose-homeserve ul'), true, false, 2, 1, true);
  }, 2500);

  getGeoDetails();
});

/*
  Function to fetch geoDetails Eg. Country, City, Pincode and IP
*/
const GEOLOCATION_KEY = 'AIzaSyBdnk37CjZp57OslQ_UZH9m5gjfYm7QWPA';
const GEOCODING_KEY = 'AIzaSyDbjIZwTH0ZaRFIyHQuJG7OwAsGU0_HvJo';
let geoDetailsCounter = 0;

const getGeoDetails = async () => {
  try {
    const geoDetailsFromSS = sessionStorage.getItem('geoDetails');
    if (geoDetailsFromSS) {
      showGeoDetails();
    } else { 
      let data = [];

        const getCoordinatesUrl = `https://www.googleapis.com/geolocation/v1/geolocate?key=${GEOLOCATION_KEY}`;
        const coordinatesRes = await fetch(getCoordinatesUrl, { method: "POST" });
        if (coordinatesRes.status === 200) {
          const coordinatesVal = await coordinatesRes.json();
          if (coordinatesVal.location) {
            const { lat, lng } = coordinatesVal.location;
            let latlng = `${lat},${lng}`;

            const getCountryUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${GEOCODING_KEY}&latlng=${latlng}`;
            const countryRes = await fetch(getCountryUrl);
            const countryVal = await countryRes.json();

            if (countryVal.status === 'OK') {
              const addressComponents = countryVal.results[0].address_components;
              let city, zipcode, country, state, county;

              addressComponents.forEach((item) => {
                if (item.types[0] === 'postal_code') {
                  zipcode = item.long_name ? item.long_name : item.short_name;
                } else if (item.types[0] === 'country') {
                  country = item.short_name ? item.short_name : item.long_name;
                } else if (item.types[0] === 'locality') {
                  city = item.short_name ? item.short_name : item.long_name;
                } else if (item.types[0] === 'administrative_area_level_1') {
                  state = item.short_name ? item.short_name : item.long_name;
                } else if (item.types[0] === 'administrative_area_level_2') {
                  county = item.short_name ? item.short_name : item.long_name;
                }
              });

              const address = `${city ? city + ', ' : ''}${county ? county + ', ' : ''}${state ? state + ', ' : ''}${country}`;
              data.push(address);
              data.push(zipcode);                 
            }
          }
        }

        const resIP = await fetch('https://api.ipify.org/?format=json');
        const ipData = await resIP.json();
        data.push(ipData.ip);

        sessionStorage.setItem('geoDetails', JSON.stringify(data));
        showGeoDetails();
    }
  } catch(e) {
    console.error('Unable to Fetch Location. Maybe the Location API failed.');
  }
}

/*
  Function to show the first geoDetails
*/
const showGeoDetails = () => {
  let geoDetails = JSON.parse(sessionStorage.getItem("geoDetails"));
  let geo_details = geoDetails[0].split(',');
  let geo_county = geo_details[1].trim();
  geo_county = geo_county.replace(/\s+/g, '-').toLowerCase();

  let county_list = `${process.env.COUNTY_LIST}`;
  let counties = county_list.split(',');

  if (jQuery.inArray(geo_county, counties) !== -1)
    $('.urgent-service-tile').addClass('show-tile');

  $(".geo-location").html(geoDetails[0]);
  geoDetailsCounter += 1;
  $(".geo-location").on('click', changeGeoDetails);
}

/*
  Function to loop the geoDetails indefinitely
*/
const changeGeoDetails = () => {
  let geoDetails = JSON.parse(sessionStorage.getItem("geoDetails"));
  $(".geo-location").html(geoDetails[geoDetailsCounter]);
  geoDetailsCounter += 1;
  if (geoDetailsCounter >= geoDetails.length) {
    geoDetailsCounter = 0;
  }
}

/*
  Function to set phone number as per zipcode, county, state
*/
const phone_number_data = require('./zipcodes.json');
let zipListData = phone_number_data.map(({
  Zip
}) => Zip);

let params = getUrlParams();
let zipcode;
// get geo details from session storage
let geoData = JSON.parse(sessionStorage.getItem("geoDetails"));
let geoCounty;
let geoZip;
//split geo details for city,county,state
if (geoData && !geoData.includes(null)) {
  let geo_data = geoData[0].split(',');
  geoCounty = geo_data[1].trim();
  geoZip = geoData[1];

  if (params['zip'] != undefined) {
    zipcode = params['zip'];
  } else if (getEnergyCookie('zipcode').length > 0) {
    zipcode = getEnergyCookie('zipcode');
  } else if (geoZip) {
    zipcode = geoZip;
  } else {
    zipcode = "";
  }
} else {
  zipcode = "";
}

const setPhoneNo = (data) => {
  let phoneNumber;
  if (typeof data == 'object') {
    phoneNumber = `1-${data[0].Number}`;
  } else {
    phoneNumber = data;
  }

  if ($('.energy-services-container').length > 0) {

    $('.menu-item-phone .link').attr('href', `tel:${phoneNumber}`);
    $('.mobile-device-phone .header-phone-popup').attr('href', `tel:${phoneNumber}`);
    $('.menu-item-phone .tel').text(phoneNumber);

    if ($('.services-submitted-content').length > 0) {
      $('.btn-submitted-group .btn-call').attr('title', phoneNumber);
      $('.btn-submitted-group .btn-call').attr('href', `tel:${phoneNumber}`);
    } else if ($('.services-form-content').length > 0 && $('.form-call').length > 0) {
      if ($('.form-subtitle-day .form-call').text() == 'Call') {
        $('.form-subtitle-day .form-call').text(`Call ${phoneNumber}`);
        $('.form-subtitle-day .form-call').attr('title', phoneNumber);
        $('.form-subtitle-day .form-call').attr('href', `tel:${phoneNumber}`);
      }
    }

  }
}

// assign zipcode according scenarios
if (zipListData.includes(zipcode) && !localStorage.getItem("phone")) {
  //Filter out the data which match zipcode and county
  let data_filter = phone_number_data.filter(e => e.Zip == zipcode && geoCounty.includes(e.County));

  //input phone number to top header and call cta
  if (data_filter && data_filter.length > 0 && $('.energy-services-container').length > 0) {
    setPhoneNo(data_filter);
  } else if (data_filter && data_filter.length == 0 && $('.energy-services-container').length > 0) {
    let data_filter_zip = phone_number_data.filter(e => e.Zip == zipcode);
    setPhoneNo(data_filter_zip);
  }
} else if (localStorage.getItem("phone")) {
  setPhoneNo(localStorage.getItem("phone"));
}

//worryfree pages hamburger functionality

const worryFreeHamburgerClick = (event) => {
  let mobilepopup = $(".worryfree-mobile-popup");
  let worryfreebody = $("body");
  mobilepopup.addClass("show");
  worryfreebody.addClass("noscroll");
}

const removeworryfreemenus = (event) => {
  let mobilepopup = $(".worryfree-mobile-popup");
  let worryfreebody = $("body");
  mobilepopup.removeClass("show");
  worryfreebody.removeClass("noscroll");
}

$(".worryfree-hamburger-menu").on("click",worryFreeHamburgerClick);
$(".worryfree-close-button").on("click",removeworryfreemenus);
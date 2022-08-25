const zipcode_data = require('../../zipcodes.json');
let zipList = zipcode_data.map(({
  Zip
}) => Zip);
/*
energyZipCheck : Function call to show tick icon when the zip code area is available
*/
const energyZipCheck = (e) => {
    let zipInput = $(e.currentTarget).val();
    if (zipList.includes(zipInput)) {
      $(e.currentTarget).parent().find('.zip-error.top-error').hide();
      $(e.currentTarget).removeClass('error');
      $(e.currentTarget).parent().find('.tick-icon').show();
    } else {
      $(e.currentTarget).parent().find('.tick-icon').hide();
    }
  }

 /*
  energyZipInput : Function call on zip input at search page for services
*/
const energyZipInput = (e) => {
  let zipInputVal = $(e.currentTarget).parent().find('.energy-zip');
  let zipCode = zipInputVal.val();

  let numbers = /\b\d{5}\b/g;
  if (zipCode == "" || !zipCode.match(numbers)) {
    $(e.currentTarget).parent().find('.zip-error.top-error').show().css('display', 'block');
    $(zipInputVal).addClass('error');
  } else {
    if (zipList.includes(zipCode)) {
      $(e.currentTarget).parent().find('.zip-error.top-error').hide();
      $(zipInputVal).removeClass('error');
      window.location.href = `/en-us/energy/services/results/?zip=${zipCode}`;
    } else {
      $('.services-search-content').hide()
      $('.search-error-content').show()
    }
  }
}

export { energyZipCheck, energyZipInput }
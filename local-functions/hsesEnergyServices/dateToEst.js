/*
Function to set dark mode according to EST timezone
*/
let isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
let darkMode;
const estDateMode = () => {
    let date = new Date();
    let estDate;
    if(isIE11) {
        estToday = date;
    } else {
        estDate = date.toLocaleString('en-US', { timeZone: 'America/New_York' });
    }
    let estToday = new Date(estDate);
    let hours = estToday.getHours();
    let day = estToday.getDay();
    if ((hours < 9 || hours >= 21) && day < 7) {
        darkMode = true;
    } else if((hours < 9 || hours >= 16) && day == 6) {
        darkMode = true;
    } else {
        darkMode = false;
    }
    return darkMode;
  }

  export default estDateMode;
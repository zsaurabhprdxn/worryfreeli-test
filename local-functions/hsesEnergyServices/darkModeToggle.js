import estDateMode from "./dateToEst";
let darkMode = estDateMode();

/*
Function to apply class according darkMode
*/
const darkModeToggle = () => {
    if (darkMode) {
      $('body').addClass('dark');
      $('.energy-services-container').addClass('dark-mode');
      $('.energy-services-footer').addClass('dark-mode');
    } else {
      $('body').removeClass('dark');
      $('.energy-services-container').removeClass('dark-mode');
      $('.energy-services-footer').removeClass('dark-mode');
    }
  }

  export default darkModeToggle;
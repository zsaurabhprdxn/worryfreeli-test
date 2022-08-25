const pluginSvgSprite = require("eleventy-plugin-svg-sprite");
const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");
const markdownItContainer = require("markdown-it-container");

module.exports = function (config) {
  require("dotenv").config();

  const energyServicesForm = JSON.parse(process.env.ENERGY_SERVICES_WTL);

  config.setLiquidOptions({
    dynamicPartials: false,
    strictFilters: false,
  });

  // Watch our compiled assets for changes
  config.addWatchTarget("./compiled-assets/main.js");
  config.addWatchTarget("./compiled-assets/vendor.js");
  // Copy /compiled-assets to /assets
  config.addPassthroughCopy({ "compiled-assets": "en-us/assets" });

  // Folders to copy to output folder
  config.addPassthroughCopy("en-us/css");
  config.addPassthroughCopy("en-us/assets");
  config.addPassthroughCopy("_redirects");
  config.addPassthroughCopy("404.html");

  // Configure sprite plugin start
  config.addPlugin(pluginSvgSprite, {
    path: "./_includes/svgs",
    svgSpriteShortcode: "svgsprite",
  });

  config.addShortcode("svgs", (name, width, height, viewBox, fill) => {
    if (!name) return "";

    return `<svg class="svg-${name}" role="img" aria-hidden="true" width="${
      width ? width : "auto"
    }" height="${height ? height : "auto"}" viewBox="${
      viewBox ? viewBox.x : 0
    } ${viewBox ? viewBox.y : 0} ${width ? width : "auto"} ${
      height ? height : "auto"
    }">
                  <use xlink:href="#svg-${name}" fill="${
      fill ? fill : "auto"
    }"></use>
                </svg>`;
  });

  //HSES form
  config.addShortcode("energyServicesForm", function () {
    return `
    <script src="https://www.google.com/recaptcha/api.js"></script>
    <script>
    function timestamp() { var response = document.getElementById("g-recaptcha-response"); if (response == null || response.value.trim() == "") {var elems = JSON.parse(document.getElementsByName("captcha_settings")[0].value);elems["ts"] = JSON.stringify(new Date().getTime());document.getElementsByName("captcha_settings")[0].value = JSON.stringify(elems); } } setInterval(timestamp, 500); 
    </script>
    <form action="${energyServicesForm.actionUrl}" id="energy_services_form" method="POST">
    <input type=hidden name='captcha_settings' value='{"keyname":"HomeServe","fallback":"true","orgId":"${energyServicesForm.oid}","ts":""}'>
    <input type=hidden name="oid" value="${energyServicesForm.oid}">
    <input type=hidden name="retURL" value="${process.env.ROOT_URL}/en-us/energy/services/submitted/">

    <!--  ----------------------------------------------------------------------  -->
    <!--  NOTE: These fields are optional debugging elements. Please uncomment    -->
    <!--  these lines if you wish to test in debug mode.                          -->
    <!--  <input type="hidden" name="debug" value=1>                              -->
    <!--  <input type="hidden" name="debugEmail"                                  -->
    <!--  value="meg.noah@homeserveusa.com">                                      -->
    <!--  ----------------------------------------------------------------------  -->

    <div class="form-group">
        <label for="first_name" class="form-label">First Name</label>
        <input type="text" class="form-control" name="first_name" id="energy-first-name" >
        <div id="first-name-validation" class="invalid-feedback">
        Please enter valid first name.
        </div>
    </div>
    <div class="form-group">
        <label for="last_name" class="form-label">Last Name</label>
        <input type="text" class="form-control" name="last_name" id="energy-last-name" >
        <div id="last-name-validation" class="invalid-feedback">
        Please enter valid last name.
        </div>
    </div>
    <div class="form-group">
        <label for="zip" class="form-label">ZIP Code</label>
        <input type="text" inputmode="decimal" pattern="[0-9]*" maxlength="5" class="form-control" name="zip" id="energy-zip-code">
        <div id="zip-validation" class="invalid-feedback">
        Please enter 5 digit zip code.
        </div>
    </div>
    <div class="form-group">
        <label for="phone" class="form-label">Phone Number</label>
        <input type="tel" class="form-control" name="phone" maxlength="14" size="20" id="energy-phone" >
        <div id="phone-validation" class="invalid-feedback">
        Please enter valid phone number.
        </div>
    </div>
    <div class="form-group">
        <label for="email" class="form-label">Email Address</label>
        <input type="email" class="form-control" id="energy-email" name="email">
        <div id="email-validation" class="invalid-feedback">
        Please enter valid email address.
        </div>
    </div>
    <div class="form-group">
        <p class="consent-text">By clicking SUBMIT, I am providing my electronic signature and authorize HomeServe USA to contact me using an automatic telephone dialing system at the number provided above. I understand that I am not required to provide this authorization as a condition of purchase.</p>
    </div>
    <div class="form-group d-none">
        <label for="lead_source">Lead Source</label>
        <select id="lead_source" name="lead_source">
        <option value="">--None--</option>
        <option value="Advertisement">Advertisement</option>
        <option value="BRE Response Outbound Call">BRE Response Outbound Call</option>
        <option value="Condemn">Condemn</option>
        <option value="Customer Event">Customer Event</option>
        <option value="Employee Referral">Employee Referral</option>
        <option value="Google AdWords">Google AdWords</option>
        <option value="Other">Other</option>
        <option value="Partner">Partner</option>
        <option value="Purchased List">Purchased List</option>
        <option value="Tech Referral">Tech Referral</option>
        <option value="Webinar">Webinar</option>
        <option value="Website">Website</option>
        <option value="EV Install Pilot">EV Install Pilot</option>
        <option value="HSES On Demand" selected>HSES On Demand</option>
        </select>
        <label for="company">Company</label>
        <input id="company" maxlength="40" name="company" size="20" type="text"><br>
        <label>Consent to Contact:</label>
        <input id="${energyServicesForm.contact}" name="${energyServicesForm.contact}" type="checkbox" value="1" checked="">
        <label>Affiliate Source:</label>
        <input id="${energyServicesForm.source}" class="affiliate-source" maxlength="100" name="${energyServicesForm.source}" value="" size="20" type="text">
        <label>Affiliate Subsource:</label>
        <input id="${energyServicesForm.subsource}" class="affiliate-subsource" maxlength="100" name="${energyServicesForm.subsource}" value="" size="20" type="text">
        <label for="url">Website</label>
        <input id="url" maxlength="80" name="url" size="20" type="text">
    </div>
    <div class="form-group overflow">
        <!-- homeserve recaptcha starts -->
        <div class="g-recaptcha" data-sitekey="6LfelmQaAAAAAHnlDno5Bjaa_HY9leLrcgszYzxs"></div>
        <span class="invalid-feedback"></span><br>
        <!-- homeserve recaptcha ends -->
    </div>

    <div class="form-button-group">
        <input type="submit" name="submit" class="btn-submit" value="Submit">      
    </div>
    </form>
    `;
  });

  config.addPassthroughCopy("/en-us/assets/vendor/script/");

  let options = {
    html: true,
    breaks: true,
    linkify: true,
  };

  let markdownLib = markdownIt(options)
    .use(markdownItAttrs)
    .use(markdownItContainer, "wrapper");

  config.setLibrary("md", markdownLib);
};

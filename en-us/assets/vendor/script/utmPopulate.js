function parseGET(param) {
    var searchStr = document.location.search;
    try {
        var match = searchStr.match('[?&]' + param + '=([^&]+)');
        if (match) {
            var result = match[1];
            result = result.replace(/\+/g, '%20');
            result = decodeURIComponent(result);
            return result;
        } else {
            return '';
        }
    } catch (e) {
        return '';
    }
}
function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

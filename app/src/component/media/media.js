$(document).ready(function () {

    // Show/Hide subContent
    var hideShowButtons = document.getElementsByClassName('media--subTitle--hideShowButton');
    var hideContentMaxWidth = 900;

    [].forEach.call(hideShowButtons, function (button, index, array) {
        var remainingElement = button.parentElement.parentElement;
        var isHiddenClass = 'is-hidden';
        button.onclick = function () {
            if (remainingElement.classList.contains(isHiddenClass)) {
                remainingElement.classList.remove(isHiddenClass);
            } else {
                remainingElement.classList.add(isHiddenClass);
            }
        };

        if (window.innerWidth < hideContentMaxWidth) {
            remainingElement.classList.add(isHiddenClass);
        }
    });
});

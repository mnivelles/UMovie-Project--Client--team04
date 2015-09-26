function showElementWithId(id) {
    var isHiddenClass = 'hide'; // Provient de Materialize
    var element = document.getElementById(id);
    element.classList.remove(isHiddenClass);
}

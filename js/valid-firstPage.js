const form = $('.form');
form[0].addEventListener('input', updateValue);
form[1].addEventListener('input', updateValue);
function updateValue(e) {
    $('[name="' + e.target.name + '"]').val(e.target.value);
}

function toggleClearButton() {
    var inputElement = document.getElementById('user');
    var clearButton = document.querySelector('.clear-button');

    if (inputElement.value.trim() !== '') {
        clearButton.style.display = 'block';
    } else {
        clearButton.style.display = 'none';
    }
}

function clearInput() {
    document.getElementById('user').value = '';
    toggleClearButton();
}

function togglePasswordButton() {
    var passwordInput = document.getElementById('pass');
    var toggleButton = document.querySelector('.toggle-password');

    if (passwordInput.value.trim() !== '') {
        toggleButton.style.display = 'inline-block';
    } else {
        toggleButton.style.display = 'none';
    }
}

function togglePasswordVisibility() {
    var passwordInput = document.getElementById('pass');
    var toggleButton = document.querySelector('.toggle-password');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
}

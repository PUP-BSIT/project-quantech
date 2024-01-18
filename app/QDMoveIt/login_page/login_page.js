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
    var toggleButton = document.getElementById('togglePassword');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        passwordInput.type = 'password';
        toggleButton.innerHTML = '<i class="fas fa-eye"></i>';
    }
}

function performLogin() {
    var username = document.getElementById('user').value;
    var password = document.getElementById('pass').value;
    var apiUrl = 'https://cybertechlogistic.online/app/controller/' +
    'controller_rider_login_api.php';

    var xhr = new XMLHttpRequest();

    var formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    xhr.open('POST', apiUrl, true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            console.log(response);
            if (response.status === 'success') {
                console.log('Login successful for user: ' + response.username);
                localStorage.setItem('partner_id', response.partner_id);
                window.location.href = '../delivery_list/';
            } else {
                console.log("Error Login: " + response.message);
            }
        } else {
            console.log("Error Login");
        }
    };

    xhr.send(formData);
}

document.getElementById('loginButton').addEventListener('click', performLogin);

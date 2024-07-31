document.getElementById('pass').addEventListener('input', function() {
    const password = this.value;
    const strength = checkPasswordStrength(password);
    updateSlider(strength);
    updateRequirements(password);
});

function checkPasswordStrength(password) {
    let strength = 0;

    // Length check
    if (password.length >= 8) strength += 1;

    // Lowercase letter check
    if (/[a-z]/.test(password)) strength += 1;

    // Uppercase letter check
    if (/[A-Z]/.test(password)) strength += 1;

    // Number check
    if (/[0-9]/.test(password)) strength += 1;

    // Special character check
    if (/[^a-zA-Z0-9]/.test(password)) strength += 1;

    return strength;
}

function updateSlider(strength) {
    const sliderBar = document.getElementById('slider-bar');
    const meter = document.querySelector('.meter');
    
    if (strength < 1) {
        meter.style.visibility = 'hidden';
    } else {
        meter.style.visibility = 'visible';
    }

    const percentage = (strength / 5) * 100;
    sliderBar.style.width = percentage + '%';

    if (strength <= 2) {
        sliderBar.style.background = 'aqua';
    } else if (strength <= 4) {
        sliderBar.style.background = 'yellow';
    } else {
        sliderBar.style.background = 'red';
    }
}

function updateRequirements(password) {
    const lower = document.getElementById('req-lower');
    const upper = document.getElementById('req-upper');
    const length = document.getElementById('req-length');
    const special = document.getElementById('req-special');

    const checkLower = document.getElementById('check-lower');
    const checkUpper = document.getElementById('check-upper');
    const checkLength = document.getElementById('check-length');
    const checkSpecial = document.getElementById('check-special');

    if (/[a-z]/.test(password)) {
        lower.className = 'valid';
        checkLower.textContent = '✓';
    } else {
        lower.className = 'invalid';
        checkLower.textContent = '✗';
    }

    if (/[A-Z]/.test(password)) {
        upper.className = 'valid';
        checkUpper.textContent = '✓';
    } else {
        upper.className = 'invalid';
        checkUpper.textContent = '✗';
    }

    if (password.length >= 8) {
        length.className = 'valid';
        checkLength.textContent = '✓';
    } else {
        length.className = 'invalid';
        checkLength.textContent = '✗';
    }

    if (/[^a-zA-Z0-9]/.test(password)) {
        special.className = 'valid';
        checkSpecial.textContent = '✓';
    } else {
        special.className = 'invalid';
        checkSpecial.textContent = '✗';
    }
}

function changeImg() {
    let pass = document.getElementById('pass');
    let img = document.getElementById('img');
    
    if (pass.type === 'password') {
        pass.type = 'text';
        img.src = '/passwordStrength/unhide.png'; 
    } else {
        pass.type = 'password';
        img.src = '/passwordStrength/hide.png'; 
    }
}

var userDataElement = document.getElementById('user-data');
var userEmail = userDataElement.getAttribute('data-user-email');
var enteredOTP;

document.getElementById('otp-button').addEventListener('click', async () => {
    
    console.log('email', userEmail);
    
    const response = await fetch('/otp/send-otp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userEmail })
    });

    const result = await response.json();
    if (result.success) {
        alert('OTP has been sent to your email.');
    } else {
        alert(result.message);
    }
});

function focusNextInput(currentInput) {
    const maxLength = parseInt(currentInput.getAttribute('maxlength'));
    const currentLength = currentInput.value.length;
    
    if (currentLength === maxLength) {
      const nextInput = currentInput.nextElementSibling;
      if (nextInput) {
        nextInput.focus();
      }
    }
    
    const otpInputs = document.querySelectorAll('.otp-input');
    let otpValue = '';
    
    otpInputs.forEach(input => {
      otpValue += input.value;
    });
    enteredOTP = otpValue;    
    
  }
document.getElementById('verify-otp-button').addEventListener('click', async () => {
    console.log('enteredOTP', enteredOTP);
    const response = await fetch('/otp/verify-otp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ enteredOTP })
    });

    const result = await response.json();
    alert(result.message);
});
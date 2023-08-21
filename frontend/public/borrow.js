var userDataElement = document.getElementById('user-data');
var userEmail = userDataElement.getAttribute('data-user-email');
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
        alert('Error sending OTP. Please try again later.');
    }
});
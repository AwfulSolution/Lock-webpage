// script.js
document.getElementById('submitButton').addEventListener('click', () => {
  const correctCode = '1234'; // Set your secret code here
  const inputCode = document.getElementById('codeInput').value;
  const lock = document.getElementById('lock');
  const message = document.getElementById('message');
  const successSound = document.getElementById('successSound');
  const failSound = document.getElementById('failSound');

  if (inputCode === correctCode) {
    lock.classList.remove('closed');
    lock.classList.add('open');
    lock.textContent = '🔓'; // Open lock emoji
    message.textContent = 'Success! The lock is open!';
    message.style.color = 'green';
    successSound.play(); // Play success sound
  } else {
    lock.classList.remove('open');
    lock.classList.add('closed');
    lock.textContent = '🔒'; // Closed lock emoji
    message.textContent = 'Wrong code. Please try again.';
    message.style.color = 'red';
    failSound.play(); // Play fail sound
  }
});

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

async function submitForm() {
  const name = document.getElementById("nameInput").value.trim();
  const code = document.getElementById("codeInput").value.trim();
  const serverUrl = "https://your-site.netlify.app/.netlify/functions/saveName"; // Replace with your Netlify function URL

  // Validate name input
  if (!name) {
    document.getElementById("message").textContent = "Please enter your name.";
    return;
  }

  // Send name and code to the server
  try {
    const response = await fetch(serverUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, code }),
    });

    const result = await response.json();

    // Update the UI based on the server's response
    const message = document.getElementById("message");
    const lock = document.querySelector(".lock");

    if (result.success) {
      message.textContent = `Welcome, ${name}! The lock is open.`;
      lock.classList.remove("closed");
      lock.classList.add("open");
    } else {
      message.textContent = `Sorry, ${name}. Incorrect code.`;
      lock.classList.remove("open");
      lock.classList.add("closed");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    document.getElementById("message").textContent = "An error occurred. Please try again later.";
  }
}

const serverUrl = "https://lock-backend.netlify.app/.netlify/functions/saveName";

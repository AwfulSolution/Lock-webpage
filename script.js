async function submitForm() {
  const name = document.getElementById("nameInput").value.trim();
  const code = document.getElementById("codeInput").value.trim();
  const serverUrl = "/.netlify/functions/saveName"; // Backend URL

  const message = document.getElementById("message");
  const lock = document.getElementById("lock");
  const successSound = document.getElementById("successSound");
  const failSound = document.getElementById("failSound");

  // Validate inputs
  if (!name) {
    message.textContent = "Please enter your name.";
    return;
  }

  if (!code) {
    message.textContent = "Please enter the code.";
    return;
  }

  try {
    // Send data to the backend
    const response = await fetch(serverUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, code }),
    });

    const result = await response.json();

    // Update UI based on response
    if (result.success) {
      message.textContent = `Welcome, ${name}! The lock is open.`;
      lock.textContent = "🔓"; // Unlock the lock
      lock.classList.remove("closed");
      lock.classList.add("open");
      successSound.play(); // Play success sound
    } else {
      message.textContent = `Sorry, ${name}. Incorrect code.`;
      lock.textContent = "🔒"; // Keep the lock closed
      lock.classList.remove("open");
      lock.classList.add("closed");
      failSound.play(); // Play fail sound
    }
  } catch (error) {
    console.error("Error:", error);
    message.textContent = "An error occurred. Please try again.";
  }
}

// Define the correct password
const correctPassword = "futurestars";  // You can change this to any password you want

// Get the HTML elements
const codeInput = document.getElementById("codeInput");
const submitButton = document.getElementById("submitButton");
const lock = document.getElementById("lock");
const message = document.getElementById("message");

// Listen for the click event on the "Unlock" button
submitButton.addEventListener("click", () => {
  const enteredCode = codeInput.value;  // Get the code entered by the user

  if (enteredCode === correctPassword) {
    // If the entered code matches the correct password
    lock.textContent = "🔓";  // Unlock the lock (open the lock image)
    message.textContent = "Congratulations! You unlocked the lock.";
    message.style.color = "green";
    document.getElementById("successSound").play();  // Play success sound
  } else {
    // If the entered code is incorrect
    message.textContent = "Wrong code. Try again.";
    message.style.color = "red";
    document.getElementById("failSound").play();  // Play fail sound
  }
});

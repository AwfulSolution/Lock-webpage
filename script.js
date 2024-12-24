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

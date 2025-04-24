document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault(); // Prevent form from submitting normally

  // Get form data
  const formData = new FormData(e.target);

  // Append the hidden "action" field to the FormData object
  formData.append('action', 'add');  // Add "action" field with value 'add'

  // Convert FormData to a JSON object
  const data = Object.fromEntries(formData.entries());  // Convert form data to JSON object

  // Send data to the backend API
  const res = await fetch('https://api.rantk.com/', { // Use your API URL here
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)  // Convert form data to JSON
  });

  const result = await res.json();
  const responseMessageElement = document.getElementById('responseMessage');

  if (res.ok) {
    responseMessageElement.textContent = 'Message sent successfully!';
    responseMessageElement.style.color = 'green';
  } else {
    responseMessageElement.textContent = 'Error: ' + result.error;
    responseMessageElement.style.color = 'red';
  }
});

document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault(); // Prevent form from submitting normally

  // Get form data
  const formData = new FormData(e.target);

  // Append the hidden "action" field to the FormData object
  formData.append('action', 'login');  // Add "action" field with value 'add'

  // Convert FormData to a JSON object
  const data = Object.fromEntries(formData.entries());  // Convert form data to JSON object

  // Send data to the backend API
  const res = await fetch('https://api.rantk.com/', { // Use your API URL here
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)  // Convert form data to JSON
  });

  const result = await res.json();
  let responseMessageElement = document.getElementById('responseMessageLogin');

  if (res.ok) {
    responseMessageElement.textContent = 'Logged in successfully!';
    responseMessageElement.style.color = 'green';
    setAuthCookie(result);
    location.reload();
  } else {
    responseMessageElement.textContent = 'Error: ' + result.error;
    responseMessageElement.style.color = 'red';
  }
});


document.getElementById('register-form').addEventListener('submit', async function (e) {
  e.preventDefault(); // Prevent form from submitting normally

  // Get form data
  const formData = new FormData(e.target);

  // Append the hidden "action" field to the FormData object
  formData.append('action', 'register');  // Add "action" field with value 'add'

  // Convert FormData to a JSON object
  const data = Object.fromEntries(formData.entries());  // Convert form data to JSON object

  // Send data to the backend API
  const res = await fetch('https://api.rantk.com/', { // Use your API URL here
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)  // Convert form data to JSON
  });

  const result = await res.json();
  const responseMessageElement = document.getElementById('responseMessageRegister');

  if (res.ok) {
    responseMessageElement.textContent = 'User registered successfully!';
    responseMessageElement.style.color = 'green';
  } else {
    responseMessageElement.textContent = 'Error: ' + result.error;
    responseMessageElement.style.color = 'red';
  }
});

function setAuthCookie(result) {
  // Convert the expiresAt to a Date object
  const token = result.token;
  const expiresAt = result.expires_at;
  const expiresDate = new Date(expiresAt);
  
  // Set the cookie with Secure, HttpOnly, SameSite flags (HttpOnly can't be set from JavaScript, so we'll leave it out)
  document.cookie = `auth_token=${token}; expires=${expiresDate.toUTCString()}; path=/; Secure; SameSite=Strict`;
}
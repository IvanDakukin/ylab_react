const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
const message = document.getElementById("message");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const showPassword = document.getElementById("showPassword");

function validateInput() {
  let inputIsValid = true;

  if (!emailField.value) {
    emailError.textContent = "Поле с email не может быть пустым";
    emailError.style.display = "block";
    inputIsValid = false;
  } else if (
    !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(emailField.value)
  ) {
    emailError.textContent = "Неправильный email";
    emailError.style.display = "block";
    inputIsValid = false;
  } else {
    emailError.textContent = "";
    emailError.style.display = "none";
  }

  if (!passwordField.value) {
    passwordError.textContent = "Поле с паролем не может быть пустым";
    passwordError.style.display = "block";
    inputIsValid = false;
  } else {
    passwordError.textContent = "";
    passwordError.style.display = "none";
  }

  return inputIsValid;
}

document
  .getElementById("authForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    message.style.visibility = "hidden";
    message.textContent = "";

    if (!validateInput()) {
      return;
    }

    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailField.value,
          password: passwordField.value,
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка аутентификации");	
      }

      message.style.visibility = "visible";
      message.style.color = "green";
      message.textContent = "Вход выполнен!";
    } catch (error) {
      message.style.visibility = "visible";
      message.style.color = "red";
      message.textContent = "Error: " + error.message;
    }
  });

showPassword.addEventListener("click", () => {
  if (showPassword.classList.contains("open")) {
    showPassword.classList.remove("open");
    passwordField.setAttribute("type", "password");
  } else {
    showPassword.classList.add("open");
    passwordField.setAttribute("type", "text");
  }
});

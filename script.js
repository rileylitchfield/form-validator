const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Functions

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Show input success message
function showSuccess(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is invalid");
  }
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be ${max} characters or less`
    );
  } else {
    showSuccess(input);
  }
}

// Check password
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
  }
}

// If one password has an error, apply 'error' class to both passwords
function passwordError() {
  if (password.parentElement.classList.contains("error")) {
    password2.parentElement.className = "form-control error";
    password2.value = "";
  }
}

// Get fieldname
function getFieldName(input) {
  if (input === username) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
  } else {
    return input.type.charAt(0).toUpperCase() + input.type.slice(1);
  }
}

// Check success for all fields
function checkSuccess(input1, input2, input3, input4) {
  if (
    input1.parentElement.classList.contains("error") ||
    input2.parentElement.classList.contains("error") ||
    input3.parentElement.classList.contains("error") ||
    input4.parentElement.classList.contains("error")
  ) {
    console.log("error");
  } else {
    window.location.href = "success.html";
  }
}

// Event listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 20);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
  checkSuccess(username, email, password, password2);
  passwordError();
});

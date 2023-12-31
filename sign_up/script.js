var passwordField = document.getElementById("password");
var passwordText = document.getElementById("password_text");

function passCheck(password) {
  let containsNumber = false;
  let containsCharacter = false;
  for (i = 0; i < password.length; i++) {
    if (!isNaN(password[i])) {
      containsNumber = true;
    }
    if (/^[a-zA-Z]$/.test(password[i])) {
      containsCharacter = true;
    }
  }
  console.log(containsNumber);
  console.log(containsCharacter);
  !containsNumber
    ? (passwordText.innerHTML = "Please make sure your password has a number.")
    : (passwordText.innerHTML =
        "Please make sure your password has a character.");
  return containsNumber && containsCharacter;
}

document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var formData = new FormData(this); // formData

    var nameInput = document.getElementById("name");
    var passwordInput = document.getElementById("password");
    var emailInput = document.getElementById("email");

    var login = false;
    var formEmpty = false;
    var noSpaceAlertGiven = false;
    var alreadyExist = true;
    var canSignUp = false;

    var error = false;

    console.log("Name Input: ", nameInput.value);
    console.log("Password Input: ", passwordInput.value);

    for (i = 0; i < nameInput.value.length; i++) {
      //Checking for spaces in username field
      if (nameInput.value[i] == " ") {
        if (noSpaceAlertGiven == false) {
          alert("no spaces allowed");
          noSpaceAlertGiven = true;
        }
        break;
      }
    }
    for (i = 0; i < emailInput.value.length; i++) {
      //Checking for spaces in email field
      if (emailInput.value[i] == " ") {
        if (noSpaceAlertGiven == false) {
          alert("no spaces allowed");
          noSpaceAlertGiven = true;
        }
        break;
      }
    }
    for (i = 0; i < passwordInput.value.length; i++) {
      //Checking for spaces in password field
      if (passwordInput.value[i] == " ") {
        if (noSpaceAlertGiven == false) {
          alert("Spaces are not allowed");
          noSpaceAlertGiven = true;
        }
        break;
      }
    }
    if (noSpaceAlertGiven == true) {
      //if there are spaces, reload the page
      location.reload();
    }

    if (
      //Check for empty form
      nameInput.value.trim() == "" ||
      passwordInput.value.trim() == "" ||
      emailInput.value.trim() == ""
    ) {
      alert("Please fill your credentials");
      login = false;
      formEmpty = true;
    } else {
      var credentials = {
        //save credentials
        username: nameInput.value,
        Password: passwordInput.value,
        email: emailInput.value,
      };
      console.log("Type of pass: ", typeof credentials.Password);

      fetch("http://localhost:3000/posts", { method: "GET" }) //Get all the accounts from the server
        .then((response) => response.json())
        .then((data) => {
          for (i = 0; i < data.length; i++) {
            if (
              data[i]["username"] == credentials.username ||
              data[i]["email"] == credentials.email
            ) {
              //Check for already existing usernames
              alert(
                "This username or email already exists. Please choose another username or another mail address."
              );
              alreadyExist = true;
              break;
            } else {
              alreadyExist = false;
            }
          }
          canSignUp = !alreadyExist && passCheck(credentials.Password);
          if (canSignUp == true) {
            fetch("http://localhost:3000/posts", {
              //posting user credentials to the server
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(credentials),
            }).catch((error) => {
              // Error handler
              console.error("Error:", error);
              error = true;
              alert(
                "Error Ocurred Please Try Again At a Later Time. Sorry for the inconvenience."
              );
            });
            if (error == false) {
              window.location.href = ".././Coffee_Website/index.html"; //Open the necessary website if there is no error
            }
          }
        })
        .catch((error) => {
          // Error handler
          console.error("Error: ", error.message);
          error = true;
          alert("Server Error Ocurred Please Try Again At a Later Time");
        });
    }
  });

let showElementFunc = function () {
  document.getElementById("password_text").style.display = "block";
};

let hideElementFunc = function () {
  document.getElementById("password_text").style.display = "none";
};

passwordField.addEventListener("mouseover", showElementFunc);
passwordField.addEventListener("mouseout", hideElementFunc);

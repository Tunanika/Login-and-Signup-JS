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
    var canSignUp = false;

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
                "This username or email already exists. Please choose another username or another mail adress."
              );
              canSignUp = false;
              break;
            } else {
              canSignUp = true;
            }
          }
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
            });
            alert("You have succesfully signed up!");
            window.location.href = "../Coffee_Website/index.html";
          }
        });
    }
    this.reset();
  });

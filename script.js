document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var formData = new FormData(this); // formData

    var rawJson;
    var nameInput = document.getElementById("name");
    var passwordInput = document.getElementById("password");
    var login = false;
    var formEmpty = false;

    console.log("Name Input: ", nameInput.value);
    console.log("Password Input: ", passwordInput.value);

    fetch("http://localhost:3000/posts", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (nameInput.value.trim() == "" || passwordInput.value.trim() == "") {
          alert("Please fill the form before submitting");
          console.log("Form Empty");
          login = false;
          formEmpty = true;
        } else {
          console.log("Raw data: ", data);
          for (i = 0; i < data.length; i++) {
            console.log("Checking Username: ", data[i]["username"]);
            console.log("Checking password: ", data[i]["Password"]);
            if (
              (data[i]["username"] == nameInput.value ||
                data[i]["email"] == nameInput.value) &&
              data[i]["Password"] == passwordInput.value
            ) {
              console.log("Login successful");
              alert("Login successful");
              login = true;
              window.location.href = "/Coffee_Website/index.html";
              break;
            }
          }
        }
        if (login == false && formEmpty != true) {
          console.log("Wrong username or password");
          alert("Wrong username or password! Try again.");
          console.log(data.length);
          rawJson = data; //Save data
        }
      })
      .catch((error) => {
        // Error handler
        console.error("Error:", error);
        alert("Internal error occured please try again later!!!");
      });

    console.log(nameInput.value);
    console.log(passwordInput.value);
  });

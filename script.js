{
    var togglePasswordVisibility = document.querySelector("#showPassword1");
    togglePasswordVisibility.addEventListener("click", function (e) {
        if (document.getElementById("inputPassword").getAttribute("type") === "password") {
            document.getElementById("inputPassword").setAttribute("type", "text");
        }
        else {
            document.getElementById("inputPassword").setAttribute("type", "password");
        }
    });
    var toggleConfirmPasswordVisibility = document.querySelector("#showPassword2");
    toggleConfirmPasswordVisibility.addEventListener("click", function (e) {
        if (document.getElementById("confirmPassword").getAttribute("type") === "password") {
            document.getElementById("confirmPassword").setAttribute("type", "text");
        }
        else {
            document.getElementById("confirmPassword").setAttribute("type", "password");
        }
    });
    var button = document.getElementById("submit");
    button.addEventListener("click", function (e) {
        e.preventDefault();
        var firstName = document.getElementById("firstName");
        var firstNameValue = firstName.value;
        var lastName = document.getElementById("lastName");
        var lastNameValue = lastName.value;
        var email = document.getElementById("email");
        var emailValue = email.value;
        var password = document.getElementById("inputPassword");
        var passwordValue = password.value;
        var confirmPassword = document.getElementById("confirmPassword");
        var confirmPasswordValue = confirmPassword.value;
        var newUser = {
            firstName: firstNameValue,
            lastName: lastNameValue,
            email: emailValue,
            password: passwordValue
        };
        if (firstNameValue === "" || lastNameValue === "" || passwordValue === "" || emailValue === "" || passwordValue !== confirmPasswordValue) {
            alert_danger_div_1.style.opacity = "1";
            alert_danger_div_1.setAttribute("class", "alert alert-danger");
            alert_danger_div_1.setAttribute("role", "alert");
            alert_danger_div_1.style.visibility = "visible";
            alert_danger_div_1.textContent = "Some fields are empty or passwords do not match";
            document.getElementById("header").appendChild(alert_danger_div_1);
            setTimeout(function () { alert_danger_div_1.style.visibility = "hidden"; }, 1500);
        }
        else {
            if (localStorage.getItem(newUser.email) === null) {
                window.localStorage.setItem(emailValue, JSON.stringify(newUser));
                firstName.value = "";
                lastName.value = "";
                password.value = "";
                email.value = "";
                confirmPassword.value = "";
            }
            else {
                alert_danger_div_1.style.opacity = "1";
                alert_danger_div_1.setAttribute("class", "alert alert-danger");
                alert_danger_div_1.setAttribute("role", "alert");
                alert_danger_div_1.style.visibility = "visible";
                alert_danger_div_1.textContent = "Account with email already exists";
                document.getElementById("header").appendChild(alert_danger_div_1);
                setTimeout(function () { alert_danger_div_1.style.visibility = "hidden"; }, 1500);
            }
        }
    });
    var confirmPassword_1 = document.getElementById("confirmPassword");
    var password_1 = document.getElementById("inputPassword");
    var alert_danger_div_1 = document.createElement("Div");
    var alert_success_div_1 = document.createElement("Div");
    confirmPassword_1.addEventListener("keyup", function () {
        if (confirmPassword_1.value !== password_1.value && password_1.value !== "") {
            alert_danger_div_1.style.opacity = "1";
            alert_danger_div_1.setAttribute("class", "alert alert-danger");
            alert_danger_div_1.setAttribute("role", "alert");
            alert_danger_div_1.style.visibility = "visible";
            alert_danger_div_1.textContent = "passwords do not match!";
            document.getElementById("header").appendChild(alert_danger_div_1);
            setTimeout(function () { alert_danger_div_1.style.visibility = "hidden"; }, 1500);
        }
        else {
            alert_danger_div_1.style.opacity = "0.1";
            if (confirmPassword_1.value === password_1.value && password_1.value !== "") {
                alert_success_div_1.setAttribute("class", "alert alert-success");
                alert_success_div_1.setAttribute("role", "alert");
                alert_success_div_1.style.visibility = "visible";
                alert_success_div_1.textContent = "passwords match!";
                document.getElementById("header").appendChild(alert_success_div_1);
                setTimeout(function () { alert_success_div_1.style.visibility = "hidden"; }, 1500);
            }
        }
    });
    var loginAnchor = document.querySelector("#login");
    loginAnchor.addEventListener("click", function (e) {
        var container = document.querySelector("#container");
        container.innerHTML = "";
        container.innerHTML += '<form><div id = "header"></div><div class="mb-3"><label for="exampleInputEmail1" class="form-label">Email address</label><input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"><div id="emailHelp" class="form-text">We\'ll never share your email with anyone else.</div></div><div class="row g-3" style="display: inline-flex; justify-content: center; align-items: center;"><div class="mb-3 col-11"><label for="exampleInputPassword1" class="form-label">Password</label><input type="password" class="form-control" id="exampleInputPassword1"></div>   <div class="col-1"><i class="fa fa-eye  rounded px-2 "data-toggle="tooltip" data-placement="bottom" title="show password"id="showPassword1" onclick="showPassword()"></i></div></div><div class = "mb-3"><button type="submit" class="btn btn-primary" id="submit" onclick="_login()">Login</button></div></form><div><span>Don\'t have an account? </span><a href="./index.html" id="register">Register</a></div>';
    });
    function _login() {
        console.log("login button clicked");
        var email = document.querySelector("#exampleInputEmail1");
        var emailValue = email.value;
        var password = document.querySelector("#exampleInputPassword1");
        var passwordValue = password.value;
        var user_object = localStorage.getItem(emailValue);
        if (user_object !== null) {
            var array = user_object.split(",");
            var passwordField = array[3];
            var passwordInStorage = passwordField.split(":")[1].trim();
            passwordInStorage = passwordInStorage.slice(1, -2);
            if (passwordValue === passwordInStorage) {
                showSuccessAlert();
            }
            else {
                showDangerAlert("passwords does not match account");
            }
        }
        else {
            showDangerAlert("account not found");
        }
        function showSuccessAlert() {
            alert_success_div_1.setAttribute("class", "alert alert-success");
            alert_success_div_1.setAttribute("role", "alert");
            alert_success_div_1.style.visibility = "visible";
            alert_success_div_1.textContent = "login successful!";
            document.getElementById("header").appendChild(alert_success_div_1);
            setTimeout(function () { alert_success_div_1.style.visibility = "hidden"; }, 1500);
        }
        function showDangerAlert(message) {
            alert_danger_div_1.style.opacity = "1";
            alert_danger_div_1.setAttribute("class", "alert alert-danger");
            alert_danger_div_1.setAttribute("role", "alert");
            alert_danger_div_1.style.visibility = "visible";
            alert_danger_div_1.textContent = message;
            document.getElementById("header").appendChild(alert_danger_div_1);
            setTimeout(function () { alert_danger_div_1.style.visibility = "hidden"; }, 1500);
        }
    }
    ;
    function showPassword() {
        if (document.getElementById("exampleInputPassword1").getAttribute("type") === "password") {
            document.getElementById("exampleInputPassword1").setAttribute("type", "text");
        }
        else {
            document.getElementById("exampleInputPassword1").setAttribute("type", "password");
        }
    }
}

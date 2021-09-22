          {        
                   const togglePasswordVisibility = document.querySelector("#showPassword1");
                   togglePasswordVisibility.addEventListener("click", (e) => {
                    if (document.getElementById("inputPassword").getAttribute("type") === "password"){
                              document.getElementById("inputPassword").setAttribute("type", "text");
                    }
                    else{
                              document.getElementById("inputPassword").setAttribute("type", "password");
                    }
         });

         const toggleConfirmPasswordVisibility = document.querySelector("#showPassword2");
         toggleConfirmPasswordVisibility.addEventListener("click", (e) => {
                    if (document.getElementById("confirmPassword").getAttribute("type") === "password"){
                                        document.getElementById("confirmPassword").setAttribute("type", "text");
                              }
                              else{
                                        document.getElementById("confirmPassword").setAttribute("type", "password");
                              }
                   });

                    let button: HTMLButtonElement = document.getElementById("submit") as unknown as HTMLButtonElement;
                   button.addEventListener("click", (e) =>{
                   e.preventDefault();
                   let firstName: HTMLInputElement = document.getElementById("firstName") as HTMLInputElement;
                   let firstNameValue: string = firstName.value;

                   let lastName: HTMLInputElement = document.getElementById("lastName") as HTMLInputElement;
                   let lastNameValue: string = lastName.value;

                   let email: HTMLInputElement = document.getElementById("email") as HTMLInputElement;
                   let emailValue: string = email.value;

                   let password: HTMLInputElement = document.getElementById("inputPassword") as HTMLInputElement;
                   let passwordValue: string = password.value;

                   let confirmPassword: HTMLInputElement = document.getElementById("confirmPassword") as HTMLInputElement;
                   let confirmPasswordValue: string = confirmPassword.value;

                   const newUser = {
                             firstName : firstNameValue,
                             lastName : lastNameValue,
                             email : emailValue,
                             password: passwordValue
                   }
                   if (firstNameValue===""||lastNameValue===""||passwordValue===""|| emailValue===""|| passwordValue !==  confirmPasswordValue){
                              alert_danger_div.style.opacity ="1";
                              alert_danger_div.setAttribute("class", "alert alert-danger")
                              alert_danger_div.setAttribute("role", "alert");
                              alert_danger_div.style.visibility = "visible";
                              alert_danger_div.textContent = "Some fields are empty or passwords do not match";
                              document.getElementById("header").appendChild(alert_danger_div);
                              setTimeout(function(){ alert_danger_div.style.visibility = "hidden"; }, 1500);   
                   }
                   else{    
                             if (localStorage.getItem(newUser.email) === null){
                                        window.localStorage.setItem(emailValue, JSON.stringify(newUser));
                                        firstName.value = "";
                                        lastName.value = "";
                                        password.value = "";
                                        email.value = "";
                                        confirmPassword.value ="";
                             }                            
                             else{
                              alert_danger_div.style.opacity ="1";
                              alert_danger_div.setAttribute("class", "alert alert-danger")
                              alert_danger_div.setAttribute("role", "alert");
                              alert_danger_div.style.visibility = "visible";
                              alert_danger_div.textContent = "Account with email already exists";
                              document.getElementById("header").appendChild(alert_danger_div);
                              setTimeout(function(){ alert_danger_div.style.visibility = "hidden"; }, 1500);   
                             }
                   }
         });         


         let confirmPassword : HTMLInputElement = document.getElementById("confirmPassword") as HTMLInputElement;

         let password: HTMLInputElement = document.getElementById("inputPassword") as HTMLInputElement;

         let alert_danger_div: HTMLDivElement = document.createElement("Div") as HTMLDivElement;
         let alert_success_div: HTMLDivElement = document.createElement("Div") as HTMLDivElement;
         confirmPassword.addEventListener("keyup", ()=>{
                    if (confirmPassword.value !== password.value && password.value !== ""){
                              alert_danger_div.style.opacity ="1";
                              alert_danger_div.setAttribute("class", "alert alert-danger")
                              alert_danger_div.setAttribute("role", "alert");
                              alert_danger_div.style.visibility = "visible";
                              alert_danger_div.textContent = "passwords do not match!";
                              document.getElementById("header").appendChild(alert_danger_div);
                              setTimeout(function(){ alert_danger_div.style.visibility = "hidden"; }, 1500);
                    }
                    else{
                              alert_danger_div.style.opacity ="0.1";
                              if (confirmPassword.value === password.value && password.value !== ""){
                              alert_success_div.setAttribute("class", "alert alert-success")
                              alert_success_div.setAttribute("role", "alert");
                              alert_success_div.style.visibility = "visible";
                              alert_success_div.textContent = "passwords match!";
                              document.getElementById("header").appendChild(alert_success_div);
                              setTimeout(function(){ alert_success_div.style.visibility = "hidden"; }, 1500);
                    }
          }
         })

         let loginAnchor: HTMLAnchorElement = document.querySelector("#login");
         loginAnchor.addEventListener("click", (e) => {
                   let container : HTMLDivElement = document.querySelector("#container");
                   container.innerHTML = "";
                   container.innerHTML += '<form><div id = "header"></div><div class="mb-3"><label for="exampleInputEmail1" class="form-label">Email address</label><input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"><div id="emailHelp" class="form-text">We\'ll never share your email with anyone else.</div></div><div class="row g-3" style="display: inline-flex; justify-content: center; align-items: center;"><div class="mb-3 col-11"><label for="exampleInputPassword1" class="form-label">Password</label><input type="password" class="form-control" id="exampleInputPassword1"></div>   <div class="col-1"><i class="fa fa-eye  rounded px-2 "data-toggle="tooltip" data-placement="bottom" title="show password"id="showPassword1" onclick="showPassword()"></i></div></div><div class = "mb-3"><button type="submit" class="btn btn-primary" id="submit" onclick="_login()">Login</button></div></form><div><span>Don\'t have an account? </span><a href="./index.html" id="register">Register</a></div>';      
         });

         function _login(){
                   console.log("login button clicked");
                    let email: HTMLInputElement = document.querySelector("#exampleInputEmail1");
                    let emailValue: string = email.value;

                    let password: HTMLInputElement = document.querySelector("#exampleInputPassword1");
                    let passwordValue: string = password.value;

                    let user_object : string = localStorage.getItem(emailValue);
                    if (user_object !== null){
                              let array: string[] = user_object.split(",");
                              let passwordField: string = array[3];
                              let passwordInStorage: string = passwordField.split(":")[1].trim();
                              passwordInStorage = passwordInStorage.slice(1, -2);
                              if (passwordValue === passwordInStorage){
                                      showSuccessAlert()                             
                              }else{
                                        showDangerAlert("passwords does not match account");
                              }
                    }
                    else{
                              showDangerAlert("account not found");
                    }

                    function showSuccessAlert(){
                              alert_success_div.setAttribute("class", "alert alert-success")
                              alert_success_div.setAttribute("role", "alert");
                              alert_success_div.style.visibility = "visible";
                              alert_success_div.textContent = "login successful!";
                              document.getElementById("header").appendChild(alert_success_div);
                              setTimeout(function(){ alert_success_div.style.visibility = "hidden"; }, 1500);           
                    }

                    function showDangerAlert(message: string){
                              alert_danger_div.style.opacity ="1";
                              alert_danger_div.setAttribute("class", "alert alert-danger")
                              alert_danger_div.setAttribute("role", "alert");
                              alert_danger_div.style.visibility = "visible";
                              alert_danger_div.textContent = message;
                              document.getElementById("header").appendChild(alert_danger_div);
                              setTimeout(function(){ alert_danger_div.style.visibility = "hidden"; }, 1500);                              
                    }
         };

         function showPassword(){
          if (document.getElementById("exampleInputPassword1").getAttribute("type") === "password"){
                    document.getElementById("exampleInputPassword1").setAttribute("type", "text");
          }
          else{
                    document.getElementById("exampleInputPassword1").setAttribute("type", "password");
          }
}
}

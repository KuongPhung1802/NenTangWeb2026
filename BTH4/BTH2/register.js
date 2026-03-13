const form = document.getElementById("form");

const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirm = document.getElementById("confirm");
const terms = document.getElementById("terms");

const nameCount = document.getElementById("nameCount");
const strengthBar = document.getElementById("strengthBar");
const toggle = document.getElementById("toggle");

function showError(id,message){
document.getElementById(id+"Error").textContent = message;
}

function clearError(id){
document.getElementById(id+"Error").textContent = "";
}


fullname.addEventListener("input",function(){

const len = fullname.value.length;
nameCount.textContent = len + "/50";

});


password.addEventListener("input",function(){

const value = password.value;

let strength = 0;

if(value.length >=8) strength++;
if(/[A-Z]/.test(value)) strength++;
if(/[a-z]/.test(value)) strength++;
if(/[0-9]/.test(value)) strength++;

if(strength <=1){

strengthBar.style.width="33%";
strengthBar.style.background="red";

}
else if(strength==2){

strengthBar.style.width="66%";
strengthBar.style.background="orange";

}
else{

strengthBar.style.width="100%";
strengthBar.style.background="green";

}

});


toggle.addEventListener("click",function(){

if(password.type==="password"){
password.type="text";
}else{
password.type="password";
}

});


function validateFullname(){

const regex = /^[a-zA-ZÀ-ỹ\s]+$/;

if(fullname.value.trim().length <3){

showError("fullname","Tên phải ≥ 3 ký tự");
return false;

}

if(!regex.test(fullname.value)){

showError("fullname","Tên chỉ chứa chữ");
return false;

}

clearError("fullname");
return true;

}


function validateEmail(){

const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!regex.test(email.value)){

showError("email","Email không hợp lệ");
return false;

}

clearError("email");
return true;

}


function validatePhone(){

const regex = /^0[0-9]{9}$/;

if(!regex.test(phone.value)){

showError("phone","SĐT phải 10 số");
return false;

}

clearError("phone");
return true;

}


function validatePassword(){

const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

if(!regex.test(password.value)){

showError("password","≥8 ký tự, có hoa thường và số");
return false;

}

clearError("password");
return true;

}


function validateConfirm(){

if(confirm.value !== password.value){

showError("confirm","Mật khẩu không khớp");
return false;

}

clearError("confirm");
return true;

}


function validateGender(){

const gender = document.querySelector('input[name="gender"]:checked');

if(!gender){

showError("gender","Chọn giới tính");
return false;

}

clearError("gender");
return true;

}


function validateTerms(){

if(!terms.checked){

showError("terms","Phải đồng ý điều khoản");
return false;

}

clearError("terms");
return true;

}


form.addEventListener("submit",function(e){

e.preventDefault();

const valid =
validateFullname() &
validateEmail() &
validatePhone() &
validatePassword() &
validateConfirm() &
validateGender() &
validateTerms();

if(valid){

form.style.display="none";

document.getElementById("success").textContent =
"Đăng ký thành công 🎉";

}

});
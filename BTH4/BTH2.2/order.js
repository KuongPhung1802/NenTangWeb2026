const prices = {
ao:150000,
quan:200000,
giay:500000
};

const form = document.getElementById("orderForm");

const product = document.getElementById("product");
const quantity = document.getElementById("quantity");
const date = document.getElementById("date");
const address = document.getElementById("address");
const note = document.getElementById("note");

const total = document.getElementById("total");
const noteCount = document.getElementById("noteCount");

const summary = document.getElementById("summary");
const info = document.getElementById("info");

function showError(id,message){
document.getElementById(id+"Error").textContent = message;
}

function clearError(id){
document.getElementById(id+"Error").textContent = "";
}


function updateTotal(){

const p = product.value;
const q = Number(quantity.value);

if(prices[p] && q){

const money = prices[p] * q;

total.textContent = money.toLocaleString("vi-VN");

}

}

product.addEventListener("change",updateTotal);
quantity.addEventListener("input",updateTotal);



note.addEventListener("input",function(){

const len = note.value.length;

noteCount.textContent = len + "/200";

if(len>200){

noteCount.style.color="red";
showError("note","Tối đa 200 ký tự");

}else{

noteCount.style.color="gray";
clearError("note");

}

});


function validateProduct(){

if(product.value===""){

showError("product","Chọn sản phẩm");
return false;

}

clearError("product");
return true;

}


function validateQuantity(){

const q = Number(quantity.value);

if(!q || q<1 || q>99){

showError("quantity","Số lượng 1-99");
return false;

}

clearError("quantity");
return true;

}


function validateDate(){

const today = new Date();

const selected = new Date(date.value);

const max = new Date();

max.setDate(today.getDate()+30);

if(!date.value){

showError("date","Chọn ngày giao");
return false;

}

if(selected < today){

showError("date","Không chọn ngày quá khứ");
return false;

}

if(selected > max){

showError("date","Không quá 30 ngày");
return false;

}

clearError("date");
return true;

}


function validateAddress(){

if(address.value.trim().length <10){

showError("address","Địa chỉ ≥ 10 ký tự");
return false;

}

clearError("address");
return true;

}


function validatePay(){

const pay = document.querySelector('input[name="pay"]:checked');

if(!pay){

showError("pay","Chọn phương thức thanh toán");
return false;

}

clearError("pay");
return true;

}



form.addEventListener("submit",function(e){

e.preventDefault();

const valid =
validateProduct() &
validateQuantity() &
validateDate() &
validateAddress() &
validatePay();

if(valid){

summary.style.display="block";

info.innerHTML =
"Sản phẩm: "+product.value+
"<br>Số lượng: "+quantity.value+
"<br>Tổng tiền: "+total.textContent+" VNĐ"+
"<br>Ngày giao: "+date.value;

}

});


document.getElementById("confirmBtn").onclick=function(){

alert("Đặt hàng thành công 🎉");

location.reload();

}

document.getElementById("cancelBtn").onclick=function(){

summary.style.display="none";

}
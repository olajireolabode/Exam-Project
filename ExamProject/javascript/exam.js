var regex;
var firstName;
var lastName;
var id;
var schoolName;
var passWord;
var email;
var length;
var user;

function login(){        
    var url = "../login.php";
    var obj = new Object();
    obj.user = $("#user").val();
    obj.pass = $("#pass").val();

    $.post(url, obj, function(response){
        console.log(response)

        var json = JSON.parse(response);
        var code = json.code;

        if (code==1) {
            window.location.href = "ChoicePage.html";
        }
        else{
            alert("Invalid or Incorrect Inputs\nPlease try again");
        }        
    });              
}

function create(){
    if (validate() == true) {
        console.log("Accepted");
        document.forms[0].submit();
    }      
    else{
        alert("Could not create account!")
    }
}

function changeToJava(){
    window.location.href = "javaQuestions.html";
}

function changeToPhp(){
    window.location.href = "phpQuestions.html";
}

function validate(){
    if(validateName() &&  validateEmail() && validatePassword() && validateId()){
        return true;
    }
    else return false;
}

function validateName(){
    regex = /^[A-Z][a-z-]{2,}$/;
    firstName = document.getElementsByName("first")[0].value;
    lastName = document.getElementsByName("last")[0].value;

    if (regex.test(firstName) == false || regex.test(lastName) == false) {         
        return false;
    }
    else return true;
}

function validateId(){    
    id = document.getElementsByName("user")[0].value;

    if (hasValidLength(id) == true && hasValidSum(id) == true) {
        return true;
    }    
    else{
        return false;
    }    
}

function validateEmail(){
    regex = /^[a-zA-Z\d._-]{2,16}@[a-z]{5,12}\.(com|ca|qc.ca|co.uk|gov|org)$/;
    email = document.getElementsByName("email")[0].value;

    if (regex.test(email) == false) {
        return false;
    }
    return true;
}

function validatePassword(){    
    password = document.getElementsByName("pass")[0].value;

    if(containsCapital(password) == false || containsDigits(password) == false || containsAllowedCharacters(password) == false || hasRequiredLength(password) == false){
        return false;
    }    
    return true;        
}

function hasValidLength(id){
    if (id.length == 8) {
        return true;
    }
    else return false;
}

function hasValidSum(id) {
    var sum = 0;
    for (var i = 0; i < id.length; i++) {
      sum += parseInt(id[i]);
    }
    if (sum == 34 || sum == 38 || sum == 42 || sum == 59) {
        return true;        
    }
    else return false;
}

function containsCapital(password){
    regex = /[A-Z]/;

    if(regex.test(password) == false){
        return false;
    }
    else return true;
}

function containsDigits(password){
    regex = /\d.*\d|\d{1,}/;

    if(regex.test(password) == false){
        return false;
    }
    else return true;
}

function containsAllowedCharacters(password){
    regex = /^[a-zA-Z0-9!.?]*$/;

    if(regex.test(password) == false){
        return false;
    }
    else return true;
}

function hasRequiredLength(password){
    length = password.length;
    
    if(length<8 && length>24){
        return false;
    }
    else return true;
}

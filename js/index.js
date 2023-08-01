
// array representing the database
if (localStorage.getItem('use') != null) {
    var users = JSON.parse(localStorage.getItem('use'));
} else {
    var users = [];
}
//temp array to check if email already exist
if (localStorage.getItem('T') != null) {
    var temp = JSON.parse(localStorage.getItem('T'));
} else {
    var temp = [];
}
//temp array to check if password already exist
if (localStorage.getItem('T2') != null) {
    var temp2 = JSON.parse(localStorage.getItem('T2'));
} else {
    var temp2 = [];
}

// global variables
var nameInput = document.getElementById('name');
var emailInput = document.getElementById('email');
var passInput = document.getElementById('password');
var btn = document.getElementById('btn');
var signUpBtn = document.getElementById('sign-up-btn');
var paragraphs = document.querySelectorAll('.message');
var cheked1 = false, cheked2 = false, cheked3 = false;
var done1 = false, done2 = false, done3 = false;
var h1 = document.getElementById('h');
var home = document.getElementById('anchor');
var login_a = document.getElementById('sec-a');
var username = '';


// function to check the email
function check_email() {
    if (!emailInput.value.includes('@')) {
        paragraphs[1].innerHTML = 'email should contain @';
    } else {
        paragraphs[1].innerHTML = '<i class="fa-solid fa-check"></i>';
        cheked1 = true;
        done2 = true;
    }
}
// function to check the password
function check_pass() {
    if (passInput.value.length < 5) {
        paragraphs[2].innerHTML = 'password should be more than 4 <br> characters or digits';
    } else {
        paragraphs[2].innerHTML = '<i class="fa-solid fa-check"></i>';
        cheked2 = true;
        done3 = true;
    }
}
// function to check the name
function containsUppercase(str) {
    return /[A-Z]/.test(str);
}
// function to clear inputs
function clear() {
    nameInput.value = null;
    emailInput.value = null;
    passInput.value = null;
    for (var i = 0; i < 3; i++) {
        paragraphs[i].innerHTML = '';
    }
}
// function to check if account exist
function checkLocalStorage() {
    if (localStorage.getItem('use') != null) {
        for (var i = 0; i < users.length; i++) {
            if (temp[i] == emailInput.value && temp2[i] == passInput.value) {
                cheked3 = true;
                username = users[i].Name;
                localStorage.setItem('username',username);
            }
            else {
                paragraphs[2].innerHTML = 'No matching accounts! please sign up';
            }
        }
    }
    else {
        paragraphs[2].innerHTML = 'No matching accounts! please sign up';
    }
}
// login button
if (btn) {
    btn.addEventListener('click', function () {
        if (emailInput.value != null) {
            check_email();
        }
        if (passInput.value != null) {
            check_pass();
        }
        if (cheked1 && cheked2) {
            checkLocalStorage();
            if (cheked3) {
                clear();
                home.href = "./home.html";
            }
        }
    })
}
// home page
if(h1)
{
    var username = localStorage.getItem('username');
    h1.innerHTML ='Hello ' +username+'!';
}
// sign up button
if (signUpBtn) {
    signUpBtn.addEventListener('click', function () {
        if (nameInput.value != null) {
            if (containsUppercase(nameInput.value)) {
                paragraphs[0].innerHTML = '<i class="fa-solid fa-check"></i>'
                done1 = true;
            } else {
                paragraphs[0].innerHTML = 'name should include atleast one uppercase letter';
            }
        }
        if (emailInput.value != null) {
            check_email();
        }
        if (passInput.value != null) {
            check_pass();
        }
        if (done1 && done2 && done3) {
            if (localStorage.getItem('use') == null) {
                var user = {
                    Name: nameInput.value,
                    email: emailInput.value,
                    pass: passInput.value
                };
                users.push(user);
                var stringarr = JSON.stringify(users);
                localStorage.setItem('use', stringarr);
                temp.push(emailInput.value);
                temp2.push(passInput.value);
                localStorage.setItem('T', JSON.stringify(temp));
                localStorage.setItem('T2', JSON.stringify(temp2));
                // username = nameInput.value;
                // localStorage.setItem('username', username);
                login_a.href = 'index.html';
            } else {
                if (temp.includes(emailInput.value) && temp2.includes(passInput.value)) {
                    paragraphs[2].innerHTML = 'Account already exist, please login';
                } else {
                    var user = {
                        Name: nameInput.value,
                        email: emailInput.value,
                        pass: passInput.value
                    };
                    users.push(user);
                    var stringarr = JSON.stringify(users);
                    localStorage.setItem('use', stringarr);
                    temp.push(emailInput.value);
                    temp2.push(passInput.value);
                    localStorage.setItem('T', JSON.stringify(temp));
                    localStorage.setItem('T2', JSON.stringify(temp2));
                    // username = nameInput.value;
                    // localStorage.setItem('username', username);
                    login_a.href = 'index.html';
                }
            }
        }
    })
}


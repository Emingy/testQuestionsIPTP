    
function signIn (email, pass) {
    let alert = document.getElementById('b-form-alert');
    alert.classList.add("d-none");
    if(email != '' && pass != ''){
        if (validateEmail(email)||email=='root'){
            sha256(pass).then(function(value){       
                let auth = {
                    email: email,
                    pass: value
                }
        
                let response = fetch('../php/signin.php', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(auth)
                  });
                response.then(function(result){
                    result.text().then(function(res){
                        if(JSON.parse(res).status == 'Sign In'){
                            res = JSON.parse(res);
                            sessionStorage.setItem('name', res.name);
                            sessionStorage.setItem('token', res.token);
                            window.location.href = "../../";
                        }else if (res == 'Empty'){
                            alert.innerHTML = 'Неправильно введен логин или пароль';
                            alert.classList.remove("d-none");
                        }else if (res == 'Error'){
                            alert.innerHTML = 'Ошибка запроса';
                            alert.classList.remove("d-none");
                        }else{
                            console.error('Error',res)
                        }
                    })
                })
                response.catch(function(error){
                    alert.innerHTML = 'Error'+error;
                    alert.classList.remove("d-none");
                })
            }).catch(function(error){
                alert.innerHTML = 'Error'+error;
                alert.classList.remove("d-none");
            })
        }else{
            alert.innerHTML = 'Неправильно введен Email!';
            alert.classList.remove("d-none");
        }
    }else{
        alert.innerHTML = 'Заполните все поля!';
        alert.classList.remove("d-none");
    }
}
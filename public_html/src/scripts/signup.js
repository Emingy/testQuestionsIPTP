function signup (name, email, pass) {
    let alert = document.getElementById('b-form-alert');
    alert.classList.add("d-none");
    alert.classList.remove("alert-success");
    alert.classList.add("alert-danger");
    if(name != '' && email != '' && pass != ''){
        if (validateEmail(email)){
            sha256(pass).then(function(value){       
                let reg = {
                    name: name,
                    email: email,
                    pass: value
                }
        
                let response = fetch('../php/signup.php', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(reg)
                  });
                response.then(function(result){
                    result.text().then(function(res){
                        if(res == 'Signup'){
                            alert.innerHTML = 'Аккаунт успешно зарегистрирован';
                            alert.classList.remove("alert-danger");
                            alert.classList.add("alert-success");
                            alert.classList.remove("d-none");
                        }else if (res == 'Busy'){
                            alert.innerHTML = 'Аккаунт уже существует';
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
    
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
                connectDb('db', function(db){
                    var transaction = db.transaction('auth', 'readwrite')
                    var auth = transaction.objectStore('auth')
                    var get = auth.getAll()
                    var auth_name, auth_token
                    get.onsuccess = () => {
                        if(get.result.length!=0){
                            var checkAcc = () => {
                                var check = 'error'
                                get.result.map((i)=>{
                                    if(check!= true && (i.login != email || i.pass != value)){
                                        check = false
                                    }else if(''+i.login==''+email && ''+i.pass==''+value){
                                        check = true
                                        auth_name = i.name
                                        auth_token = i.token
                                    }
                                })
                                console.log(check)
                                return check
                            }
                            if (checkAcc()==true){
                                var cursor = event.target.result;
                                sessionStorage.setItem('name', auth_name);
                                sessionStorage.setItem('token', auth_token);
                                window.location.href = "../../index.html";
                            }else if(checkAcc()=='error'){
                                alert.innerHTML = 'Ошибка';
                                alert.classList.remove("d-none");
                            }else if(checkAcc()==false){
                                alert.innerHTML = 'Неправильно введен логин или пароль';
                                alert.classList.remove("d-none");
                            }
                        }else{
                            alert.innerHTML = 'Неправильно введен логин или пароль';
                            alert.classList.remove("d-none");
                        }
                    }
                    get.onerror = () => {
                        alert.innerHTML = 'Ошибка';
                        alert.classList.remove("d-none");
                    }
                },'auth','id',true)
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
function signup (name, email, pass) {
    var rand = function() {
        return Math.random().toString(36).substr(2); // remove `0.`
    };
    
    var token = function() {
        return rand() + rand(); // to make it longer
    };
    let alert = document.getElementById('b-form-alert');
    alert.classList.add("d-none");
    alert.classList.remove("alert-success");
    alert.classList.add("alert-danger");
    if(name != '' && email != '' && pass != ''){
        if (validateEmail(email)){
            sha256(pass).then(function(value){       
                let reg = {
                    name: name,
                    login: email,
                    pass: value,
                    token: token()
                }
                connectDb('db',function(db){
                    var transaction = db.transaction('auth', 'readwrite')
                    var auth = transaction.objectStore('auth')
                    var get = auth.getAll()
                    get.onsuccess = () => {
                        if(get.result.length!=0){
                            var checkAcc = () => {
                                var check 
                                get.result.map((i)=>{
                                    if(check!= true && i.login!=email){
                                        check = false
                                    }else if(i.login==email){
                                        check = true
                                    }else{
                                        check = 'error'
                                    }
                                })
                                console.log(check)
                                return check
                            }
                            if (checkAcc()==true){
                                    alert.innerHTML = 'Аккаунт уже существует';
                                    alert.classList.remove("d-none");
                            }else if(checkAcc()=='error'){
                                alert.innerHTML = 'Ошибка';
                                alert.classList.remove("d-none");
                            }else if(checkAcc()==false){
                                let request = auth.add(reg);
                                console.dir(request)
                                request.onsuccess = () => {
                                    alert.innerHTML = 'Аккаунт успешно зарегистрирован';
                                    alert.classList.remove("alert-danger");
                                    alert.classList.add("alert-success");
                                    alert.classList.remove("d-none");
                                }
                                request.onerror = (e) => {
                                    alert.innerHTML = 'Ошибка';
                                    alert.classList.remove("d-none");
                                }
                            }
                        }else{
                            let request = auth.add(reg);
                            console.dir(request)
                            request.onsuccess = () => {
                                alert.innerHTML = 'Аккаунт успешно зарегистрирован';
                                alert.classList.remove("alert-danger");
                                alert.classList.add("alert-success");
                                alert.classList.remove("d-none");
                            }
                            request.onerror = (e) => {
                                alert.innerHTML = 'Ошибка';
                                alert.classList.remove("d-none");
                            }
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
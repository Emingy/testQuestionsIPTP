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
                    email: email,
                    pass: value,
                    token: token()
                }
                window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
                let openRequest = indexedDB.open("db", 1);
                openRequest.onerror = (e) => {
                    console.log('Error', e.target.errorCode);
                }
                openRequest.onsuccess = (e) => {
                    console.log('Success')
                    var db = e.target.result;
                    var transaction = db.transaction('auth', 'readwrite')
                    var auth = transaction.objectStore('auth')
                    var authentication = () =>{
                        var request = auth.openCursor();
                        request.onsuccess = (event) => {
                            var cursor = event.target.result;
                            if (cursor && cursor!=null) {
                                if (cursor.value.login.indexOf(email) !== -1) {
                                    return 'true';
                                }
                        
                                cursor.continue();          
                            }else if(cursor==null){
                                return 'false';
                            }else{
                                return 'error';
                            }
                            return 'false';
                        }
                        request.onerror = () => {
                            console.log('error')
                        }
                    }
                    if (authentication()=='true'){
                        alert.innerHTML = 'Аккаунт уже существует';
                        alert.classList.remove("d-none");
                    }else if(authentication()=='error'){
                        alert.innerHTML = 'Ошибка';
                        alert.classList.remove("d-none");
                    }else if(authentication()=='false'){
                        console.log(authentication())
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
                    console.log(authentication())
                }
                openRequest.onupgradeneeded = () => {
                    console.log('onupgradeneeded')
                    if (!openRequest.result.objectStoreNames.contains('auth')){
                        openRequest.result.createObjectStore('auth', {keyPath: 'id', autoIncrement: true})
                    }
                }
                // let response = fetch('../php/signup.php', {
                //     method: 'POST',
                //     headers: {
                //       'Content-Type': 'application/json;charset=utf-8'
                //     },
                //     body: JSON.stringify(reg)
                //   });
                // response.then(function(result){
                //     result.text().then(function(res){
                //         if(res == 'Signup'){
                //             alert.innerHTML = 'Аккаунт успешно зарегистрирован';
                //             alert.classList.remove("alert-danger");
                //             alert.classList.add("alert-success");
                //             alert.classList.remove("d-none");
                //         }else if (res == 'Busy'){
                //             alert.innerHTML = 'Аккаунт уже существует';
                //             alert.classList.remove("d-none");
                //         }else if (res == 'Error'){
                //             alert.innerHTML = 'Ошибка запроса';
                //             alert.classList.remove("d-none");
                //         }else{
                //             console.error('Error',res)
                //         }
                //     })
                // })
                // response.catch(function(error){
                //     alert.innerHTML = 'Error'+error;
                //     alert.classList.remove("d-none");
                // })
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
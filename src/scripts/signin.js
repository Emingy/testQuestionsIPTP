    
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
                    // let a = {
                    //     login: 'test@mail.ru',
                    //     pass: 'test'
                    // }
                    // let request = auth.add(a);
                    // console.dir(request)
                    var authentication = () =>{
                        var request = auth.openCursor();
                        request.onsuccess = (event) => {
                            var cursor = event.target.result;
                            if (cursor) {
                                if (cursor.value.login.indexOf(email) !== -1 && cursor.value.pass.indexOf(value) !== -1) {
                                    return 'true';
                                }
                        
                                cursor.continue();          
                            }else{
                                return 'error';
                            }
                            return 'false';
                        }
                    }
                    if (authentication()=='true'){
                        var cursor = event.target.result;
                        sessionStorage.setItem('name', cursor.value.name);
                        sessionStorage.setItem('token', cursor.value.token);
                        window.location.href = "../../index.html";
                    }else if(authentication()=='error'){
                        alert.innerHTML = 'Ошибка';
                        alert.classList.remove("d-none");
                    }else if(authentication()=='false'){
                        alert.innerHTML = 'Неправильно введен логин или пароль';
                        alert.classList.remove("d-none");
                    }
                    // request.onsuccess = () => {
                    //     console.log('Записано')
                    // }
                    // request.onerror = (e) => {
                    //     console.log('Ошибка при записи', e.target.error)
                    // }
                }
                openRequest.onupgradeneeded = () => {
                    console.log('onupgradeneeded')
                    if (!openRequest.result.objectStoreNames.contains('auth')){
                        openRequest.result.createObjectStore('auth', {keyPath: 'id', autoIncrement: true})
                    }
                }
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
function checkToken(){

    return new Promise((resolve, reject) => {
        if(sessionStorage.getItem('token')){
          connectDb('db',function(db){
            var transaction = db.transaction('auth', 'readwrite')
            var auth = transaction.objectStore('auth')
            var get = auth.getAll()
            var auth_name, auth_token
            get.onsuccess = () => {
                if(get.result.length!=0){
                    var checkAcc = () => {
                        var check = 'error'
                        get.result.map((i)=>{
                            if(check!= true && i.token != sessionStorage.getItem('token')){
                                check = false
                            }else if(''+i.token==''+sessionStorage.getItem('token')){
                                check = true
                                auth_name = i.name
                                auth_token = i.token
                            }
                        })
                        return check
                    }
                    if (checkAcc()==true){
                      resolve(true);
                    }else if(checkAcc()=='error'){
                        alert.innerHTML = 'Ошибка';
                        alert.classList.remove("d-none");
                    }else if(checkAcc()==false){
                      clearSession();
                      resolve(false);
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
        }else{
            resolve(false);
        }
    })
  
}

function clearSession(){
    var count = sessionStorage.length;
    while(count--) {
    var key = sessionStorage.key(count);
    sessionStorage.removeItem(key);
    }
}
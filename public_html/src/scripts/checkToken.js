function checkToken(){

    return new Promise((resolve, reject) => {
        if(sessionStorage.getItem('token')){
          let token = {
            token: sessionStorage.getItem('token')
          }
          let response = fetch('../../src/php/checkToken.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
              body: JSON.stringify(token)
            });
          response.then(function(result){
              result.text().then(function(res){
                  if(res != 'Sign In'){
                    clearSession();
                    resolve(false);
                  }else{
                    resolve(true);
                  }
              })
          })
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
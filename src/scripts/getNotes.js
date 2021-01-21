function getNotes(){
        let response = fetch('../src/php/getNotes.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
            });
        response.then(function(result){
            result.text().then(function(res){
                if(JSON.parse(res).Status == 'OK'){
                    res = JSON.parse(res);
                    let table = document.getElementById('b-form-table');
                    for (var key in res){
                        if (key != 'Status'){
                            table.innerHTML+=`<tr><td>${formatDate(res[key].Date)}</td><td>${res[key].Note}</td></tr>`;
                        }
                    }
                }else if (res == 'Error'){
                    console.error('Error')
                }else{
                    console.error('Error',res)
                }
            })
        })
        response.catch(function(error){
            console.error('Error',error);
        })
}
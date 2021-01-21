function addNote(note){
    if(note!=''){
        var date = function() {
            let date = new Date();
            var mm = date.getMonth() + 1;
            var dd = date.getDate();
          
            return [date.getFullYear(),
                '-' + (mm>9 ? '' : '0') + mm,
                '-' + (dd>9 ? '' : '0') +  dd
                   ].join('');
        };
        let table = document.getElementById('b-form-table');
        table.innerHTML+=`<tr><td>${formatDate(date())}</td><td>${note}</td></tr>`;
        $('#Modal').modal('hide');
        let data = {
            date: date(),
            note: note
        }
    
        let response = fetch('../src/php/addNote.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
          });
        response.then(function(result){
            result.text().then(function(res){
                if(res == 'OK'){
                    console.log(res)
                }else{
                    console.error('Error',res)
                }
            })
        })
        response.catch(function(error){
            console.error('Error',error)
        })
    }
}
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
        connectDb('db2',function(db){
            var transaction = db.transaction('notes', 'readwrite')
            var notes = transaction.objectStore('notes')
            let request = notes.add(data);
            console.dir(request)
            request.onsuccess = () => {
                console.log('success')
            }
            request.onerror = (e) => {
            }
        },'notes','id',true)
    }
}
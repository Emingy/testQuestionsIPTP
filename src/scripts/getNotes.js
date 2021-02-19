function getNotes(){
        connectDb('db2',function(db){
            var transaction = db.transaction('notes', 'readwrite')
            var notes = transaction.objectStore('notes')
            var get = notes.getAll()
            get.onsuccess = () => {
                if(get.result.length>0){
                    let table = document.getElementById('b-form-table');
                    get.result.map((i)=>{
                        table.innerHTML+=`<tr><td>${formatDate(i.date)}</td><td>${i.note}</td></tr>`;
                    })
                }
            }
            get.onerror = () => {
                console.error('Ошибка');
            }
        },'notes','id',true)
}
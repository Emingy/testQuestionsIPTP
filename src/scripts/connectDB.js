function connectDb(db, f, table, key, autoInc){
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
    let openRequest = indexedDB.open(db, 1);
    openRequest.onerror = (e) => {
        console.log('Error', e.target.errorCode);
    }
    openRequest.onsuccess = (e) => {
        f(e.target.result);
    }
    openRequest.onupgradeneeded = () => {
        console.log('onupgradeneeded')
        if (!openRequest.result.objectStoreNames.contains(table)){
            openRequest.result.createObjectStore(table, {keyPath: key, autoIncrement: autoInc})
        }
    }
}
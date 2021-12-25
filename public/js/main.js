function uploadFile() {
    var file = document.getElementById('file')
    var _file = file.files[0]

    var id = '1tRjQBMeDjPKuskcTrH4vBDbLFodQwWzp'


    // tao form muiltipart de upload
    let formData = new FormData();
    // key là file, tẹo trên server cũng đọc thế

    if(!id){
        formData.append('file', _file);
    }else{
        formData.append('file', _file);
        formData.append('id', id);
    }
    
    

    console.log(formData)
    var requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
    };

    fetch("/api/upload-in-folder", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

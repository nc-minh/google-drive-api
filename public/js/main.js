function uploadFile() {
    var file = document.getElementById('file')
    var _file = file.files[0]

    // tao form muiltipart de upload
    let formData = new FormData();
    // key là file, tẹo trên server cũng đọc thế
    formData.append("file", _file);

    var requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
    };

    fetch("/api/upload", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
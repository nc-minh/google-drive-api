function uploadFile() {
    var file = document.getElementById('file')
    var _file = file.files[0]

    // tao form muiltipart de upload
    let formData = new FormData()
    // key là file, tẹo trên server cũng đọc thế

    formData.append('file', _file)
    
    console.log(formData)
    var requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
    };

    fetch("/api/upload", requestOptions)
        .then(response => response.json())
        .then((result) => {
            upload__show.style.display = 'block'
            upload__show.innerText = result.id
            console.log(result)
            if(result.status == 'missing'){
                upload__show.innerText = result.message
                upload__show.style.color = '#ea1010'
            }
        })
        .catch(error => console.log('error', error))
}

function deleteFile() {
    var id = document.getElementById('delete').value
    var delete__show = document.getElementById('delete__show')

    console.log(id)
    // tao form muiltipart de upload
    let formData = new FormData()
    // key là file, tẹo trên server cũng đọc thế

    formData.append('id', id)

    console.log(formData)
    var requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
    };

    fetch("/api/delete", requestOptions)
        .then(response => response.json())
        .then((result) => {
            
            if(result.status == 'OK'){
                delete__show.style.display = 'block'
                delete__show.style.color = '#04ac13'
                delete__show.innerText = result.message
            }else{
                delete__show.style.display = 'block'
                delete__show.style.color = '#ea1010'
                delete__show.innerText = result.error
            }
            console.log(result)
        })
        .catch(error => console.log('error', error));
}

function publicFile() {
    var id = document.getElementById('public').value
    var public__show = document.getElementById('public__show')
    var public__show__text = document.getElementById('public__show__text')
    var link__download = document.getElementById('link__download')
    var link__view = document.getElementById('link__view')
    // tao form muiltipart de upload
    let formData = new FormData()
    // key là file, tẹo trên server cũng đọc thế

    formData.append('id', id)

    console.log(formData)
    var requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
    };

    fetch("/api/public", requestOptions)
        .then(response => response.json())
        .then((result) => {
            if(result.status == 'OK'){
                public__show.style.display = 'block'
                public__show__text.style.display = 'none'
                link__download.setAttribute('href', result.data.webContentLink)
                link__view.setAttribute('href', result.data.webViewLink)
                console.log('vào đúng');
            }else{
                public__show__text.style.display = 'block'
                public__show.style.display == 'none'
                public__show__text.style.color = '#ea1010'
                public__show__text.innerText = result.error
                console.log('vào sai');
            }
            console.log(result)
        })
        .catch(error => console.log('error', error))
}

function uploadAndPublic() {
    var file = document.getElementById('file_upload_public')
    var upload_public__show = document.getElementById('upload_public__show')
    var upload__public__show__text = document.getElementById('upload__public__show__text')
    var up_link__download = document.getElementById('up_link__download')
    var up_link__view = document.getElementById('up_link__view')
    var _file = file.files[0]

    // tao form muiltipart de upload
    let formData = new FormData();
    // key là file, tẹo trên server cũng đọc thế

    formData.append('file', _file);

    console.log(formData)
    var requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
    };

    fetch("/api/upload-public", requestOptions)
        .then(response => response.json())
        .then((result) => {
            if(result.status == 'OK'){
                upload_public__show.style.display = 'block'
                upload__public__show__text.style.display = 'none'
                up_link__download.setAttribute('href', result.data.webContentLink)
                up_link__view.setAttribute('href', result.data.webViewLink)
            }else if(result.status == 'missing'){
                upload__public__show__text.style.display = 'block'
                upload_public__show.style.display = 'none'
                upload__public__show__text.style.color = '#ea1010'
                upload__public__show__text.innerText = result.message
            }else{
                upload__public__show__text.style.display = 'block'
                upload_public__show.style.display = 'none'
                upload__public__show__text.style.color = '#ea1010'
                upload__public__show__text.innerText = result.error
            }
            console.log(result)
        })
        .catch(error => console.log('error', error));
}

function uploadPublic() {
    var file = document.getElementById('file')
    var _file = file.files[0]


    // tao form muiltipart de upload
    let formData = new FormData();
    // key là file, tẹo trên server cũng đọc thế

    formData.append('file', _file);
    
    

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
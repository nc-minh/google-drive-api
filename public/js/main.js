function loadding(){
    var loading = document.getElementById('loading')
    loading.style.display = 'flex'
}

function RMloadding(){
    var loading = document.getElementById('loading')
    var notifications = document.querySelector('.notifications')
    loading.style.display = 'none'
    notifications.style.display = 'block'

    setTimeout(()=>{
        notifications.style.display = 'none'
    },1000)

}

function RM(){
    var loading = document.getElementById('loading')
    var notifications = document.querySelector('.notifications')
    loading.style.display = 'none'
}

function uploadFile() {
    loadding()
    var file = document.getElementById('file')
    var _file = file.files[0]
    let formData = new FormData()
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
            RMloadding()
            upload__show.style.display = 'block'
            upload__show.innerText = result.id
            console.log(result)
            if (result.status == 'missing') {
                upload__show.innerText = result.message
                upload__show.style.color = '#ea1010'
            }
        })
        .catch(error => console.log('error', error))
}

function deleteFile() {
    loadding()
    var id = document.getElementById('delete').value
    var delete__show = document.getElementById('delete__show')
    if (!id) {
        delete__show.style.display = 'block'
        delete__show.style.color = '#ea1010'
        delete__show.innerText = 'Invalid ID!'
    } else {
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };

        fetch(`/api/delete/${id}`, requestOptions)
            .then(response => response.json())
            .then((result) => {
                RMloadding()
                console.log(result)
                if (result.status == 'OK') {
                    delete__show.style.display = 'block'
                    delete__show.style.color = '#04ac13'
                    delete__show.innerText = result.message
                } else {
                    delete__show.style.display = 'block'
                    delete__show.style.color = '#ea1010'
                    delete__show.innerText = result.error
                }
            })
            .catch(error => console.log('error', error));
    }



}

function publicFile() {
    loadding()
    var id = document.getElementById('public').value
    var public__show = document.getElementById('public__show')
    var public__show__text = document.getElementById('public__show__text')
    var link__download = document.getElementById('link__download')
    var link__view = document.getElementById('link__view')
    let formData = new FormData()
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
            RMloadding()
            if (result.status == 'OK') {
                public__show.style.display = 'block'
                public__show__text.style.display = 'none'
                link__download.setAttribute('href', result.data.webContentLink)
                link__view.setAttribute('href', result.data.webViewLink)
                console.log('vào đúng');
            } else {
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
    loadding()
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
            RMloadding()
            if (result.status == 'OK') {
                upload_public__show.style.display = 'block'
                upload__public__show__text.style.display = 'none'
                up_link__download.setAttribute('href', result.data.webContentLink)
                up_link__view.setAttribute('href', result.data.webViewLink)
            } else if (result.status == 'missing') {
                upload__public__show__text.style.display = 'block'
                upload_public__show.style.display = 'none'
                upload__public__show__text.style.color = '#ea1010'
                upload__public__show__text.innerText = result.message
            } else {
                upload__public__show__text.style.display = 'block'
                upload_public__show.style.display = 'none'
                upload__public__show__text.style.color = '#ea1010'
                upload__public__show__text.innerText = result.error
            }
            console.log(result)
        })
        .catch(error => console.log('error', error));
}

function createFolder() {
    loadding()
    var name = document.getElementById('filename_create_folder').value
    var create_folder = document.getElementById('create_folder')

    // tao form muiltipart de upload
    let formData = new FormData();
    // key là file, tẹo trên server cũng đọc thế

    formData.append('name', name);

    console.log(formData)
    var requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
    };

    fetch("/api/create-folder", requestOptions)
        .then(response => response.json())
        .then((result) => {
            RMloadding()
            if (result.status == 'OK') {
                create_folder.style.display = 'block'
                create_folder.innerText = result.data.id
            } else {
                create_folder.innerText = result.error
            }
            console.log(result)
        })
        .catch(error => console.log('error', error))
}

function uploadInFolder() {
    loadding()
    var file = document.getElementById('file_upload_in_folder')
    var id_upload_in_folder = document.getElementById('id_upload_in_folder').value
    var upload_in_folder = document.getElementById('upload_in_folder')

    console.log('idFolder ' + id_upload_in_folder)
    var _file = file.files[0]

    // tao form muiltipart de upload
    let formData = new FormData();
    // key là file, tẹo trên server cũng đọc thế
    if (!id_upload_in_folder) {
        formData.append('file', _file)
    } else {
        formData.append('file', _file)
        formData.append('id', id_upload_in_folder)
    }
    console.log(formData)
    var requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
    };

    fetch("/api/upload-in-folder", requestOptions)
        .then(response => response.json())
        .then((result) => {
            RMloadding()
            console.log(result)


            upload_in_folder.style.display = 'block'
            if (result.status == 'OK') {
                upload_in_folder.innerText = result.id
            } else if (result.status == 'missing') {
                upload_in_folder.innerText = result.message
                upload_in_folder.style.color = '#ea1010'
            } else {
                upload_in_folder.innerText = result.error
            }

        })
        .catch(error => console.log('error', error))
}

function copyText(_this) {
    var text = _this.textContent || _this.innerText
    navigator.clipboard.writeText(text)
}
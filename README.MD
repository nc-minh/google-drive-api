# Google drive api

<div align="center" >
    <img width="350px" src="public/img/api-img.png"/>
</div>

**Đây là hệ thống dựa trên API của google drive để tạo ra một số API nhằm để triển khai lưu trữ file(img, video, ...)**

<div align="center" >
    <a href="https://google-drive-api-production-583b.up.railway.app/"><b>Website Demo</b></a>
</div>

## Giới thiệu API

Hiện tại đang có 6 API (cập nhật thêm sau)

- `/upload` : dùng để upload file lên ***my drive***
- `/delete` : dùng để xóa file theo ***fileID***
- `/public` : dùng để public file theo ***fileID hoặc folderID***
- `/create-folder` : dùng để tạo folder
- `/upload-in-folder` : dùng để upload file vào trong một thư mục ***theo folderID (mặc định sẽ vào mydrive)***
- `/upload-public` : dùng để upload file và public nó lên ***my drive***

## Cách sử dụng

- Đầu tiên bạn hãy đọc file [`.env sample`](/.env%20sample) và tạo một file `.env` thêm các key cần thiết như `CLIENT_ID`, `CLIENT_SECRET`, `REDIRECT`, `REFRESH_TOKEN`.
- Mặc định website demo đang lưu vào drive của mình.
- Ở đây mình dùng fetch để gọi API.

---

- API [UPLOAD](/src/app/controllers/upload.controllers.js) :
>Nhận vào file
```js
var file = document.getElementById('file')
var _file = file.files[0]
let formData = new FormData()
formData.append('file', _file)

var requestOptions = {
    method: 'POST',
    body: formData,
    redirect: 'follow'
};
```
>Trả lại (true)
```json
{
  "id": "id của file",
  "message": "Upload successfully!"
}
```
>Trả lại (false)
```json
{
  "status": "missing",
  "message": "Upload failed - missing files!"
}
```
---
- API [DELETE](/src/app/controllers/delete.controllers.js) :
>Nhận vào id của file cần xóa truyền theo params `/api/delete/:id`
```js
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

fetch(`http://localhost:3333/api/delete/${id}`, requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}
```
>Trả lại (true)
```json
{
  "status": "OK",
  "message": "Delete successfully!"
}
```
>Trả lại (false)

Nếu không nhập
```json
{
  "error": "Not found"
}
```
Nếu nhập sai
```json
{
  "error": "File not found: ..."
}
```
---
- API [PUBLIC](/src/app/controllers/public.controllers.js) :
>Nhận vào id của file cần public
```js
var id = document.getElementById('public').value
let formData = new FormData()
formData.append('id', id)

var requestOptions = {
    method: 'POST',
    body: formData,
    redirect: 'follow'
};
```
>Trả lại (true)
```json
{
  "status": "OK",
  "message": "Public successfully!",
  "data": {
    "webContentLink": "link download",
    "webViewLink": "link view"
  },
  "id": "id của file"
}
```
>Trả lại (false)

Nếu không nhập
```json
{
  "error": "Not found"
}
```
Nếu nhập sai
```json
{
  "error": "File not found: ..."
}
```
---
- API [CREATE-FOLDER](/src/app/controllers/create_folder.controllers.js) :
>Nhận vào tên của folder muốn tạo, nếu không truyền gì thì mặc định sẽ là "New Folder"
```js
var name = document.getElementById('filename_create_folder').value
let formData = new FormData();
formData.append('name', name);

var requestOptions = {
    method: 'POST',
    body: formData,
    redirect: 'follow'
};
```
>Trả lại (true)
```json
{
  "status": "OK",
  "message": "Create folder successfully!",
  "data": {
    "id": "id của folder vừa tạo",
    "kind": "drive#file",
    "mimeType": "application/vnd.google-apps.folder",
    "name": "tên của folder(mặc định là New Folder)"
  }
}
```
---
- API [UPLOAD-IN-FOLDER](/src/app/controllers/upload_in_folder.controllers.js) :
>Nhận vào file và id của folder muốn upload, mặc định nếu không truyền id thì sẽ upload vào(my dive)
```js
var file = document.getElementById('file_upload_in_folder')
var id_upload_in_folder = document.getElementById('id_upload_in_folder').value
var _file = file.files[0]
let formData = new FormData();
if(!id_upload_in_folder){
    formData.append('file', _file)
}else{
    formData.append('file', _file)
    formData.append('id', id_upload_in_folder)
}

var requestOptions = {
    method: 'POST',
    body: formData,
    redirect: 'follow'
};
```
>Trả lại (true)
```json
{
  "status": "OK",
  "message": "Upload successfully!",
  "id": "id của file"
}
```
>Trả lại (false)
```json
{
  "message": "Upload failed!"
}
```
---
- API [UPLOAD-PUBLIC](/src/app/controllers/upload_public.controllers.js) :
>Nhận vào file
```js
var file = document.getElementById('file_upload_public')
var _file = file.files[0]
let formData = new FormData();
formData.append('file', _file);

var requestOptions = {
    method: 'POST',
    body: formData,
    redirect: 'follow'
};
```
>Trả lại (true)
```json
{
  "status": "OK",
  "message": "Upload and Public successfully!",
  "data": {
    "webContentLink": "link download",
    "webViewLink": "link view"
  },
  "id": "id của file"
}
```
>Trả lại (false)
```json
{
  "message": "Upload failed - missing files",
  "status": "missing"
}

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

```js
function HelloMessage({ name }) {
  return <div>Hello {name}</div>;
}

ReactDOM.render(
  <HelloMessage name="Taylor" />,
  document.getElementById('container')
);
```
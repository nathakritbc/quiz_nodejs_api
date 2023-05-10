# ข้อสอบ Backend (09/10/65) พัฒนาด้วย (Nodejs Express)

## Postman Doc Collection Link

- https://api.postman.com/collections/21024510-897d29b5-afa3-4065-88ff-0d8026b14cff?access_key=PMAT-01H00NDMJ1W3EWF6C1DF84D3K0

## ส่วนที่ 1

### สร้าง Project ที่ใช้ Nodejs Express

- api สามารถ สมัครสมาชิกได้
  <br/>

  #### api apth : POST http://localhost:8090/api/auth/register

  #### Json Body

  ```JSON
  {
  "u_email": "user3@gmail.com",
  "u_password": "user3@123",
  "u_full_name": "user3 u_full_name",
  "u_tel": "0631033207",
  "u_address": "u_address3 u_address3",
  "u_role": "USER"
  }

  ```

  <img src='/images-doc/register-auth.png'  />

- api สามารถ Login ได้
  <br/>

  #### api apth : POST http://localhost:8090/api/auth/register

  #### Json Body

  ```JSON
  {
    "u_email": "user@gmail.com",
    "u_password": "user@123"
  }

  ```

    <img src='/images-doc/login-auth.png'  />

  \*\* เมื่อ login success จะสามารถนำ token ไปใช้งานเพื่อ authentication bearer token ใช้กับ api ส่วนอื่นๆ ได้เป็นเวลา 1 วัน token จะหมดอายุ

- api สามารถ อับรูปภาพได้
  <br/>

  #### api apth : POST form-data http://localhost:8090/api/uploads/image

     <img src='/images-doc/upload-image.png'  />

  \*\* upload image ผ่าน form ของ user โดยใช้ key image เพื่อใช้ในการ upload image เมื่อ upload sucess จะได้ ชื่อใหม่ของ รูปภาพ เพื่อนำไปบันทึกหรือใช้งานอื่นๆต่อไป โดยชื่อจะไม่ซ้ำกับชื่อรูปภาพอื่นๆ โดย response json key 'newImageName'

- ใช้ Nodejs Express access token api

\*\* ทดสอบใช้ Token ที่ login มา เพื่อใช้ในการ GET ข้อมูล Products ผ่าน GET PATH : http://localhost:8090/api/products

<img src='/images-doc/token-login.png'  />
<img src='/images-doc/token-auth.png'  />

- หรือว่า ใช้ CURL

```CURL
curl --location 'http://localhost:8090/api/products' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkyYzg1NDcyLTVlYjQtNGRiOS04ZmUzLTQzNmY3OWFkMjViOSIsInVfZW1haWwiOiJ1c2VyQGdtYWlsLmNvbSIsInVfcm9sZSI6IlVTRVIiLCJpYXQiOjE2ODM3MDg4NzUsImV4cCI6MTY4Mzc5NTI3NX0.Io0nNAYu8fwUF7HIcwlQv_CIudubBcHz6uvqu-r6hIQ'
```

## ส่วนที่ 2

1. ให้อธิบายว่าจะใช้วิธีการอะไรได้บ้างในการป้องกัน brute
force attack หรือเดารหัสผ่านใน login form
<hr/>
   วิธีที่ 1 ใช้ library node modules Joi ในการ Validate body request ที่ถูกส่งมา เพื่อกรอง Body ที่ถูกส่งมา ไม่ให้ส่งค่าต้องห้าม หรือ code ที่อาจจะเป็นอันตรายต่อระบบ ป้องกันการถูก brute
   force attack ได้อีกระดับ
   - Doc Joi https://joi.dev/
<img src='./images-doc/joi--loginvalidate.png' />

2. จงเขียนตัวอย่าง sql query ในโค้ด php โดยให้มีชุดคำสั่ง
   ที่ช่วยป้องกัน sql injection (ตั้งชื่อตารางชื่อฟิลด์ด้วยตัวเอง
   ได้เลย)
3. จงเขียน saI query ที่มี sub query ในตำแหน่งต่างๆ อย่าง
   น้อยสองแบบ (ตั้งชื่อตารางชื่อฟิลด์ด้วยตัวเองได้เลย)
4. จากตาราง tb_product(id,name,status,shop_id) และ
   tb_shop(id,name)
   จงเขียน โค้ด select เพื่อแสดงสินค้าของร้าน ที่มีชื่อร้าน "rudy
   shop"
5. เขียนคำสั่ง update สินค้าทุกตัวของร้าน "rudy shop" ให้
   มี status='0'
6. จงเขียน function ของ code sql เพื่อปรับรูปแบบการ select ข้อมูล ตามประเภทข้อมูลดังนี้เพื่อให้ได้ผลลัพธืดังตัวอย่าง
   type date ให้แสดงผลเป็น dd/mm/YYYY
   type float,double ให้แสดงผลเป็น x,xxx,xxx.xx
   (สามารถเขียนได้มากกว่า 2 ข้อที่ยกตัวอย่าง)
7. จงเขียน code function php ในการคำนวณผลลัพธ์ใบเสนอราคาโดยหัวข้อมีดังนี้
   ราคาสินค้ารวม = สามารถตั้งเองได้
   ส่วนลดรวม = สามารถตั้งเองได้
   ราคาสินค้าหลังส่วนลด
   ภาษีมูลค่าเพิ่ม 7 %
   ราคารวมสุทธิ
   (ถ้าใช้ framework zend laravel node.js จะพิจารณาเป็นพิเศษ)

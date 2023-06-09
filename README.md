# ข้อสอบ Backend (09/10/65) พัฒนาด้วย (Nodejs Express)

## Postman Doc Collection Link

- https://api.postman.com/collections/21024510-897d29b5-afa3-4065-88ff-0d8026b14cff?access_key=PMAT-01H00NDMJ1W3EWF6C1DF84D3K0

## Postman Doc

- https://documenter.getpostman.com/view/21024510/2s93eZyBeG

# ENV

```env
HOST=127.0.0.1
USER=postgres
PASSWORD=12345678
DB=quiz_nodejs_api
DIALECT=postgres
PORT=8090
SECRETORKEY=sd-aaaalfkhsldfjnsdkf,gj.Dkjgdz/-=lffhj&x.glkjgb,kdfjlskd,k
```

## npm script

1. npm install
2. npm run dev

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
  <hr/>

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

  <hr/>

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
   - วิธีที่ 1 ใช้ library node modules Joi ในการ Validate body request ที่ถูกส่งมา เพื่อกรอง Body ที่ถูกส่งมา ไม่ให้ส่งค่าต้องห้าม หรือ code ที่อาจจะเป็นอันตรายต่อระบบ ป้องกันการถูก brute
   force attack ได้อีกระดับ
   - Doc Joi https://joi.dev/
   <hr/>
<img src='./images-doc/joi--loginvalidate.png' />

- วิธีที่ 2 เขียนโค้ดดักการป้องกันการเดารหัส คือเมื่อใส่รหัสผ่านผิดเกินจำนวน 5 ครั้ง จะล็อก User ไม่ให้สามารถใช้ User นั้นได้ชั่วคราวจนกว่าจะ ได้การปลดบล็อกเเละตรวจสอบจาก Admin เเละเก็บ Log การเข้าสู่ระบบทุกครั้ง เพื่อใช้ในการตรวจสอบการเข้าใช้งานที่ผิดปกติของ User เเละเพื่อป้องกันการเดารหัสผ่าน

<img src='/images-doc/pass-incorrect.png'/>
<img src='/images-doc/pass-incorrect2.png'/>
<img src='/images-doc/pass-incorrect3.png'/>
<hr/>

#### login logging

<img src='/images-doc/login-logging.png'/>
<hr/>

- วิธีที่ 3 ใช้ Node Module ORM (Object-Relational mapping) ในการจัดการกับฐานข้อมูล ซึ่งในโปรเจ็กนี้ใช้ sequelize ในการจัดการกับ Database โดย sequelize ระบบความปลอดภัยการป้องกันฐานข้อมูล ป้องงกันการทำ sql injection เพื่อเดารหัสผ่านได้พอสมควร เเละช่วยป้องกันการโดน brute
  force attack

  \*\* Sequelize Doc https://sequelize.org/

  <hr/>

- วิธีที่ 4 การตั้ง id เป็น type uuid เผื่อป้องกะนการเดา id ของ table เวลา query data ผ่าน params หรือ เพิ่ม ลบ data ผ่าน params

  <hr/>

  <img src='/images-doc/a1.png' />

  <hr/>

- วิธีที่ 5 คือการ hash รหัสผ่านก่อนบันทึกลง ฐานข้อมูล

  <hr/>

  <img src='/images-doc/hashing-password.png' />

  <hr/>

```javascript
module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("products", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      // autoIncrement: true,
      allowNull: false,
    },
```

  <hr/>

2. จงเขียนตัวอย่าง sql query ชุดคำสั่ง
ที่ช่วยป้องกัน sql injection (ตั้งชื่อตารางชื่อฟิลด์ด้วยตัวเอง
ได้เลย)
<hr/>

\*\* ในโปรเจ็กนี้ใช้ sequelize ORM ในการจัดการกับฐานข้อมูลซึ่งสามารถป้องกัน sql injection ได้อย่างมีประสิทธิ์ภาพ ยกตัวอย่าง

```javascript
const attributes = ["id", "p_name", "p_price", "p_status"];
const where = {
  [Op.and]: [
    {
      p_price: {
        [Op.gt]: 50,
      },
    },
    { p_status: true },
  ],
};

const result = await Product.findAll({
  order: [["createdAt", "DESC"]],
  where,
  attributes,
  offset: query._page,
  limit: query._limit,
});
```

<hr/>

3. จงเขียน saI query ที่มี sub query ในตำแหน่งต่างๆ อย่าง
น้อยสองแบบ (ตั้งชื่อตารางชื่อฟิลด์ด้วยตัวเองได้เลย)
<hr/>

\*\* code query เลือก field ที่ต้องการ select เเล้วสร้าง sub query select สินค้า ราคา มากกว่า 50 เเละสินค้าที่ p_status เป็น true

<hr/>
#### code

```javascript
exports.findByAttributesAndSubQuery = async (req, res) => {
  try {
    let { query } = req;

    let queryParams = {
      ...query,
    };

    if (queryParams._page) {
      delete queryParams._page;
    }

    if (queryParams._limit) {
      delete queryParams._limit;
    }

    const attributes = ["id", "p_name", "p_price", "p_status"];
    const where = {
      [Op.and]: [
        {
          p_price: {
            [Op.gt]: 50,
          },
        },
        { p_status: true },
      ],
    };

    const result = await Product.findAll({
      order: [["createdAt", "DESC"]],
      where,
      attributes,
      // include: [{ model: Shop }],
      offset: query._page,
      limit: query._limit,
    });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(404).json({
      message: constants.kResultNok,
    });
  }
};
```

<hr/>
<img src='/images-doc/findByAttributesAndSubQueries.png' />
<hr/>

#### ผลลัพธ์

<hr/>
<img src='/images-doc/findByAttributesAndSubQueries-res.png' />
<hr/>

```javascript
[
  {
    id: "acc37fbf-35e5-499a-9e28-659f08c7eef0",
    p_name: "p3",
    p_price: 65.65,
    p_status: true,
  },
  {
    id: "e8b7fb3f-1aa1-431f-90c1-4cc8826fa34b",
    p_name: "p2",
    p_price: 99.888,
    p_status: true,
  },
];
```

<hr/>
4. จากตาราง products(id,p_name,p_status,shop_id) และ
shops(id,name)
จงเขียน โค้ด select เพื่อแสดงสินค้าของร้าน ที่มีชื่อร้าน "rudy
shop"
<hr/>

```CURL
curl --location 'http://localhost:8090/api/products/findByShopName/rudy shop' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkyYzg1NDcyLTVlYjQtNGRiOS04ZmUzLTQzNmY3OWFkMjViOSIsInVfZW1haWwiOiJ1c2VyQGdtYWlsLmNvbSIsInVfcm9sZSI6IlVTRVIiLCJpYXQiOjE2ODM2NDY4MjQsImV4cCI6MTY4MzczMzIyNH0.EE3-CCXiE7W7SueEki8XL9EMeXIkGVFt9xcrsOhuwjY' \
--header 'Cookie: connect.sid=s%3ALMKFmVzl-Wn7XG2O8Nyaa0p02hamE-Vw.d4Hr9sEvaMOyUPtKN23nwLWRyywKNODP8Etm8gwS2%2B0'
```

<hr/>
<img src='/images-doc/findByShopName-get.png'/>
<hr/>

### Response data

```JSON
[
    {
        "id": "1a4bbe7f-9106-42a3-bc5c-c39ffce7d950",
        "p_name": "p2",
        "p_price": 24,
        "p_amount": 55,
        "p_image": "b2fc5af2-9af0-4609-a87a-3d986f8d84aa6.png",
        "p_status": false,
        "p_date_of_manufacture": "2023-05-22",
        "createdAt": "2023-05-10T04:42:00.290Z",
        "updatedAt": "2023-05-10T09:49:38.896Z",
        "productTypeId": "e97a8855-086e-4fbe-910f-9c12badd1c2f",
        "shopId": "5845a852-5815-40f2-b62d-39212e00cede",
        "shop": {
            "id": "5845a852-5815-40f2-b62d-39212e00cede",
            "name": "rudy shop",
            "createdAt": "2023-05-09T15:55:45.013Z",
            "updatedAt": "2023-05-09T15:55:45.013Z"
        }
    },
    {
        "id": "bedb8279-ef12-4704-9da6-ff52e594a2b3",
        "p_name": "p1",
        "p_price": 55.02,
        "p_amount": 78,
        "p_image": "9419b17a-b923-48a6-a660-16252ff009cd6.png",
        "p_status": false,
        "p_date_of_manufacture": "2019-08-13",
        "createdAt": "2023-05-09T16:07:43.572Z",
        "updatedAt": "2023-05-10T09:49:38.896Z",
        "productTypeId": "0eaee8c7-54a0-4540-bec9-a50f9ddc1715",
        "shopId": "5845a852-5815-40f2-b62d-39212e00cede",
        "shop": {
            "id": "5845a852-5815-40f2-b62d-39212e00cede",
            "name": "rudy shop",
            "createdAt": "2023-05-09T15:55:45.013Z",
            "updatedAt": "2023-05-09T15:55:45.013Z"
        }
    }
]
```

<hr/>
<img src='/images-doc/findByShopName-code.png'/>

<hr/>

5. เขียนคำสั่ง update สินค้าทุกตัวของร้าน "rudy shop" ให้
มี status='0'
<hr/>
<img src='/images-doc/updateProductByShopNameAndStatus-rudy-shop-db-old.png' />
<hr/>
<img src='/images-doc/updateProductByShopNameAndStatus-rudy-shop-code.png'/>
<hr/>

```CURL
curl --location 'http://localhost:8090/api/products/findByShopName/rudy shop' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkyYzg1NDcyLTVlYjQtNGRiOS04ZmUzLTQzNmY3OWFkMjViOSIsInVfZW1haWwiOiJ1c2VyQGdtYWlsLmNvbSIsInVfcm9sZSI6IlVTRVIiLCJpYXQiOjE2ODM2NDY4MjQsImV4cCI6MTY4MzczMzIyNH0.EE3-CCXiE7W7SueEki8XL9EMeXIkGVFt9xcrsOhuwjY' \
--header 'Cookie: connect.sid=s%3ALMKFmVzl-Wn7XG2O8Nyaa0p02hamE-Vw.d4Hr9sEvaMOyUPtKN23nwLWRyywKNODP8Etm8gwS2%2B0'
```

<hr/>
<img src='/images-doc/updateProductByShopNameAndStatus-rudy-shop-update.png'/>
<hr/>
<img src='/images-doc/updateProductByShopNameAndStatus-rudy-shop-db-new.png' />
<hr/>

6. จงเขียน function ของ code sql เพื่อปรับรูปแบบการ select ข้อมูล ตามประเภทข้อมูลดังนี้เพื่อให้ได้ผลลัพธืดังตัวอย่าง
type date ให้แสดงผลเป็น dd/mm/YYYY
type float,double ให้แสดงผลเป็น x,xxx,xxx.xx
(สามารถเขียนได้มากกว่า 2 ข้อที่ยกตัวอย่าง)
<hr/>

### code

```javascript
exports.findAllFormatCustom = async (req, res) => {
  try {
    let { query } = req;

    let queryParams = {
      ...query,
    };

    if (queryParams._page) {
      delete queryParams._page;
    }

    if (queryParams._limit) {
      delete queryParams._limit;
    }

    const result = await Product.findAll({
      order: [["createdAt", "DESC"]],
      where: queryParams,
      include: [{ model: Shop }],
      offset: query._page,
      limit: query._limit,
    });

    const newFormatResult = result.map((value) => {
      const p_price = Number(value.dataValues.p_price.toFixed(2));
      const d = new Date(value.dataValues.p_date_of_manufacture);

      const p_date_of_manufacture_en = `${d
        .getDate()
        .toString()
        .padStart(2, "0")}/${Number(d.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${d.getFullYear()}`;

      const p_date_of_manufacture_th = `${d
        .getDate()
        .toString()
        .padStart(2, "0")}/${Number(d.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${d.getFullYear() + 543}`;

      return {
        ...value.dataValues,
        p_price,
        p_date_of_manufacture_en,
        p_date_of_manufacture_th,
      };
    });

    res.status(200).json({
      oldFormatResult: result,
      newFormatResult,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({
      message: constants.kResultNok,
    });
  }
};
```

### ผลลัพธ์

\*\* format เดิม

<hr/>
<img src='/images-doc/findAllFormatCustoms-.png' />
<hr/>

\*\* format ใหม่

<hr/>
<img src='/images-doc/findAllFormatCustoms-new.png' />
<hr/>

```JSON
{
    "oldFormatResult": [
        {
            "id": "e8b7fb3f-1aa1-431f-90c1-4cc8826fa34b",
            "p_name": "p2",
            "p_price": 99.888,
            "p_amount": 55,
            "p_image": "6194857a-3a32-412b-ade7-9c2fada55b31Screenshot 2023-04-30 152522.png",
            "p_status": true,
            "p_date_of_manufacture": "2021-01-22",
            "createdAt": "2023-05-10T05:35:35.980Z",
            "updatedAt": "2023-05-10T05:35:35.980Z",
            "productTypeId": "e97a8855-086e-4fbe-910f-9c12badd1c2f",
            "shopId": "ed38e1f6-659b-4e67-91f9-cba4a822dbb5",
            "shop": {
                "id": "ed38e1f6-659b-4e67-91f9-cba4a822dbb5",
                "name": "shop1_update",
                "createdAt": "2023-05-09T16:02:54.864Z",
                "updatedAt": "2023-05-09T16:03:18.148Z"
            }
        },
        {
            "id": "f514a0ea-704e-4223-88a2-2f2c06759a79",
            "p_name": "p2",
            "p_price": 24,
            "p_amount": 55,
            "p_image": "6f3b7140-d09b-4c76-a864-e2cb6a1f1db9Screenshot 2023-04-30 152522.png",
            "p_status": true,
            "p_date_of_manufacture": "2022-09-03",
            "createdAt": "2023-05-10T05:33:29.048Z",
            "updatedAt": "2023-05-10T05:33:29.048Z",
            "productTypeId": "e97a8855-086e-4fbe-910f-9c12badd1c2f",
            "shopId": "ed38e1f6-659b-4e67-91f9-cba4a822dbb5",
            "shop": {
                "id": "ed38e1f6-659b-4e67-91f9-cba4a822dbb5",
                "name": "shop1_update",
                "createdAt": "2023-05-09T16:02:54.864Z",
                "updatedAt": "2023-05-09T16:03:18.148Z"
            }
        },
        {
            "id": "679684c6-a612-457c-8fbb-237baa600199",
            "p_name": "p3",
            "p_price": 46.1,
            "p_amount": 25,
            "p_image": "b690f86e-bfef-4af0-96cf-2d8cb57e4ce1Screenshot 2023-04-30 152522.png",
            "p_status": true,
            "p_date_of_manufacture": "2021-07-19",
            "createdAt": "2023-05-10T04:43:05.083Z",
            "updatedAt": "2023-05-10T04:43:05.083Z",
            "productTypeId": "e97a8855-086e-4fbe-910f-9c12badd1c2f",
            "shopId": "ed38e1f6-659b-4e67-91f9-cba4a822dbb5",
            "shop": {
                "id": "ed38e1f6-659b-4e67-91f9-cba4a822dbb5",
                "name": "shop1_update",
                "createdAt": "2023-05-09T16:02:54.864Z",
                "updatedAt": "2023-05-09T16:03:18.148Z"
            }
        },
        {
            "id": "1a4bbe7f-9106-42a3-bc5c-c39ffce7d950",
            "p_name": "p2",
            "p_price": 24,
            "p_amount": 55,
            "p_image": "b2fc5af2-9af0-4609-a87a-3d986f8d84aa6.png",
            "p_status": false,
            "p_date_of_manufacture": "2023-05-22",
            "createdAt": "2023-05-10T04:42:00.290Z",
            "updatedAt": "2023-05-10T09:49:38.896Z",
            "productTypeId": "e97a8855-086e-4fbe-910f-9c12badd1c2f",
            "shopId": "5845a852-5815-40f2-b62d-39212e00cede",
            "shop": {
                "id": "5845a852-5815-40f2-b62d-39212e00cede",
                "name": "rudy shop",
                "createdAt": "2023-05-09T15:55:45.013Z",
                "updatedAt": "2023-05-09T15:55:45.013Z"
            }
        },
        {
            "id": "bedb8279-ef12-4704-9da6-ff52e594a2b3",
            "p_name": "p1",
            "p_price": 55.02,
            "p_amount": 78,
            "p_image": "9419b17a-b923-48a6-a660-16252ff009cd6.png",
            "p_status": false,
            "p_date_of_manufacture": "2019-08-13",
            "createdAt": "2023-05-09T16:07:43.572Z",
            "updatedAt": "2023-05-10T09:49:38.896Z",
            "productTypeId": "0eaee8c7-54a0-4540-bec9-a50f9ddc1715",
            "shopId": "5845a852-5815-40f2-b62d-39212e00cede",
            "shop": {
                "id": "5845a852-5815-40f2-b62d-39212e00cede",
                "name": "rudy shop",
                "createdAt": "2023-05-09T15:55:45.013Z",
                "updatedAt": "2023-05-09T15:55:45.013Z"
            }
        }
    ],
    "newFormatResult": [
        {
            "id": "e8b7fb3f-1aa1-431f-90c1-4cc8826fa34b",
            "p_name": "p2",
            "p_price": 99.89,
            "p_amount": 55,
            "p_image": "6194857a-3a32-412b-ade7-9c2fada55b31Screenshot 2023-04-30 152522.png",
            "p_status": true,
            "p_date_of_manufacture": "2021-01-22",
            "createdAt": "2023-05-10T05:35:35.980Z",
            "updatedAt": "2023-05-10T05:35:35.980Z",
            "productTypeId": "e97a8855-086e-4fbe-910f-9c12badd1c2f",
            "shopId": "ed38e1f6-659b-4e67-91f9-cba4a822dbb5",
            "shop": {
                "id": "ed38e1f6-659b-4e67-91f9-cba4a822dbb5",
                "name": "shop1_update",
                "createdAt": "2023-05-09T16:02:54.864Z",
                "updatedAt": "2023-05-09T16:03:18.148Z"
            },
            "p_date_of_manufacture_en": "22/01/2021",
            "p_date_of_manufacture_th": "22/01/2564"
        },
        {
            "id": "f514a0ea-704e-4223-88a2-2f2c06759a79",
            "p_name": "p2",
            "p_price": 24,
            "p_amount": 55,
            "p_image": "6f3b7140-d09b-4c76-a864-e2cb6a1f1db9Screenshot 2023-04-30 152522.png",
            "p_status": true,
            "p_date_of_manufacture": "2022-09-03",
            "createdAt": "2023-05-10T05:33:29.048Z",
            "updatedAt": "2023-05-10T05:33:29.048Z",
            "productTypeId": "e97a8855-086e-4fbe-910f-9c12badd1c2f",
            "shopId": "ed38e1f6-659b-4e67-91f9-cba4a822dbb5",
            "shop": {
                "id": "ed38e1f6-659b-4e67-91f9-cba4a822dbb5",
                "name": "shop1_update",
                "createdAt": "2023-05-09T16:02:54.864Z",
                "updatedAt": "2023-05-09T16:03:18.148Z"
            },
            "p_date_of_manufacture_en": "03/09/2022",
            "p_date_of_manufacture_th": "03/09/2565"
        },
        {
            "id": "679684c6-a612-457c-8fbb-237baa600199",
            "p_name": "p3",
            "p_price": 46.1,
            "p_amount": 25,
            "p_image": "b690f86e-bfef-4af0-96cf-2d8cb57e4ce1Screenshot 2023-04-30 152522.png",
            "p_status": true,
            "p_date_of_manufacture": "2021-07-19",
            "createdAt": "2023-05-10T04:43:05.083Z",
            "updatedAt": "2023-05-10T04:43:05.083Z",
            "productTypeId": "e97a8855-086e-4fbe-910f-9c12badd1c2f",
            "shopId": "ed38e1f6-659b-4e67-91f9-cba4a822dbb5",
            "shop": {
                "id": "ed38e1f6-659b-4e67-91f9-cba4a822dbb5",
                "name": "shop1_update",
                "createdAt": "2023-05-09T16:02:54.864Z",
                "updatedAt": "2023-05-09T16:03:18.148Z"
            },
            "p_date_of_manufacture_en": "19/07/2021",
            "p_date_of_manufacture_th": "19/07/2564"
        },
        {
            "id": "1a4bbe7f-9106-42a3-bc5c-c39ffce7d950",
            "p_name": "p2",
            "p_price": 24,
            "p_amount": 55,
            "p_image": "b2fc5af2-9af0-4609-a87a-3d986f8d84aa6.png",
            "p_status": false,
            "p_date_of_manufacture": "2023-05-22",
            "createdAt": "2023-05-10T04:42:00.290Z",
            "updatedAt": "2023-05-10T09:49:38.896Z",
            "productTypeId": "e97a8855-086e-4fbe-910f-9c12badd1c2f",
            "shopId": "5845a852-5815-40f2-b62d-39212e00cede",
            "shop": {
                "id": "5845a852-5815-40f2-b62d-39212e00cede",
                "name": "rudy shop",
                "createdAt": "2023-05-09T15:55:45.013Z",
                "updatedAt": "2023-05-09T15:55:45.013Z"
            },
            "p_date_of_manufacture_en": "22/05/2023",
            "p_date_of_manufacture_th": "22/05/2566"
        },
        {
            "id": "bedb8279-ef12-4704-9da6-ff52e594a2b3",
            "p_name": "p1",
            "p_price": 55.02,
            "p_amount": 78,
            "p_image": "9419b17a-b923-48a6-a660-16252ff009cd6.png",
            "p_status": false,
            "p_date_of_manufacture": "2019-08-13",
            "createdAt": "2023-05-09T16:07:43.572Z",
            "updatedAt": "2023-05-10T09:49:38.896Z",
            "productTypeId": "0eaee8c7-54a0-4540-bec9-a50f9ddc1715",
            "shopId": "5845a852-5815-40f2-b62d-39212e00cede",
            "shop": {
                "id": "5845a852-5815-40f2-b62d-39212e00cede",
                "name": "rudy shop",
                "createdAt": "2023-05-09T15:55:45.013Z",
                "updatedAt": "2023-05-09T15:55:45.013Z"
            },
            "p_date_of_manufacture_en": "13/08/2019",
            "p_date_of_manufacture_th": "13/08/2562"
        }
    ]
}
```

<hr/>

7. จงเขียน code function php ในการคำนวณผลลัพธ์ใบเสนอราคาโดยหัวข้อมีดังนี้
   ราคาสินค้ารวม = สามารถตั้งเองได้
   ส่วนลดรวม = สามารถตั้งเองได้
   ราคาสินค้าหลังส่วนลด
   ภาษีมูลค่าเพิ่ม 7 %
   ราคารวมสุทธิ

#### Code

```javascript
const constants = require("../constants");

exports.calculateQuotation = async (req, res) => {
  try {
    const products = [
      { p_name: "ปลากระป๋อง", p_price: 25, p_amount: 5, discount: 5 },
      { p_name: "มาม่า", p_price: 6, p_amount: 500, discount: 25 },
      { p_name: "ยางลบ", p_price: 2, p_amount: 1570, discount: 3 },
      { p_name: "ไข่ไก่", p_price: 3, p_amount: 2590, discount: 2 },
      { p_name: "น้ำเปล่า", p_price: 7, p_amount: 5578, discount: 31 },
    ];

    let total_price = 0;
    let total_discount = 0;
    const productSum = products.map((value) => {
      const p_sum = value.p_price * value.p_amount;
      const sum_discount = p_sum * (value.discount / 100);
      total_price = total_price + p_sum;
      total_discount = total_discount + sum_discount;

      return {
        ...value,
        sum_discount,
        p_sum,
      };
    });
    const vat = 0.07;
    const tato_price_after_discount = total_price - total_discount;
    const tato_vat = tato_price_after_discount * vat;
    const total_net_price = tato_price_after_discount - tato_vat;
    const result = {
      productAll: productSum,
      total_price,
      total_discount,
      vat: 0.07,
      tato_price_after_discount,
      tato_vat,
      total_net_price,
    };

    res.status(200).send({
      message: constants.kResultOk,
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({
      message: constants.kResultNok,
    });
  }
};
```

#### Test API

```CURL
curl --location 'http://localhost:8090/api/calculateQuotation' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkyYzg1NDcyLTVlYjQtNGRiOS04ZmUzLTQzNmY3OWFkMjViOSIsInVfZW1haWwiOiJ1c2VyQGdtYWlsLmNvbSIsInVfcm9sZSI6IlVTRVIiLCJpYXQiOjE2ODM2NDUwNjMsImV4cCI6MTY4MzczMTQ2M30.00sGai5bqmmvjGpn5Y4-K9eZ1A1WyEDET4ZxT4srEBw' \
--header 'Cookie: connect.sid=s%3AxI8Z5sGLaIlqP3lPd67dnDsO4PqgBU80.FSQLSLYJa%2FDujEvVhUE%2F4tJput7P4zCTz0dSjIcIwsw'
```

#### ผลลัพธ์

```JSON
{
    "message": "ok",
    "result": {
        "productAll": [
            {
                "p_name": "ปลากระป๋อง",
                "p_price": 25,
                "p_amount": 5,
                "discount": 5,
                "sum_discount": 6.25,
                "p_sum": 125
            },
            {
                "p_name": "มาม่า",
                "p_price": 6,
                "p_amount": 500,
                "discount": 25,
                "sum_discount": 750,
                "p_sum": 3000
            },
            {
                "p_name": "ยางลบ",
                "p_price": 2,
                "p_amount": 1570,
                "discount": 3,
                "sum_discount": 94.2,
                "p_sum": 3140
            },
            {
                "p_name": "ไข่ไก่",
                "p_price": 3,
                "p_amount": 2590,
                "discount": 2,
                "sum_discount": 155.4,
                "p_sum": 7770
            },
            {
                "p_name": "น้ำเปล่า",
                "p_price": 7,
                "p_amount": 5578,
                "discount": 31,
                "sum_discount": 12104.26,
                "p_sum": 39046
            }
        ],
        "total_price": 53081,
        "total_discount": 13110.11,
        "vat": 0.07,
        "tato_price_after_discount": 39970.89,
        "tato_vat": 2797.9623,
        "total_net_price": 37172.9277
    }
}
```

# Webapp Assignments

## DEMO
- [backend](https://66011352-api.vercel.app)
- [client](https://66011352-client.vercel.app)

## โครงสร้างไดเรกทอรี
- `backend/` โค้ดฝั่งเซิร์ฟเวอร์ Express.js
- `client/` โค้ดฝั่งผู้ใช้ React + Vite

## ความต้องการเบื้องต้น
- Node.js เวอร์ชัน 18 ขึ้นไป
- ติดตั้ง `npm` (มากับ Node.js) และ `yarn` สำหรับจัดการแพ็กเกจ

## การตั้งค่า Environment Variables

สร้างไฟล์ `.env` ในแต่ละส่วนให้เรียบร้อยก่อนเริ่มใช้งาน

### Backend (`backend/.env`)
```ini
PORT=3000
DRONE_CONFIG_URL=
DRONE_LOG_URL=
DRONE_LOG_TOKEN=
```
- `PORT`  พอร์ตเริ่มตั้นที่ 3000
- `DRONE_CONFIG_URL` URL สำหรับดึงข้อมูล Config ของโดรน
- `DRONE_LOG_URL` URL สำหรับดึง/บันทึก Log ของโดรน
- `DRONE_LOG_TOKEN` Token สำหรับเข้าถึงบริการ Log

### Client (`client/.env`)
```ini
VITE_API_BASE_URL=
VITE_DRONE_ID=
```
- `VITE_API_BASE_URL` ชี้ไปที่ Backend (ค่าเริ่มต้นคือ `http://localhost:3000`)
- `VITE_DRONE_ID` ใช้กำหนดโดรนเริ่มต้นที่จะแสดงบนหน้าเว็บ

## ขั้นตอนการติดตั้ง

### 1. ติดตั้ง Backend
```bash
cd backend
npm install
```

### 2. ติดตั้ง Client
```bash
cd client
yarn install
```

## การใช้งานเบื้องต้น
1. เปิดเทอร์มินัลแรกสำหรับ Backend
   ```bash
   cd backend
   npm run dev
   ```
   เซิร์ฟเวอร์จะเริ่มที่พอร์ต `3000`

2. เปิดเทอร์มินัลที่สองสำหรับ Client
   ```bash
   cd client
   yarn dev
   ```
   Vite Dev Server จะเริ่มที่พอร์ต `5173` (หรือพอร์ตถัดไปหาก 5173 ถูกใช้งาน)

3. เปิดเบราว์เซอร์และเข้า `http://localhost:5173` เพื่อใช้งาน

## ฟีเจอร์หลัก
- แสดงรายละเอียดโดรน เช่น ชื่อ ประเทศ น้ำหนัก และสถานะไฟ
- แสดงประวัติการบันทึกอุณหภูมิของโดรนพร้อมระบบแบ่งหน้า
- เพิ่มบันทึกอุณหภูมิใหม่ผ่านฟอร์มในหน้าเว็บ
- รีเฟรชข้อมูลโดรนและบันทึกด้วยปุ่มสั่งงาน

## API ที่มีให้บริการ (Backend)
- `GET /` ตรวจสอบสถานะของ API
- `GET /configs/:droneId` ดึงค่ากำหนดของโดรน
- `GET /status/:droneId` ดึงเฉพาะสถานะ (`condition`) ของโดรน
- `GET /logs/:droneId?page=<หมายเลขหน้า>` ดึงประวัติการใช้งานโดรน
- `POST /logs` สร้างบันทึกการใช้งานใหม่ (ต้องส่ง `drone_id`, `drone_name`, `country`, `celsius`)

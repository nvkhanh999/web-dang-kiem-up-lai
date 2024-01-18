# web-dang-kiem-up-lai
Bước 1: Tải file về

Bước 2: Tải những framework cần thiết FastAPI, React

Bước 3: Vào pgAdmin tạo database tên INT3306_RegistryTotal

Bước 4: Chuột phải vào Databases > Restore > Chọn file .sql và chờ load

Bước 5: Đổi mật khẩu của postgresql (DATABASE_PASSWORD) trong file .env

Bước 6: Chạy backend
Tạo 1 terminal
cd backend #step 1
& 'venv\Scripts\activate.bat' #step 2 : để chạy file env activate.bat
uvicorn app.main:app #step 3 : chạy app

Bước 7.1: Chạy frontend cho admin
Tạo 1 terminal
cd frontend-admin #step 1
npm start #step 2

Bước 7.2: Chạy frontend cho center
Tạo 1 terminal
cd frontend-center #step 1
npm start #step 2


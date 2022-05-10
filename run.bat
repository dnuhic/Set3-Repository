@ECHO OFF
ECHO Run started...
setlocal
cd /d %~dp0
cd Set3-Backend
ECHO Backend is starting...
start Set3-Backend.exe
cd ..
cd Set3-Frontend
ECHO Frontend is starting...
ECHO Log-in to the application with e-mail: admin@gmail.com password: password
npm start
PAUSE
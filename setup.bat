@ECHO OFF
ECHO Install has started...
setlocal
cd /d %~dp0

cd tmp
call node-check.bat
cd ..
cd Set3-Database
start DatabaseScript.exe
cd ..

cd cert
set SETUP_DIR=%cd%
cd ..
cd Set3-Frontend

set crt=SSL_CRT_FILE=%SETUP_DIR%\set3-frontend.pem
set key=SSL_KEY_FILE=%SETUP_DIR%\set3-frontend.key

echo %crt%
echo %key%
type nul > .env.development.local
echo %crt% >> .env.development.local
echo %key% >> .env.development.local

call refreshenv

echo REACT_APP_BACKEND_URL=https://localhost:7194/ >> .env.development.local
call npm install
call npm update
call npm install 
cd ..
ECHO Install finished.
call run.bat
PAUSE
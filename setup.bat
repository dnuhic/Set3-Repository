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

cd Set3-Frontend

type nul > .env.development.local

call refreshenv

echo REACT_APP_BACKEND_URL=https://localhost:7194/ >> .env.development.local
call npm install
call npm update
call npm install 
cd ..
ECHO Install finished.
call run.bat
PAUSE
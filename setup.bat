@ECHO OFF
ECHO Install has started...
setlocal
cd /d %~dp0
cd Set3-Database
start DatabaseScript.exe
cd ..
cd Set3-Frontend
call npm install
call npm update
call npm install 
cd ..
ECHO Install finished.
call run.bat
PAUSE
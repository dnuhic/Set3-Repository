@ECHO OFF
setlocal
cd /d %~dp0

ECHO "Starting server setup"

ECHO "Checking for docker enviroment..."

cd tmp
call refresh.bat
cd ..


set DOCK_VER=null
docker -v >tmp.txt
set /p DOCK_VER=<tmp.txt
del tmp.txt
echo %DOCK_VER%
::IF %DOCK_VER% == null (
ECHO "Enable Hyper V"
DISM /Online /Enable-Feature /All /FeatureName:Microsoft-Hyper-V
ECHO "Installing docker..."
START /WAIT DockerInstaller.exe
::) ELSE (
::	echo "Docker is already installed. Proceeding ..."
::)
echo "ovdje"
call refreshenv
call docker-compose version
call docker-compose up -d

PAUSE
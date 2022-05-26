@echo off


SETLOCAL
cd /d %~dp0

NET SESSION >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
	echo This setup needs admin permissions. Please run this file as admin.
	pause
	exit
)

call refresh.bat

set NODE_VER=null
set NODE_EXEC=node-v16.13.1-x64.msi
set SETUP_DIR=%cd%
node -v >tmp.txt
set /p NODE_VER=<tmp.txt
del tmp.txt
IF %NODE_VER% == null (
	echo INSTALLING node ...
	cd %SETUP_DIR%/tmp
	START /WAIT %NODE_EXEC%
	cd %SETUP_DIR%
) ELSE (
	echo Node is already installed. Proceeding ...
)

call refreshenv

call npm -v

echo DONE!
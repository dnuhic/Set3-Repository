@ECHO OFF
::TODO
GOTO comment
ECHO "Starting server setup"

ECHO "Checking for docker enviroment..."

IF -x "(docker --version)" (
    ECHO "Docker installed"    
) ELSE (
    ECHO "Installing docker..."
    START /w "" "Docker Desktop Installer.exe" install
)

START docker-compose up
:comment
PAUSE

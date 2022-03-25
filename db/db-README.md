## SCHEMA BAZE

Inicijalna schema baze se nalazi u db-init/ direktoriju i zapisana je u fajlu schema.sql. Ako se bude mijenjala schema baze, trudite se da se svake iduce izmjene zapisuju u schema.sql, tako da svi imamo jednaku verziju baze pri ponovnom pokretanju.

## POKRETANJE I GASENJE BAZE, BRISANJE PODATAKA

Bazu postgresql i njen gui pgadmin pokrecemo sa komandom 'docker-compose up' ili 'docker-compose up -d' u detach mode-u. Bazu gasimo sa komandom 'docker-compose down' ili CTRL + C.
Importovanu schemu i sve podatke u bazi brisemo tako sto obrisemo db-data direktorij(Na linuxu su potrebne root privilegije ex. sudo rm -R db-data/).

## INSTRUKCIJE ZA INSTALACIJU DOCKER-a i DOCKER-COMPOSE-a ZA WINDOWS/MACOS/LINUX

### PREREQUISITES:
Docker engine, Docker client, Docker compose .

### UPUTE:
LINUX: 
WINDOWS: 
MACOS: 

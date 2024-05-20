Uruchamiamy poprzez wykonanie komendy "node app.js" w folderze

test dla api tworzenia rezerwacji (PowershellISE)

Invoke-WebRequest -UseBasicParsing -Uri "http://127.0.0.1:3000/reservations/new" `
-Method "POST" `
-Body "item_id=1&name=restryuy&start_date=2024-05-30T13%3A07&end_date=2024-05-31T13%3A07&comment=ewretrytu";

reszta testowana przez przeglądarkę

/reservations
/items
/items/:id

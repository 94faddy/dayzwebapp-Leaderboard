## This is part of the dayz game I created to show player stats on the website

DEMO: https://dz-preview.phywizard.com/leaderboard

First of all you need to have this mods on your server
https://steamcommunity.com/sharedfiles/filedetails/?id=1758815806&searchtext=leaderboards by: QuickZ

go edit in server.js with notepad++ or vscode or you programs
  ```
const app = express();
const PORT = 3000; // change port webserver other you need
const FTP_HOST = "127.0.0.1"; //  ftp you ip or hostname  
const FTP_PORT = 21; // ftp you port 
const FTP_USER = "dayz"; // ftp you username
const FTP_PASS = "Aa123456";  // ftp you password
  ```
## !!Note

 Please set ftp path to !Server-Profiles\Leaderboard
My ftp example is C:\Program Files (x86)\Steam\steamapps\common\DayZServer\!Server-Profiles\Leaderboard
to be able to read the file Stats-765611xxxxxxxxxxx.json. Set ftp permission to read/write. Please test your ftp before configuring in server.js.

json string example
```
{
    "deaths": [],
    "kills": [],
    "animalsKilled": [],
    "name": "jonnoy",
    "lastTimeSeen": "2025-2-9 18:42:7",
    "deathsToZCount": 0,
    "deathsToNaturalCauseCount": 0,
    "deathsToPlayerCount": 0,
    "deathsToAnimalCount": 0,
    "suicideCount": 0,
    "longestShot": 811,
    "zKilled": 20,
    "timeSurvived": 18326,
    "distTrav": 65111
}
```
Converted Value
https://dz-preview.phywizard.com/data


## install node v16.20.0
https://nodejs.org/en/blog/release/v16.20.0

## install npm command
  ```
1. npm install
2. npm install -g pm2
3. pm2 start server.js --name dayzwebapp

*other command* 
pm2 stop all
pm2 delete all
pm2 flush
pm2 logs
pm2 reload all
pm2 start all
pm2 stop all
pm2 list
```

test run on 

## http://localhost:3000/Leaderboard

Contact me: https://t.me/j0nsz

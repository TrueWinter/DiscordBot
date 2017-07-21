
SET root=%~dp0
CD /D %root%
SETLOCAL EnableDelayedExpansion
node -v >nul 2>&1 || goto :node
git init . >nul || goto :git
git remote add NdT3DiscordBot https://github.com/NdT3Development/DiscordBot.git >nul 2>&1
get fetch NdT3DiscordBot master >nul 2>&1
git remote show NdT3DiscordBot > tmp.txt
set findfile="tmp.txt"
set findtext="up"
findstr %findtext% %findfile% >nul 2>&1
if errorlevel 1 goto forward
goto run

:prompt
	choice /t 10 /c yn /d n /m "There is an update for the bot. Download now?"
	if errorlevel 2 goto :run
	if errorlevel 1 goto :update
:forward
	set findfile="tmp.txt"
	set forwardable="fast-forwardable"
	findstr %forwardable% %findfile% >nul 2>&1
	if errorlevel 1 goto prompt
	goto run
:update
	echo Starting update...
	echo Backing up your settings...
	echo d | copy config.json config.json.backup >nul
	echo Latest update:
	git --no-pager log --pretty=oneline -n1 NdT3DiscordBot/master ^master
	git pull NdTDiscordBot master
	if errorlevel 1 goto force
	echo Finished updating
	echo Starting up...
	ping 127.0.0.1 -n 4 >nul
	goto run
:force
	git fetch --all
	git reset --hard NdT3DiscordBot/master
	echo Finished updating
	echo Starting up...
	ping 127.0.0.1 -n 4 >nul
	goto run
:git
	TITLE Error!
	echo Git not found, Download here: https://git-scm.com/downloads
	echo Press any key to exit.
	pause >nul
	CD /D "%root%"
	goto :EOF
:node
	TITLE Error!
	echo Node.js not added to PATH or not installed. Download Node.js version 8 or above and make sure you add to PATH: https://i.imgur.com/KXgMcOK.png
	echo Press any key to exit.
	pause >nul
	CD /D "%root%"
	goto :EOF
:run
	if exist "tmp.txt" del "tmp.txt"
	if exist "config.json.backup" del "config.json"
	if exist "config.json.backup" ren config.json.backup config.json
	echo Starting the bot...
	call npm install
  call npm start

#!/bin/bash

echo "Warning: this script is still an alpha, expect bugs"

updater() {
	if hash git 2>/dev/null; then
    echo "Fetching origin"
		git init >/dev/null 2>&1
		git remote add NdT3DiscordBot https://github.com/NdT3Development/DiscordBot.git >/dev/null 2>&1
		cp config.json config.json.backup
    new=$(git remote show origin)
		if [[ "${new}" =~ "up" ]] || [[ "${new}" =~ "fast-forwardable" ]] ; then
			echo "The bot is up to date."
			sleep 1
		else
			read -t 10 -n 1 -p "There is an update available. Download now? (y/n):" input
			if [[ "$input" =~ "y" ]] ; then
				echo ""
				echo "Installing update"
				echo "Updating to latest stable build."
				if git pull origin master ; then
					echo "Update succeeded"
					sleep 2
				else
					echo "Pull failed, attempting to hard reset to origin master (settings are still saved)"
					git fetch --all
					git reset --hard origin/master
					echo "Update succeeded"
					sleep 2
				fi
			else
				echo ""
				echo "Cancelled update"
			fi
		fi
		sleep 1
	else
		echo "You do not have git installed. Updating using bash is not currently supported" # TODO HTTP update
		echo "Git is almost certainly available from your package manager. Install with:"
		echo "sudo apt-get install git-all"
	fi
}

run_bot() {
	echo "Checking requirements..."
  if [ -f config.json.backup ] ; then
    rm config.json
    mv config.json.backup config.json
  fi
	if hash node 2>/dev/null; then
    if (node -v || grep "8"); then
      echo "Has Node.js v8+"
    else
      echo "Please install Node.js version 8 or up"
		if hash npm 2>/dev/null; then
				echo "Starting bot..."
				npm install
        npm start
      else
        echo "npm command not found!"
      fi
    fi
  else
    echo "Node.js not found"
  fi
}

updater
run_bot

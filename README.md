Front End - Reactjs

Steps for create a reactjs project on our local system

On terminal 
	sudo apt update
	sudo apt install nodejs
sudo apt install npm
Node js  10.11.1
-To check version
	node -v
-get npm by installing nodejs
sudo npm install create-react-app -g
-create a project
  	create-react-app newproject      eg:react-complete guide
-goto the project directory
	-cd newproject
	-npm start
-install required packages for react app using,
	-npm install --save <packagename>

	-eg: npm install --save axios

Successfully started a react app !!

---------------------------------------------
Steps for run a github react project on local machine 

On terminal,
	-sudo apt-get update
	-sudo apt-get install git
	-sudo apt-get install nodejs (if not installled)
	-sudo apt-get install npm (if not installled).

Check versions
-node -v	v11.10.1
-npm -v 	6.7.0


Please note:
install latest version of nodeJs and npm by using
		-sudo apt-get install curl python-software-properties
		-curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
		-sudo apt-get install nodejs

Clone the project by using git clone command.
-example
git clone https://github.com/adithyanps/my_portfolio

	Enter into project folder.
		-cd my_portfolio
		Install dependencies by ,
			-npm install 

Start project by,
	-npm start

For create build folder,
	Run npm run build 
-npm install -g serve
-serve -s build 

Completed react app !!!  

-----------------------------------------------------------------------


### Sekola Backend Repository

Hello fellow developers, here are some steps you need to start hacking and running this repository on your local development machine.

Recommended Settings :
Node 14.16.1 (you might want to use nvm to avoid other code/repo you work on to crash)

Steps to Run :

1. Create a database with a name of your choice
2. Fill the .env DATABASE_URL with MySQL connection URI to your created db on step 1
3. Run these script to startup your local development server
   > npm install
   > npx prisma init
   > npm run dev

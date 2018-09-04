**DESCRIPTION**

This is frontend for my chat application (https://bitbucket.org/punkkk/chat/src)

**BEFORE START**

You have to install docker (https://docs.docker.com/install/)

**START**

1. sudo docker build -t chat/front .
2. sudo docker run -p 127.0.0.1:3000:80 -p 127.0.0.1:4444:4444 --link server:server -it --rm --name chat chat/front
3. open localhost:3000 in your browser

Or you simply can use `yarn install && yarn run dev`
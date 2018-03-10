FROM node:latest
RUN mkdir ~/proj
WORKDIR ~/proj 
ADD package.json .
ADD src .
RUN npm install . 
CMD ["node", "."]

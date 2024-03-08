FROM node:20.9.0
WORKDIR /app
COPY package.json package.json
RUN npm install 
RUN npm install -g sequelize-cli
COPY . .
RUN npm run build
EXPOSE 3000
RUN chmod +x entrypoint.sh
RUN chmod +x node_modules
ENTRYPOINT ["./entrypoint.sh"]
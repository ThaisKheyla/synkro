FROM node:18

WORKDIR /app
# Copia e instala dependências
COPY package*.json ./
RUN npm install --production
# Copia o restante do código
COPY . .
# Expõe a porta 80
EXPOSE 80
# Inicia a aplicação
CMD ["npm", "start"]

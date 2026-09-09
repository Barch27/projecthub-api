FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

# ⭐ Generate Prisma Client inside the image
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]
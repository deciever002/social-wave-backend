FROM NODE:18
run mkdir -p /src/user/app
WORKDIR /src/user/app
COPY package*json ./
copy . .
RUN npm install
EXPOSE 8000
CMD ["node","index.js"]
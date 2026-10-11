FROM node:22-bookworm-slim

WORKDIR /app

# Avoid downloading the desktop Electron binary for a web-only container.
ENV ELECTRON_SKIP_BINARY_DOWNLOAD=1
ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build -- --mode web

EXPOSE 3000

CMD ["sh", "-c", "npm run preview -- --host 0.0.0.0 --port ${PORT:-3000}"]

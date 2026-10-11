FROM node:22-bookworm-slim

WORKDIR /app

# Avoid downloading the desktop Electron binary for a web-only container.
ENV ELECTRON_SKIP_BINARY_DOWNLOAD=1

COPY package.json package-lock.json ./
# The package.json postinstall references this script, so it must exist before npm ci.
COPY scripts/fix-electron-install.cjs ./scripts/fix-electron-install.cjs
RUN npm ci

COPY . .
# Keep minification disabled while diagnosing constrained build environments.
RUN sh -c 'npm run build -- --mode web --minify false; status=$?; echo "VITE_BUILD_EXIT_CODE=$status"; exit "$status"'

ENV NODE_ENV=production
EXPOSE 3000

CMD ["sh", "-c", "npm run preview -- --host 0.0.0.0 --port ${PORT:-3000}"]

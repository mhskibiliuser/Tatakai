FROM node:22-bookworm-slim

WORKDIR /app

# Avoid downloading the desktop Electron binary for a web-only container.
ENV ELECTRON_SKIP_BINARY_DOWNLOAD=1

COPY package.json package-lock.json ./
# The package.json postinstall references this script, so it must exist before npm ci.
COPY scripts/fix-electron-install.cjs ./scripts/fix-electron-install.cjs
RUN npm ci

COPY . .
# Capture complete Vite output so the underlying Rollup/build error isn't lost in deployment logs.
RUN sh -c 'NODE_ENV=production NODE_OPTIONS="--max-old-space-size=6144 --trace-uncaught" DEBUG="vite:*,rollup:*" node ./node_modules/vite/bin/vite.js build --mode web --minify false --debug > /tmp/vite-build.log 2>&1; status=$?; echo "VITE_BUILD_EXIT_CODE=$status"; tail -n 180 /tmp/vite-build.log; exit "$status"'

ENV NODE_ENV=production
EXPOSE 3000

CMD ["sh", "-c", "npm run preview -- --host 0.0.0.0 --port ${PORT:-3000}"]

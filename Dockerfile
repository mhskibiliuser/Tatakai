FROM nginx:alpine

# The web bundle is built by GitHub Actions on a runner with sufficient RAM.
# Deplexo only serves the already-built static files, avoiding its build-memory limit.
COPY dist/ /usr/share/nginx/html/
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]

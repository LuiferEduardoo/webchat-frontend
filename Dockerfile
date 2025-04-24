# Etapa 1: Construcción
FROM node:22-alpine AS builder

WORKDIR /app


# Definir el ARG para pasar las variables durante el build
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# Copia los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia todo el proyecto
COPY . .

# Compila el proyecto para producción
RUN npm run build

# Etapa 2: Servir los archivos estáticos
FROM nginx:alpine

# Copia el build generado a la carpeta pública de nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia un archivo de configuración personalizado de nginx si quieres (opcional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expone el puerto 80 para servir el frontend
EXPOSE 80

# Comando de inicio
CMD ["nginx", "-g", "daemon off;"]

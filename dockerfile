# Usa una imagen base de nginx
FROM nginx:alpine

# Copia los archivos de configuración de nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copia los archivos del proyecto a la carpeta de html de nginx
COPY . /usr/share/nginx/html

# Expone el puerto 80 para el tráfico web
EXPOSE 80

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]

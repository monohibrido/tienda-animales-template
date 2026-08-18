# Plantilla de Tienda (React + Vite + Tailwind)

Plantilla de sitio vitrina (sin ecommerce) con 4 secciones: Home, Catálogo,
Quiénes somos y Contacto. Pedidos vía botón de WhatsApp. Formulario de
contacto envía correo al dueño de la tienda.

## 1. Instalación local

```bash
npm install
npm run dev
```

Abre http://localhost:5173

## 2. Personalizar por cliente

Edita **un solo archivo**: `src/config.js`

- `nombre`, `eslogan`
- `whatsapp` (formato: 56912345678, sin + ni espacios)
- `emailContacto`
- `formEndpoint` (ver paso 3)
- `direccion`, `horario`, redes sociales

Los productos del catálogo están en `src/data/productos.js` — reemplázalos
por los productos reales (nombre, precio, categoría, subcategoría,
imágenes, descripción). El campo `imagenes` es un **arreglo**: si pones
más de una foto, la card muestra flechitas para pasar entre ellas y, al
hacer clic, se abre un visor ampliado (tope 500x500px) con navegación por
teclado, descripción completa y el botón de WhatsApp incluido.

Los campos `categoria` y `subcategoria` (texto libre, ej. `'Perros'` →
`'Alimento'`) arman solos el menú de dos niveles de arriba del catálogo —
no hay que declarar el árbol de categorías en ningún otro archivo, se
arma automáticamente a partir de los productos. Si eliges una categoría
que no tiene subcategorías cargadas, el segundo menú simplemente no
aparece.

## 3. Configurar el formulario de contacto (Formspree)

El formulario NO tiene backend propio, usa un servicio externo gratuito:

1. Ve a https://formspree.io y crea una cuenta (puede ser con el correo del
   cliente, igual que GitHub/Vercel).
2. Crea un nuevo formulario ("New Form") y pon el correo de destino
   (`emailContacto` del cliente).
3. Copia el endpoint que te entrega, tipo `https://formspree.io/f/xxxxxx`.
4. Pégalo en `formEndpoint` dentro de `src/config.js`.

Alternativa equivalente: https://web3forms.com (no requiere backend tampoco).

## 4. Subir a GitHub (cuenta del cliente)

```bash
git init
git add .
git commit -m "Primer commit - plantilla tienda"
git branch -M main
git remote add origin https://github.com/USUARIO_CLIENTE/NOMBRE_REPO.git
git push -u origin main
```

Luego, en GitHub → Settings → Collaborators, el cliente te agrega con tu
usuario de GitHub como colaborador del repo.

## 5. Deploy en Vercel (cuenta del cliente)

1. El cliente crea cuenta en https://vercel.com (puede ser con su GitHub).
2. "Add New Project" → importa el repositorio de GitHub.
3. Vercel detecta automáticamente que es un proyecto Vite (build command
   `vite build`, output `dist`). No requiere configuración extra.
4. El archivo `vercel.json` ya incluido hace que las rutas de React Router
   (`/catalogo`, `/contacto`, etc.) funcionen al recargar o compartir el link
   directo — sin este archivo, esas rutas darían error 404 en producción.
5. Deploy.
5. El cliente te invita como miembro del proyecto/equipo en Vercel
   (Settings → Members) para que puedas gestionar deploys y dominios.

## 6. Conectar el dominio .cl

1. El cliente compra el dominio en NIC Chile (https://www.nic.cl) u otro
   registrador.
2. En Vercel → tu proyecto → Settings → Domains → agrega el dominio.
3. Vercel indicará los registros DNS a configurar (generalmente un registro
   `A` o `CNAME`) — se configuran en el panel del registrador del dominio.
4. Espera la propagación DNS (minutos a horas) y Vercel emite el certificado
   SSL automáticamente.

## Stack

- React 18 + Vite
- React Router (navegación entre secciones)
- Tailwind CSS (estilos)
- Formspree/Web3Forms (envío de formulario sin backend propio)

## Estructura

```
src/
├── components/     Navbar, Footer, WhatsAppButton, ProductCard
├── pages/          Home, Catalogo, QuienesSomos, Contacto
├── data/           productos.js (catálogo de ejemplo)
├── config.js       ← Único archivo a editar por cliente
└── App.jsx         Rutas
```

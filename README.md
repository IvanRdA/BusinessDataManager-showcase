# Manejador de datos de negocio - Optimización de procesos de negocio

## Descripción general:

El proyecto completo es una aplicación que permite al usuario gestionar información relevante sobre su negocio. La app se compone de diferentes módulos, cada uno con un tipo de entidad lógica definida (empleados, stocks, ventas, dashboards...) y según los que tenga activos el usuario permite realizar el seguimiento de todo el flujo de información de dichas entidades, por ejemplo, el módulo empleado permite operaciones de lectura, escritura, actualización y borrado de datos de empleados, gestión de lógicas de negocio relacionadas con empleados como vacaciones, horas extra, turnos, etc y demás funcionalidades que representen o tengan que ver con empleados.

Para realizar el proyecto precisaré utilizar un stack de tecnologías de ámbito completo debido a que hay que desarrollar la parte de cliente, el servidor (backend) y la base de datos. Para ello, he elegido el stack MERN con React (y NextJS + TypeScript) en cliente, ExpressJS y NodeJS en backend y MongoDB (con mongoose) para la base de datos.

En un futuro, cuando se implemente el módulo de "TPV" y la información sobre ventas y productos se cargue de modo automático desde los terminales se necesitarán dependencias extra para manejar este tipo de peticiones al servidor y a la base de datos.

**LOS ARCHIVOS .ENV DE LAS VARIABLES DE ENTORNO SE HAN AÑADIDO AL REPOSITORIO DEBIDO A QUE ESTE ES SOLO UN SHOWCASE DEL PROYECTO Y PARA FACILITAR SU REPRODUCCIÓN EN UN ESTADO LOCAL.**

**TYPESCRIPT LANZARÁ VARIOS WARNINGS DE TIPADO QUE AÚN NO HE CORREGIDO POR MOTIVOS DE PRIORIDAD PERO QUE NO AFECTAN AL TESTEO DE LA APLICACIÓN.**

## Arquitectura del proyecto:

![Diagrama de flujo](/img/flow-diagram.jpg)

**Frontend:** En el lado del cliente usaré NextJS como framework React ya que implementa muchas funcionalidades útiles y necesarios en el proyecto, como el ruteo interno, el renderizado desde el lado de servidor de componentes (muy útil en específico para las vistas de simulación, que manejan un volumen de datos muy grande). Además usaré TailwindCSS para los estilos.
La interfaz de usuario incluirá el menú de navegación con la ventana dashboard como principal. Al navegar por la app se renderizará dinámicamente el componente necesario en la vista y un submenú de navegación correspondiente a la navegación en ese módulo. La app debe ser capaz de reconocer el rol de usuario que ha iniciado sesión para restringir usos y vistas según necesidad. Los formularios, al contener información de varias subdivisiones de la entidad, se separarán en base a esas subdivisiones, en formato de pestañas (tabs) o acordeones, según necesidad.

**Backend:** En el lado del servidor usaré ExpressJS y NodeJS para crear toda la infraestructura, además de desarrollar la API de conexión entre usuario y base de datos. El backend debe encargarse de validar los datos (si existe alguno) de las peticiones de los usuarios previo a realizar ningún paso. Si no se cumplen las validaciones debe retornar un error de validación inmediatamente, si se cumplen, debe seguir con el flujo normal de la petición.
También debe incluir todo el sistema de manejo de errores para que el servidor no caiga en ningún momento y pueda manejar excepciones inesperadas. Si todo funciona correctamente en la petición, el servidor será el puente de conexión entre el usuario y su petición y la base de datos, encargándose de realizar las "queries" pertinentes y devolver la información al cliente.

**Base de datos:** Para la base de datos he optado por un modelo no relacional como MongoDB, usándolo mediante su dependencia mongoose para NodeJS. La base de datos se encarga de todas las operaciones de lectura y escritura de datos registrados mediante peticiones que vienen del backend. La estructura de la base de datos es la típica de MongoDB, separada por documentos que representan entidades lógicas dentro del proyecto como usuarios, ventas, stocks, etc.

## Instalación y configuración:

Para poder reproducir el proyecto en tu entorno local necesitarás las siguientes tecnologías instaladas en tu ordenador:

- NodeJS v18.18.2+
- MongoDB service
- npm v9.2.0+

Pasos una vez instaladas las tecnologías:

- Lanza el script "npm run install" en ambos directorios del proyecto (cliente y servidor). Esto instalará las dependencias de ambos ámbitos.
- Prueba que todo funcione correctamente abriendo dos terminales en tu IDE. Lanza el script "npm run dev" en cada una estando dentro del directorio correspondiente y observa si la salida por consola es correcta.
- Mediante un gestor de solicitudes HTTP realiza una petición POST a la ruta que encontrarás en el archivo "/server/src/employees/routes/newEmployee.route.ts" con la información del usuario que quieras crear. ES IMPORTANTE QUE EL ROL DEL USUARIO CREADO SEA "Director" PARA QUE LA APLICACIÓN NO TE RETORNE AL INICIAR SESIÓN.
- En el navegador visita la ruta http://localhost:3000/ e introduce las credenciales de inicio de sesión.

## Funcionalidades principales:

Las siguientes imágenes muestran algunos puntos clave del proyecto y el estado en que se encuentran los diferentes procesos de desarrollo dentro de ellos.

### Frontend

![Estado frontend](/img/frontend-status.jpg)

Nótese que algunos puntos clave como el consumo de la API del backend o la interactividad del usuario se dan por sobreentendidas y en progreso constante.

### Backend

![Estado backend](/img/backend-status.jpg)

### Base de datos

![Estado base de datos](/img/database-status.jpg)

## Estructura del proyecto:

Por motivos de escalabilidad y modularización he dividido el proyecto en sub directorios que representan cada entidad lógica de la aplicación. Estas pueden ser usuarios, ventas, stocks, etc.
Cada módulo contiene a su vez varias sus carpetas que contienen las diferentes partes del desarrollo de esa entidad. Todos los módulos tienen las mismas carpetas pero el contenido de los archivos es totalmente diferente, ya que se destina a ese módulo en sí. Las carpetas se dividen en funcionalidades como pueden ser el modelo de la base de datos pertinente, el controlador que se encarga de ejecutar la lógica en caso del lado servidor o la carpeta de tests para testear las funcionalidades del módulo.

## Contribuciones futuras:

La idea de las contribuciones futuras se base en la misma modularización en la que está basado el proyecto:

    - Finalizar las funcionalidades del módulo empleados como: registro de turnos, detección automática de tiempo extra, detección y manejo de FNR. Implementación de reportes laborales y médicos. Inclusión de archivos.
    - Módulo stocks: Que permite controlar los stocks de producto y realizar inventarios.
    - Módulo ventas: Que permite la gestión de datos de venta, subdividiendo en tantas entidades de negocio como se necesite.
    - Módulo dashboards: Con información gráfica de los módulos que ya estén incluídos.
    - Módulo TPV: Para implementación directa en puntos de venta. Cuando se implemente este módulo se deberá implementar el método de volcado de datos automático al entorno.
    - Módulo Diseño de salas: Para implementar junto al módulo TPV, permitiendo diseñar las salas y asignación de números de mesa y comensales según necesidad.
    - Módulo productos avanzado: Con escandallos para control al detalle del producto, incluyendo proveedores y compras en el sistema.

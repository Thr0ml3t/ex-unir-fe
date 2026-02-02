# Frontend React - Task Manager

Aplicación React para gestión de tareas CRUD.

## Estructura del proyecto

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── TaskForm.js
│   │   ├── TaskList.js
│   │   ├── TaskItem.js
│   │   ├── TaskFilters.js
│   │   └── Stats.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Instalación local

```bash
npm install
npm start
```

La aplicación se abrirá en http://localhost:3000

## Compilación para producción

```bash
npm run build
```

Esto genera la carpeta `build/` con los archivos estáticos listos para servir.

## Variables de entorno

Por defecto, la aplicación usa `/api` como base URL para las llamadas al backend.
Si necesitas cambiar esto, crea un archivo `.env`:

```
REACT_APP_API_URL=http://tu-backend-url/api
```

## Funcionalidades

- ✅ Crear tareas con título, descripción y prioridad
- ✅ Listar todas las tareas
- ✅ Marcar tareas como completadas
- ✅ Eliminar tareas
- ✅ Filtrar por estado (todas, pendientes, completadas)
- ✅ Estadísticas en tiempo real
- ✅ Diseño responsive

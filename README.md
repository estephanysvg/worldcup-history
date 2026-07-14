# 🏆 World Cup History Explorer

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Mantine](https://img.shields.io/badge/Mantine-339AF0?style=for-the-badge&logo=Mantine&logoColor=white)

Una aplicación web estática desarrollada en **React** para consultar, filtrar y visualizar los resultados históricos de los partidos de la Copa Mundial de Fútbol. Toda la lógica y transformación de datos se realiza en el frontend (sin backend), consumiendo los datos directamente desde un fichero JSON estático.

## ✨ Características

- **📊 Dashboard de Estadísticas:** Resumen general con el total de partidos, total de goles, media de goles por partido, equipo con más goles y partido con mayor asistencia.
- **📈 Gráficos Interactivos:** Visualización de la evolución de goles por mundial, top 5 equipos goleadores y los enfrentamientos más repetidos.
- **🔍 Explorador de Partidos:** Tabla interactiva con paginación, ordenación múltiple y filtros avanzados por:
  - Año, Equipo (Local o Visitante), Fase, Grupo, Ciudad y Estadio.
- **⚽ Búsqueda por Nombre:** Buscador en tiempo real por el nombre de cualquier equipo.
- **📄 Vista de Detalle:** Panel lateral (Drawer) con la información detallada de un partido específico.
- **🌗 Modo Oscuro/Claro:** Soporte nativo para modo oscuro y claro integrado con Mantine.
- **🚀 Despliegue Automático:** Configurado para ser desplegado fácilmente en GitHub Pages.

## 🛠️ Tecnologías

- **Core:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **UI Framework:** [Mantine](https://mantine.dev/) (Componentes, Hooks, Datatable)
- **Charts:** [@mantine/charts](https://mantine.dev/charts/getting-started/) (basado en Recharts)
- **Iconos:** [Tabler Icons](https://tabler-icons.io/)
- **Routing:** [React Router](https://reactrouter.com/)

## 🚀 Instalación y Uso Local

Sigue estos pasos para levantar el proyecto en tu entorno local:

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/worldcup-history.git
   cd worldcup-history
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:5173`.

## 📦 Construcción y Despliegue

Para compilar la aplicación para producción:

```bash
npm run build
```

Para desplegar la aplicación directamente a GitHub Pages (asegúrate de haber configurado tu repositorio):

```bash
npm run deploy
```
*(Este comando utiliza el paquete `gh-pages` para publicar el contenido de la carpeta `dist` en la rama `gh-pages`).*

## 📁 Estructura del Proyecto

El código está organizado siguiendo buenas prácticas, separando la lógica en *Custom Hooks* y modularizando los componentes:

```text
src/
├── components/
│   ├── Charts/        # Componentes de gráficos (GoalsChart, TeamsChart, etc.)
│   ├── Dashboard/     # Vista principal de estadísticas
│   ├── MatchTable/    # Tabla de datos y vista de detalle (Drawer)
│   ├── Tabs/          # Navegación principal
│   └── ThemeToggle/   # Botón para cambiar modo oscuro/claro
├── hooks/             # Lógica de negocio extraída (useFilters, useStatistics, useMatches)
├── pages/             # Vistas principales (Home)
├── services/          # Fetching del JSON local
├── types/             # Definiciones de interfaces TypeScript
└── utils/             # Funciones de utilidad (ej. parseo de fechas)
```

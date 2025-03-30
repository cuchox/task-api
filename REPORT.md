# Pipeline Execution Report

## Summary
Despliegue automatizado de la API de tareas usando Jenkins y Docker.

## Steps
- Repositorio Git inicializado y conectado a GitHub
- Dockerfile configurado para contenerizar la API
- Jenkins configurado para clonar, instalar dependencias, ejecutar tests y crear imagen Docker

## Issues Encountered
- Problema inicial con las credenciales de GitHub en Jenkins (resuelto configurando token de acceso personal)
- Error en los tests por diferencia de versión de Node (resuelto especificando versión exacta en Dockerfile)

## Results
![Captura del pipeline exitoso]
![Captura de tests pasando]
task-api/
├── .gitignore
├── README.md
├── REPORT.md
├── Dockerfile
├── Jenkinsfile
├── app.js
├── package.json
├── package-lock.json
├── screenshots/
│   ├── pipeline-success.png
│   └── tests-passed.png
└── tests/
    └── app.test.js
pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        // Clonar repositorio desde GitHub
        git 'https://github.com/cuchox/task-api.git'
      }
    }

    stage('Install dependencies') {
      steps {
        // Instalar dependencias con npm
        bat 'npm install'
      }
    }

    stage('Run tests') {
      steps {
        // Ejecutar pruebas automatizadas
        bat 'npm test'
      }
    }

    stage('Build Docker image') {
      steps {
        // Crear imagen Docker
        bat 'docker build -t task-api .'
      }
    }
  }
}
pipeline {
    agent any
    environment {
        REPO_URL = 'https://github.com/cuchox/task-api.git'
    }
    stages {
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']], // Asegúrate de usar "main"
                    extensions: [],
                    userRemoteConfigs: [[
                        url: env.REPO_URL,
                        credentialsId: 'github-token' // Usa tu ID de credenciales
                    ]]
                ])
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
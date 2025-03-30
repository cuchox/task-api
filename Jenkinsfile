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
                    branches: [[name: '*/main']],
                    extensions: [],
                    userRemoteConfigs: [[
                        url: env.REPO_URL,
                        credentialsId: 'github-token' // Usa el ID de tus credenciales
                    ]]
                ])
            }
        }
        
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Run tests') {
            steps {
                sh 'npm test'
                junit '**/test-results.xml' // Asegúrate de que Jest genere este archivo
            }
        }
        
        stage('Build Docker image') {
            steps {
                sh 'docker build -t task-api .'
            }
        }
    }
    
    post {
        always {
            junit '**/test-results.xml'
        }
    }
}
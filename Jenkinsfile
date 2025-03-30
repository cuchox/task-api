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
                        credentialsId: 'github-token'
                    ]]
                ])
            }
        }
        
        stage('Install dependencies') {
            steps {
                bat 'npm install'  // Usa bat en lugar de sh para Windows
            }
        }
        
        stage('Run tests') {
            steps {
                bat 'npm test'  // Usa bat en lugar de sh para Windows
                junit '**/test-results.xml'
            }
        }
        
        stage('Build Docker image') {
            steps {
                bat 'docker build -t task-api .'  // Usa bat en lugar de sh para Windows
            }
        }
    }
    
    post {
        always {
            junit '**/test-results.xml'
            archiveArtifacts artifacts: '**/coverage/**', allowEmptyArchive: true
        }
    }
}
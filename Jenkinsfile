pipeline {
  agent any
  
  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/tu-usuario/task-api.git'
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
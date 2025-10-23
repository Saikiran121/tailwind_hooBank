pipeline {
    agent any 

    stages {
        stage('node and npm versions') {
            steps {
                sh 'node -v'
                sh 'npm -v'
            }
        }

        stage('Installing Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('NPM Dependency Audit') {
            steps {
                sh 'npm audit --audit-level=critical'
            }
        }
    }
}
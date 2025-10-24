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

        stage('OWASP Dependency Check') {
            steps {
                withCredentials([file(credentialsId: 'nvd-api-props', variable: 'NVD_PROPS')]) {
                    dependencyCheck additionalArguments: '''
                        --scan './'
                        --out './'
                        --format 'ALL'
                        --prettyPrint
                    ''', odcInstallation: 'OWASP-DepCheck-12'
                }
            }
        }
    }
}
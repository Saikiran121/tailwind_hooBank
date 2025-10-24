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

        stage('OWASP Dependency CHeck') {
            steps {
                withCredentials([file(credentialsId: 'nvd-api-props', variable: 'NVD_PROPS')]) {
                    dependencyCheck additionalArguments: '''
                        --scan './'
                        --out './'
                        --format 'ALL'
                        --prettyPrint
                    ''', odcInstallation: 'OWASP-DepCheck-12'
                    dependencyCheckPublisher failedTotalCritical: 1, pattern: 'dependency-check-report.xml', stopBuild: true
                }
            }

            post {
                always {
                    // 1) Publish the HTML report in Jenkins UI

                    publishHTML(target: [
                        allowMissing: true,
                        keepAll: true,
                        reportDir: '.',
                        reportFiles: 'dependency-check-report.html',
                        reportName: 'OWASP Dependency Check Report'
                    ])

                    // 2) Archive all report files as build artifacts

                    archiveArtifacts artifacts: 'dependency-check-report.*', allowEmptyArchive: true

                    // 3) Email the report (uses global Gmail SMTP config)

                    emailext(
                        //from: 'biradarsaikiran22@gmail.com'
                        //replyto: 'biradarsaikiran22@gmail.com'
                        to: 'saikiranbiradar76642@gmail.com',
                        subject: "OWASP Dependency Check - ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                        mimeType: 'text/html',
                        body: """\
                          <p>Hi,</p>
                          <p>The OWASP Dependency Check scan has completed for <b>${env.JOB_NAME}</b> build <b>#${env.BUILD_NUMBER}</b>.</p>
                          <p>View the HTML report in Jenkins: <a href="${env.BUILD_URL}OWASP_Dependency_Check_Report/">Report Link</a></p>
                          <p>Key files are attached.</p>
                          <p>– Jenkins</p>
                        """,
                    
                    // attach whichever you need
                    attachmentsPattern: 'dependency-check-report.html,dependency-check-report.json'
                    )
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t saikiran8050/tailwind_hoobank:$GIT_COMMIT .'
            }
        }

        stage('Push Docker Image') {
            steps {
                withDockerRegistry(credentialsId: 'dockerhub', url: "") {
                    sh 'docker push saikiran8050/tailwind_hoobank:$GIT_COMMIT'
                }
            }
        }
    }
}
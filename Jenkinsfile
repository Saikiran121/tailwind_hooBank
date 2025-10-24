pipeline {
    agent any 

    environment {
        TRIVY_CACHE_DIR = '/var/lib/jenkins/trivy-cache'
        IMAGE_NAME = "saikiran8050/tailwind_hoobank:${GIT_COMMIT}"

        AWS_REGION = 'ap-south-1'
        AWS_ACCOUNT_ID = '554739428262'
        ECR_REPO = 'tailwind_hoobank'
        ECR_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO}"
    }

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

        stage('Trivy FS Scan') {
            steps {
                echo 'Running Trivy Filesystem Scan'

                sh '''
                    set -e
                    mkdir -p $TRIVY_CACHE_DIR

                    # Get the official HTML template into the WORKSPACE
                    for i in 1 2 3; do 
                        curl -fsSL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/html.tpl -o trivy-html.tpl && break || sleep 2
                    done

                    test -s trivy-html.tpl

                    # Scan local source directory for vulnerabilities, secrets, and misconfigurations

                    trivy fs --scanners vuln,secret,config \
                        --severity HIGH,CRITICAL \
                        --ignore-unfixed \
                        --exit-code 0 \
                        --format template --template "@trivy-html.tpl" \
                        -o trivy-fs-report.html .
                    
                    # Fail build if critical/high vulnerabilities found
                    trivy fs --scanners vuln,secret,config \
                        --severity HIGH,CRITICAL \
                        --ignore-unfixed \
                        --exit-code 1 .
                '''
            }

            post {
                always {
                    archiveArtifacts artifacts: 'trivy-fs-report.html', allowEmptyArchive: true
                    publishHTML(target: [
                        allowMissing: true, 
                        keepAll: true, 
                        reportDir: '.',
                        reportFiles: 'trivy-fs-report.html',
                        reportName: 'Trivy Filesystem Scan Report'
                    ])
                }
            }
        }

        

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t saikiran8050/tailwind_hoobank:$GIT_COMMIT .'
            }
        }

        stage('Trivy Image Scan') {
            steps {
                sh '''
                    set -e 

                    mkdir -p ${TRIVY_CACHE_DIR}
                    [ -s trivy-html.tpl ] || curl -fsSL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/html.tpl -o trivy-html.tpl

                    trivy image \
                        --severity HIGH,CRITICAL \
                        --ignore-unfixed \
                        --format template --template "@trivy-html.tpl" \
                        -o trivy-image-report.html \
                        ${IMAGE_NAME}
                    
                    trivy image \
                        --severity HIGH,CRITICAL \
                        --ignore-unfixed \
                        --exit-code 1 \
                        ${IMAGE_NAME}
                '''
            }

            post {
                always {
                    archiveArtifacts artifacts: 'trivy-image-report.html', allowEmptyArchive: true

                    publishHTML(target: [
                        allowMissing: true, 
                        keepAll: true, 
                        reportDir: '.',
                        reportFiles: 'trivy-image-report.html',
                        reportName: 'Trivy Image Scan Report'
                    ])
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                withDockerRegistry(credentialsId: 'dockerhub', url: "") {
                    sh 'docker push saikiran8050/tailwind_hoobank:$GIT_COMMIT'
                }
            }
        }

        stage('Push to AWS ECR') {
            steps {

                withAWS(credentials: 'aws-ecr', region: "${AWS_REGION}")  {
                    echo 'Logged into AWS ECR'

                    sh '''
                        set -eux
                        aws sts get-caller-identity

                        # Login to ECR
                        PASSWORD="$(aws ecr get-login-password --region "${AWS_REGION}")"
                        echo "$PASSWORD" | docker login --username AWS --password-stdin "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"

                        aws ecr describe-repositories --repository-names "${ECR_REPO}" --region "${AWS_REGION}" \
                            || aws ecr create-repository --repository-name "${ECR_REPO}" --region "${AWS_REGION}"

                        docker tag "saikiran8050/tailwind_hoobank:${IMAGE_TAG}" "${ECR_URI}:${IMAGE_TAG}"
                        docker push "${ECR_URI}:${IMAGE_TAG}"
                    '''
                }
            }
        }

        
    }
}
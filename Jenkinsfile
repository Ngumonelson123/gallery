pipeline {
    agent any
    tools {
        nodejs 'NodeJS 22.9.0' // Ensure this name matches your Global Tool Configuration
    }
    environment {
        DEPLOY_HOOK_URL = 'https://api.render.com/deploy/srv-cron5aqj1k6c739kp860?key=gQI_k4GuIYg' 
      
    }

    stages {
        stage('Node Version') {
            steps {
                echo 'Checking Node.js version...'
                sh 'node --version'
            }
        }
        stage('Clone repo') {
            steps {
                echo 'Clone this repository...'
                git credentialsId: 'gitconnect', url: 'https://github.com/Ngumonelson123/gallery.git'
            }
        }
        stage('Install Npm') {
            steps {
                echo 'Installing npm packages...'
                sh 'npm install'
                sh 'npm install mongodb'
                sh 'npm install -g webpack'
            }
        }
        stage('Build') {
            steps {
                echo 'Running the build...'
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }
        stage('Deploying to Render122') {
                        steps {
                            script {
                                def response = sh(script: """
                                    curl -X POST ${DEPLOY_HOOK_URL}
                                """, returnStdout: true).trim()
                                
                                echo "Deploying Response: ${response}"
                            }
                        }

                    }
                    stage('sending message to slack'){
                        steps{
                            slackSend(
                    botUser: true, 
                    channel: 'C07NF1PDEM9', 
                    color: '',  
                    message: "Deployment successful! Build ID - ${env.BUILD_ID}. Check the deployed site: https://gallery-pqk9.onrender.com", 
                    teamDomain: 'DevOps Engineer', 
                    tokenCredentialId: 'slacklog'
                )

                        }
                    }
                    
    }

    post {
        always {
            echo 'Pipeline completed.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}

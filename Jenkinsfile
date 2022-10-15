pipeline {
    environment {
        registry = "theay003/backend-devops"
        registryCredential = 'dockerhub_id'
        dockerImage = ''
    }
    agent any
    tools {
    nodejs 'Nodejs'
    }
    stages {

        stage('git clone backend') {
            steps {
                git 'https://github.com/AhTheary/DevOps-Api.git'

            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
            }
        }

        stage('Building image') {
            steps{
                script {
                    dockerImage = docker.build registry + ":$BUILD_NUMBER"
                }
            }
        }

        stage('Deploy Image') {
            steps{
                script {
                    docker.withRegistry( '', registryCredential ) {
                        dockerImage.push()
                    }
                }
            }
        }
        stage('docker stop container') {
        steps {
            sh 'docker ps -f name=myBackend -q | xargs --no-run-if-empty docker container stop'
            sh 'docker container ls -a -fname=myBackend -q | xargs -r docker container rm'
        }
    }

        stage('Docker Run') {
            steps{
                script {
                    dockerImage.run("-p 3001:3001 --rm --name myBackend")
                }
            }
        }
    }
}
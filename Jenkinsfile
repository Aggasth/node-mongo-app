pipeline {
  agent any
  tools {
    nodejs 'nodejs'
  }
  stages{
    stage('CheckOut') {
      steps {
        git branch: 'main', credentialsId: '108da089-e7b0-4bdf-9770-e6f1471e9d34', url: 'https://github.com/Aggasth/node-mongo.git'
      }
    }

    stage('Dependencies') {
      steps {
        script{
          sh 'npm init -y'
          sh 'npm install express ejs mongoose'
        }
      }
    }

    stage('Run App') {
      steps {
        sh 'node app.js'
      }
    }
  }
}

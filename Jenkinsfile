pipeline {
    agent {
        docker {
          image 'ismaleiva90/azure-cli'
          args '--privileged --network=host'
        }
    }
    
    stages {
        stage('Azure Login Test') {
            environment {
              AZURE_CONFIG_DIR = '/ruta/permisible/.azure'
            }
            steps {
                script {
                    withCredentials(bindings: [azureServicePrincipal('devServicePrincipal')]) {
                        sh 'az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET -t $AZURE_TENANT_ID'
                        echo 'Conectado correctamente, el agente funciona.'
                    }
                }
            }
        }
        
    }
}


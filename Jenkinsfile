pipeline {
    agent {
        docker {
          image 'aggasth/ubuntu-azcli'
          args '--privileged --network=host'
        }
    }
    
    stages {
        stage('Azure Login Test') {
            steps {
                script {
                    env.AZURE_CONFIG_DIR = "${WORKSPACE}/azure-config"
                    withCredentials(bindings: [azureServicePrincipal('devServicePrincipal')]) {
                        sh 'az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET -t $AZURE_TENANT_ID'
                        echo 'Conectado correctamente, el agente funciona.'
                    }
                }
            }
        }
        
    }
}


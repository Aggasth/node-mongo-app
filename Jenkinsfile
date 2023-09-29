pipeline {
    parameters {
        string(name: 'PLAN',defaultValue:'Plan-SociusRGLABRGModeloDevOpsDockerDev',description:'Plan del servicio')
        string(name: 'APP_NAME', description:'Nombre de la webapp', defaultValue: env.BRANCH_NAME == 'master' ? 'sociuswebapptest010' : 'sociuswebapptest011')
        string(name: 'RES_GRP',defaultValue:'SOCIUSRGLAB-RG-MODELODEVOPS-DEV',description:'Grupo de recursos')
        string(name: 'BRANCH', defaultValue:env.BRANCH_NAME, description: 'Valor del Ambiente')
    }
    
    agent {
        docker {
          image 'bitnami/azure-cli:latest'
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


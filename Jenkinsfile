pipeline {
    agent any

    stages {

        stage('Récupération du code') {
            steps {
                echo 'Code récupéré depuis GitHub'
            }
        }

        stage('Déploiement Apache') {
            steps {
                bat 'xcopy * C:\\Apache24\\htdocs\\ /E /Y'
            }
        }

    }
}
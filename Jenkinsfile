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

        stage('Installation des dépendances') {
            steps {
                bat 'npm install'
            }
        }

        
        stage('Tests Playwright') {
            steps {
                bat 'npx playwright test'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
        }

        success {
            echo 'Tous les tests sont passés.'
        }

        failure {
            echo 'Au moins un test a échoué.'
        }
    }
}
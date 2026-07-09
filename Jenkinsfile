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
                bat 'xcopy * C:\\Apache24\\htdocs\\Sokali\\ /E /Y'
            }
        }

        stage('Installation des dépendances') {
            steps {
                bat 'npm install'
            }
        }

        stage('Installation navigateur Playwright') {
            steps {
                bat 'npx playwright install chromium'
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
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }

        success {
            echo 'Tous les tests Playwright sont réussis.'
        }

        failure {
            echo 'Au moins un test a échoué.'
        }
    }
}
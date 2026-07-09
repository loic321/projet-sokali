pipeline {
    agent any

    environment {
        APACHE_PATH = 'C:\\Apache24\\htdocs\\Sokali'
        BACKUP_PATH = 'C:\\Backup\\Sokali'
    }

    stages {

        stage('Récupération du code') {
            steps {
                echo 'Code récupéré depuis GitHub'
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


        stage('Sauvegarde ancienne version') {
            steps {
                bat '''
                if exist C:\\Backup\\Sokali (
                    rmdir /S /Q C:\\Backup\\Sokali
                )

                mkdir C:\\Backup\\Sokali

                xcopy C:\\Apache24\\htdocs\\Sokali C:\\Backup\\Sokali /E /Y
                '''
            }
        }


        stage('Déploiement Apache') {
            steps {
                bat '''
                xcopy * C:\\Apache24\\htdocs\\Sokali /E /Y
                '''
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

            archiveArtifacts(
                artifacts: 'playwright-report/**',
                allowEmptyArchive: true
            )


            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Rapport Playwright'
            ])
        }


        success {

            echo 'Pipeline terminé avec succès'

            emailext(
                subject: 'Sokali CI/CD - Tests réussis',
                body: '''
Bonjour,

Le pipeline Jenkins du projet Sokali est terminé avec succès.

Résultats :
- Déploiement Apache : OK
- Tests Playwright : OK
- Rapport disponible dans Jenkins.

Cordialement.
''',
                to: 'tonmail@gmail.com'
            )
        }


        failure {

            echo 'Pipeline échoué'

            emailext(
                subject: 'Sokali CI/CD - Échec du pipeline',
                body: '''
Bonjour,

Le pipeline Jenkins du projet Sokali a échoué.

Veuillez consulter Jenkins pour voir les erreurs et le rapport Playwright.

Cordialement.
''',
                to: 'christianloic321@gmail.com'
            )
        }
    }
}
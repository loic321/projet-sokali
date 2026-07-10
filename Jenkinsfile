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
                bat """
                if exist %BACKUP_PATH% (
                    rmdir /S /Q %BACKUP_PATH%
                )
                mkdir %BACKUP_PATH%
                xcopy %APACHE_PATH% %BACKUP_PATH% /E /Y
                """
            }
        }

        stage('Déploiement Apache') {
            steps {
                bat "xcopy * %APACHE_PATH% /E /Y"
            }
        }

        stage('Tests Playwright') {
            steps {
                timeout(time: 10, unit: 'MINUTES') {
                    bat 'npx playwright test --reporter=html --timeout=60000'
                }
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
                allowMissing: false,
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
                body: 'Bonjour,\n\nLe pipeline Jenkins du projet Sokali est terminé avec succès.\n\nRapport disponible dans Jenkins.\n\nCordialement.',
                to: 'christianloic321@gmail.com'
            )
        }

        failure {
            echo 'Pipeline échoué'
            emailext(
                subject: 'Sokali CI/CD - Échec du pipeline',
                body: 'Bonjour,\n\nLe pipeline Jenkins du projet Sokali a échoué.\n\nVeuillez consulter Jenkins pour voir les erreurs et le rapport Playwright.\n\nCordialement.',
                to: 'christianloic321@gmail.com'
            )
        }
    }
}

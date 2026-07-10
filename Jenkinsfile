pipeline {
    agent any
    
    environment {
        EMAIL_TO = 'christianloic321@gmail.com'
        PLAYWRIGHT_REPORT_DIR = 'playwright-report'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo '✅ Code récupéré'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
                echo '✅ Dépendances installées'
            }
        }
        
        stage('Install Browsers') {
            steps {
                bat 'npx playwright install'
                echo '✅ Navigateurs installés'
            }
        }
        
        stage('Run Tests') {
            steps {
                catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                    bat 'npx playwright test'
                }
            }
        }
        
        stage('Publish Report') {
            steps {
                script {
                    // Vérifier que le rapport existe
                    if (fileExists('playwright-report/index.html')) {
                        echo '✅ Rapport Playwright trouvé'
                        
                        publishHTML([
                            allowMissing: false,
                            alwaysLinkToLastBuild: true,
                            keepAll: true,
                            reportDir: 'playwright-report',
                            reportFiles: 'index.html',
                            reportName: 'Rapport Playwright',
                            includes: '**/*'  // Inclut CSS/JS
                        ])
                        
                        archiveArtifacts(
                            artifacts: 'playwright-report/**',
                            allowEmptyArchive: true
                        )
                    } else {
                        echo '⚠️ Aucun rapport Playwright trouvé'
                    }
                }
            }
        }
        
        stage('Deploy to Apache') {
            steps {
                script {
                    // Supprimer les anciens fichiers
                    bat 'if exist C:\\Apache24\\htdocs\\sokali rmdir /s /q C:\\Apache24\\htdocs\\sokali'
                    
                    // Créer le dossier
                    bat 'mkdir C:\\Apache24\\htdocs\\sokali'
                    
                    // Copier les fichiers (exclure les dossiers de test)
                    bat 'xcopy /E /I /Y * C:\\Apache24\\htdocs\\sokali\\ /EXCLUDE:exclude.txt'
                }
                echo '✅ Déploiement Apache terminé'
            }
        }
    }
    
    post {
        always {
            cleanWs()
            echo '🧹 Workspace nettoyé'
        }
        
        success {
            echo '🎉 Pipeline terminé avec succès'
            
            emailext(
                subject: "✅ Sokali #${env.BUILD_NUMBER} - SUCCESS",
                body: """
                    <h2>✅ Build réussi</h2>
                    <p><b>Projet :</b> Sokali</p>
                    <p><b>Build # :</b> ${env.BUILD_NUMBER}</p>
                    <p><b>URL :</b> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                    <p><b>Rapport :</b> <a href="${env.BUILD_URL}/Rapport_20Playwright/">Voir le rapport</a></p>
                    <hr/>
                    <p>Déploiement effectué sur Apache.</p>
                """,
                to: EMAIL_TO
            )
        }
        
        failure {
            emailext(
                subject: "❌ Sokali #${env.BUILD_NUMBER} - FAILED",
                body: """
                    <h2 style="color: red;">❌ Build échoué</h2>
                    <p><b>Projet :</b> Sokali</p>
                    <p><b>Build # :</b> ${env.BUILD_NUMBER}</p>
                    <p><b>URL :</b> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                    <p>Veuillez consulter les logs pour identifier l'erreur.</p>
                """,
                to: EMAIL_TO
            )
        }
    }
}
pipeline {
    agent any
    
    environment {
        EMAIL_TO = 'christianloic321@gmail.com'
        APACHE_DIR = 'C:\\Apache24\\htdocs\\sokali'
        BUILD_STATUS = ''
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo '✅ Code récupéré depuis GitHub'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
                echo '✅ Dépendances npm installées'
            }
        }
        
        stage('Install Browsers') {
            steps {
                bat 'npx playwright install'
                echo '✅ Navigateurs Playwright installés'
            }
        }
        
        stage('Run Tests') {
            steps {
                catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                    bat 'npx playwright test'
                }
            }
        }
        
        stage('Generate Report') {
            steps {
                script {
                    if (fileExists('playwright-report/index.html')) {
                        echo '✅ Rapport Playwright généré'
                        
                        publishHTML([
                            allowMissing: false,
                            alwaysLinkToLastBuild: true,
                            keepAll: true,
                            reportDir: 'playwright-report',
                            reportFiles: 'index.html',
                            reportName: 'Rapport Playwright',
                            includes: '**/*'  // Inclut CSS/JS/images
                        ])
                        
                        archiveArtifacts(
                            artifacts: 'playwright-report/**',
                            allowEmptyArchive: true,
                            fingerprint: true
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
                    // Nettoyer l'ancien déploiement
                    bat """
                        if exist ${APACHE_DIR} rmdir /s /q ${APACHE_DIR}
                        mkdir ${APACHE_DIR}
                    """
                    
                    // Copier les fichiers nécessaires
                    // Option 1 : Copier uniquement les fichiers sources et HTML
                    bat """
                        xcopy /E /I /Y src\\* ${APACHE_DIR}\\ 2>nul
                        xcopy /E /I /Y *.html ${APACHE_DIR}\\ 2>nul
                        xcopy /E /I /Y *.css ${APACHE_DIR}\\ 2>nul
                        xcopy /E /I /Y *.js ${APACHE_DIR}\\ 2>nul
                    """
                    
                    // Option 2 (alternative) : Copier tout en excluant les dossiers de test
                    // Créez un fichier exclude.txt dans la racine du projet avec :
                    // node_modules\
                    // playwright-report\
                    // test-results\
                    // .git\
                    // Jenkinsfile
                    // *.md
                    // package.json
                    // package-lock.json
                    // bat "xcopy /E /I /Y * ${APACHE_DIR}\\ /EXCLUDE:exclude.txt"
                    
                    echo '✅ Déploiement vers Apache effectué'
                }
            }
        }
        
        stage('Test Email Configuration') {
            steps {
                script {
                    echo '=== TEST DE CONFIGURATION EMAIL ==='
                    
                    // Test d'envoi d'email avec logs
                    try {
                        emailext(
                            to: EMAIL_TO,
                            subject: "TEST - Sokali Jenkins Configuration",
                            body: """
                                <h2>Test de configuration email</h2>
                                <p><b>Job :</b> ${env.JOB_NAME}</p>
                                <p><b>Build :</b> ${env.BUILD_NUMBER}</p>
                                <p><b>Date :</b> ${new Date()}</p>
                                <p>✅ La configuration SMTP fonctionne correctement.</p>
                            """
                        )
                        echo '✅ Email de test envoyé avec succès'
                    } catch (Exception e) {
                        echo "❌ Erreur lors de l'envoi du test : ${e.getMessage()}"
                        e.printStackTrace()
                    }
                }
            }
        }
    }
    
    post {
        always {
            script {
                // Nettoyage du workspace avec gestion d'erreur
                try {
                    sleep time: 2, unit: 'SECONDS'
                    cleanWs(
                        cleanWhenAborted: true,
                        cleanWhenFailure: true,
                        cleanWhenNotBuilt: true,
                        deleteDirs: true
                    )
                } catch (Exception e) {
                    echo "⚠️ Erreur lors du nettoyage : ${e.getMessage()}"
                    // Ignorer l'erreur pour ne pas faire échouer le pipeline
                }
            }
            echo '🧹 Nettoyage du workspace terminé'
        }
        
        success {
            script {
                echo '🎉 Pipeline terminé avec SUCCÈS'
                currentBuild.result = 'SUCCESS'
                
                try {
                    // Envoyer l'email de succès
                    emailext(
                        to: EMAIL_TO,
                        subject: "✅ Sokali Build #${env.BUILD_NUMBER} - SUCCESS",
                        body: """
                            <html>
                                <head>
                                    <style>
                                        body { font-family: Arial, sans-serif; color: #333; }
                                        h2 { color: #28a745; }
                                        .info { background: #f8f9fa; padding: 10px; border-radius: 5px; margin: 10px 0; }
                                        .success { color: #28a745; font-weight: bold; }
                                        .footer { margin-top: 20px; font-size: 12px; color: #6c757d; }
                                    </style>
                                </head>
                                <body>
                                    <h2>✅ Build réussi !</h2>
                                    <div class="info">
                                        <p><b>Projet :</b> Sokali</p>
                                        <p><b>Build # :</b> ${env.BUILD_NUMBER}</p>
                                        <p><b>Statut :</b> <span class="success">✅ SUCCESS</span></p>
                                        <p><b>URL du build :</b> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                                        <p><b>Rapport Playwright :</b> <a href="${env.BUILD_URL}/Rapport_20Playwright/">Voir le rapport complet</a></p>
                                    </div>
                                    <hr/>
                                    <p><b>Résultats :</b></p>
                                    <ul>
                                        <li>✅ Tests Playwright : réussis</li>
                                        <li>✅ Déploiement Apache : effectué</li>
                                        <li>✅ Rapport généré et archivé</li>
                                    </ul>
                                    <p><b>Date :</b> ${new Date().format('dd/MM/yyyy HH:mm:ss')}</p>
                                    <p><b>Durée :</b> ${currentBuild.durationString}</p>
                                    <div class="footer">
                                        <p>Cet email a été envoyé automatiquement par Jenkins CI/CD.</p>
                                    </div>
                                </body>
                            </html>
                        """,
                        mimeType: 'text/html'
                    )
                    echo '✅ Email de succès envoyé avec succès'
                    
                } catch (Exception e) {
                    echo "❌ ERREUR lors de l'envoi de l'email : ${e.getMessage()}"
                    e.printStackTrace()
                }
            }
        }
        
        failure {
            script {
                echo '❌ Pipeline terminé en ÉCHEC'
                currentBuild.result = 'FAILURE'
                
                try {
                    // Envoyer l'email d'échec
                    emailext(
                        to: EMAIL_TO,
                        subject: "❌ Sokali Build #${env.BUILD_NUMBER} - FAILED",
                        body: """
                            <html>
                                <head>
                                    <style>
                                        body { font-family: Arial, sans-serif; color: #333; }
                                        h2 { color: #dc3545; }
                                        .error { background: #f8d7da; padding: 10px; border-radius: 5px; margin: 10px 0; }
                                        .footer { margin-top: 20px; font-size: 12px; color: #6c757d; }
                                    </style>
                                </head>
                                <body>
                                    <h2 style="color: #dc3545;">❌ Build échoué</h2>
                                    <div class="error">
                                        <p><b>Projet :</b> Sokali</p>
                                        <p><b>Build # :</b> ${env.BUILD_NUMBER}</p>
                                        <p><b>Statut :</b> ❌ FAILED</p>
                                        <p><b>URL du build :</b> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                                    </div>
                                    <hr/>
                                    <p><b>Erreurs possibles :</b></p>
                                    <ul>
                                        <li>❌ Tests Playwright échoués</li>
                                        <li>❌ Problème de déploiement Apache</li>
                                        <li>❌ Erreur de compilation ou de dépendances</li>
                                    </ul>
                                    <p><b>Date :</b> ${new Date().format('dd/MM/yyyy HH:mm:ss')}</p>
                                    <p><b>Pour résoudre :</b></p>
                                    <ol>
                                        <li>Consultez les logs Jenkins</li>
                                        <li>Vérifiez le rapport Playwright</li>
                                        <li>Corrigez les erreurs et repoussez</li>
                                    </ol>
                                    <div class="footer">
                                        <p>Cet email a été envoyé automatiquement par Jenkins CI/CD.</p>
                                    </div>
                                </body>
                            </html>
                        """,
                        mimeType: 'text/html'
                    )
                    echo '✅ Email d\'échec envoyé'
                    
                } catch (Exception e) {
                    echo "❌ ERREUR lors de l'envoi de l'email d'échec : ${e.getMessage()}"
                    e.printStackTrace()
                }
            }
        }
        
        aborted {
            script {
                echo '⚠️ Pipeline annulé'
                
                try {
                    emailext(
                        to: EMAIL_TO,
                        subject: "⚠️ Sokali Build #${env.BUILD_NUMBER} - ABORTED",
                        body: """
                            <h2 style="color: #ffc107;">⚠️ Build annulé</h2>
                            <p><b>Projet :</b> Sokali</p>
                            <p><b>Build # :</b> ${env.BUILD_NUMBER}</p>
                            <p><b>Date :</b> ${new Date().format('dd/MM/yyyy HH:mm:ss')}</p>
                            <p>Le build a été annulé manuellement.</p>
                        """
                    )
                } catch (Exception e) {
                    echo "❌ Erreur email d'annulation : ${e.getMessage()}"
                }
            }
        }
    }
}
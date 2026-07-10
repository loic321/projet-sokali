pipeline {
    agent any
    
    environment {
        EMAIL_TO = 'christianloic321@gmail.com'
        APACHE_DEPLOY = 'C:\\Apache24\\htdocs\\Sokali'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo '✅ Code récupéré'
                
                // Vérifier que index.html est à la racine du projet
                script {
                    if (fileExists('index.html')) {
                        echo '✅ index.html trouvé à la racine du projet'
                    } else {
                        error '❌ index.html manquant à la racine du projet !'
                    }
                }
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
                    if (fileExists('playwright-report/index.html')) {
                        echo '✅ Rapport Playwright généré'
                        
                        publishHTML([
                            allowMissing: false,
                            alwaysLinkToLastBuild: true,
                            keepAll: true,
                            reportDir: 'playwright-report',
                            reportFiles: 'index.html',
                            reportName: 'Rapport Playwright',
                            includes: '**/*'  // Inclut CSS, JS, images
                        ])
                        
                        archiveArtifacts(
                            artifacts: 'playwright-report/**',
                            allowEmptyArchive: false
                        )
                    } else {
                        echo '⚠️ Rapport manquant'
                    }
                }
            }
        }
        
        stage('Deploy to Apache') {
            steps {
                script {
                    // Nettoyer le dossier Apache
                    bat """
                        if exist ${APACHE_DEPLOY} rmdir /s /q ${APACHE_DEPLOY}
                        mkdir ${APACHE_DEPLOY}
                    """
                    
                    // Copier index.html à la racine
                    bat "copy index.html ${APACHE_DEPLOY}\\"
                    
                    // Copier les dossiers nécessaires (css, js, etc.)
                    // Adaptez selon votre structure
                    def folders = ['css', 'js', 'assets', 'images']
                    folders.each { folder ->
                        if (fileExists(folder)) {
                            bat "xcopy /E /I /Y ${folder} ${APACHE_DEPLOY}\\${folder}\\"
                            echo "✅ ${folder} copié"
                        }
                    }
                    
                    // Alternative : copier tout sauf les dossiers inutiles
                    /*
                    bat """
                        for /d %%i in (*) do (
                            if not "%%i"=="tests" if not "%%i"=="node_modules" if not "%%i"=="playwright-report" if not "%%i"==".git" (
                                xcopy /E /I /Y %%i ${APACHE_DEPLOY}\\%%i\\
                            )
                        )
                    """
                    */
                    
                    // Vérification finale
                    if (fileExists('C:/Apache24/htdocs/Sokali/index.html')) {
                        echo '✅ Déploiement réussi - index.html présent'
                    } else {
                        error '❌ Déploiement échoué - index.html manquant'
                    }
                }
            }
        }
        
        // Vérifier l'accès au site
        stage('Verify Site') {
            steps {
                script {
                    def url = 'http://localhost/Sokali/'
                    echo "🌐 Vérification : ${url}"
                    
                    // Option 1 : avec curl (si installé)
                    try {
                        def status = bat(script: "curl -s -o nul -w \"%{http_code}\" ${url}", returnStdout: true).trim()
                        if (status == '200') {
                            echo "✅ Site accessible (HTTP ${status})"
                        } else {
                            echo "⚠️ Site réponse : HTTP ${status}"
                        }
                    } catch (Exception e) {
                        echo "⚠️ Impossible de vérifier : ${e.getMessage()}"
                    }
                    
                    // Option 2 : avec PowerShell
                    try {
                        bat """
                            powershell -Command "
                                \$response = Invoke-WebRequest -Uri ${url} -UseBasicParsing
                                Write-Host '✅ Site accessible - Status: ' \$response.StatusCode
                            "
                        """
                    } catch (Exception e) {
                        echo "⚠️ Site non accessible"
                    }
                }
            }
        }
    }
    
    post {
        always {
            script {
                try {
                    sleep time: 2, unit: 'SECONDS'
                    cleanWs(
                        cleanWhenAborted: true,
                        cleanWhenFailure: true,
                        cleanWhenNotBuilt: true,
                        deleteDirs: true
                    )
                } catch (Exception e) {
                    echo "⚠️ Erreur nettoyage : ${e.getMessage()}"
                }
            }
            echo '🧹 Nettoyage terminé'
        }
        
        success {
            script {
                echo '🎉 Pipeline SUCCÈS'
                
                try {
                    emailext(
                        to: EMAIL_TO,
                        subject: "✅ Sokali Build #${env.BUILD_NUMBER} - SUCCESS",
                        body: """
                            <html>
                                <head>
                                    <style>
                                        body { font-family: Arial, sans-serif; }
                                        .success { color: #28a745; }
                                        .info { background: #f8f9fa; padding: 15px; border-radius: 5px; }
                                        .link { color: #007bff; text-decoration: none; }
                                    </style>
                                </head>
                                <body>
                                    <h2 class="success">✅ Build réussi !</h2>
                                    
                                    <div class="info">
                                        <p><b>Projet :</b> Sokali</p>
                                        <p><b>Build # :</b> ${env.BUILD_NUMBER}</p>
                                        <p><b>Statut :</b> ✅ SUCCESS</p>
                                        <p><b>URL :</b> <a href="${env.BUILD_URL}" class="link">${env.BUILD_URL}</a></p>
                                        <p><b>Rapport :</b> <a href="${env.BUILD_URL}/Rapport_20Playwright/" class="link">Voir le rapport</a></p>
                                    </div>
                                    
                                    <hr/>
                                    
                                    <p><b>🔗 Site déployé :</b></p>
                                    <p><a href="http://localhost/Sokali/" class="link">http://localhost/Sokali/</a></p>
                                    
                                    <p><b>📅 Date :</b> ${new Date().format('dd/MM/yyyy HH:mm:ss')}</p>
                                    <p><b>⏱️ Durée :</b> ${currentBuild.durationString}</p>
                                    
                                    <hr/>
                                    <p style="font-size:12px;color:#666;">
                                        Cet email a été envoyé automatiquement par Jenkins.
                                    </p>
                                </body>
                            </html>
                        """,
                        mimeType: 'text/html'
                    )
                    echo "✅ Email envoyé à ${EMAIL_TO}"
                } catch (Exception e) {
                    echo "❌ Erreur envoi email : ${e.getMessage()}"
                    // Afficher la stack trace
                    e.printStackTrace()
                }
            }
        }
        
        failure {
            script {
                echo '❌ Pipeline ÉCHEC'
                
                try {
                    emailext(
                        to: EMAIL_TO,
                        subject: "❌ Sokali Build #${env.BUILD_NUMBER} - FAILED",
                        body: """
                            <html>
                                <body>
                                    <h2 style="color: red;">❌ Build échoué</h2>
                                    <p><b>Projet :</b> Sokali</p>
                                    <p><b>Build # :</b> ${env.BUILD_NUMBER}</p>
                                    <p><b>URL :</b> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                                    <hr/>
                                    <p><b>Erreurs possibles :</b></p>
                                    <ul>
                                        <li>❌ Tests Playwright échoués</li>
                                        <li>❌ Déploiement Apache</li>
                                        <li>❌ Dépendances manquantes</li>
                                    </ul>
                                    <p>📅 ${new Date().format('dd/MM/yyyy HH:mm:ss')}</p>
                                </body>
                            </html>
                        """,
                        mimeType: 'text/html'
                    )
                } catch (Exception e) {
                    echo "❌ Erreur email échec : ${e.getMessage()}"
                }
            }
        }
    }
}
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
                
                script {
                    // Afficher la structure
                    echo '=== STRUCTURE DU PROJET ==='
                    bat 'dir /b'
                    bat 'dir /b docs 2>nul || echo "Pas de dossier docs"'
                    
                    // Chercher index.html
                    def found = false
                    def locations = ['docs/index.html', 'public/index.html', 'src/index.html', 'index.html']
                    
                    for (loc in locations) {
                        if (fileExists(loc)) {
                            echo "✅ index.html trouvé dans ${loc}"
                            found = true
                            // Stocker le chemin pour l'utiliser plus tard
                            env.INDEX_PATH = loc
                            break
                        }
                    }
                    
                    if (!found) {
                        bat 'dir /s *.html'
                        error '❌ index.html introuvable ! Vérifiez la structure du projet.'
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
                        echo '✅ Rapport généré'
                        
                        publishHTML([
                            allowMissing: false,
                            alwaysLinkToLastBuild: true,
                            keepAll: true,
                            reportDir: 'playwright-report',
                            reportFiles: 'index.html',
                            reportName: 'Rapport Playwright',
                            includes: '**/*'
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
                    def sourceDir = ''
                    
                    // Déterminer la source
                    if (fileExists('docs/index.html')) {
                        sourceDir = 'docs'
                    } else if (fileExists('public/index.html')) {
                        sourceDir = 'public'
                    } else if (fileExists('src/index.html')) {
                        sourceDir = 'src'
                    } else if (fileExists('index.html')) {
                        sourceDir = '.'
                    } else {
                        error '❌ Aucun index.html trouvé'
                    }
                    
                    echo "📁 Source : ${sourceDir}"
                    
                    // Nettoyer Apache
                    bat """
                        if exist ${APACHE_DEPLOY} rmdir /s /q ${APACHE_DEPLOY}
                        mkdir ${APACHE_DEPLOY}
                    """
                    
                    // Copier selon la source
                    if (sourceDir == '.') {
                        // Copier tous les fichiers sauf les dossiers inutiles
                        bat """
                            xcopy /E /I /Y * ${APACHE_DEPLOY}\\ /EXCLUDE:exclude.txt
                        """
                    } else {
                        // Copier le contenu du dossier source
                        bat "xcopy /E /I /Y ${sourceDir}\\* ${APACHE_DEPLOY}\\"
                    }
                    
                    // Vérification finale
                    if (fileExists('C:/Apache24/htdocs/Sokali/index.html')) {
                        echo '✅ index.html présent dans Apache'
                    } else {
                        // Essayer de copier depuis la racine
                        bat "copy index.html ${APACHE_DEPLOY}\\ 2>nul"
                        if (fileExists('C:/Apache24/htdocs/Sokali/index.html')) {
                            echo '✅ index.html copié depuis la racine'
                        } else {
                            error '❌ Déploiement échoué'
                        }
                    }
                }
            }
        }
        
        stage('Verify Site') {
            steps {
                script {
                    echo '🌐 Vérification du site...'
                    try {
                        bat """
                            powershell -Command "
                                try {
                                    \$response = Invoke-WebRequest -Uri http://localhost/Sokali/ -UseBasicParsing -TimeoutSec 5
                                    Write-Host '✅ Site accessible - Status: ' \$response.StatusCode
                                } catch {
                                    Write-Host '⚠️ Site non accessible : ' \$_.Exception.Message
                                }
                            "
                        """
                    } catch (Exception e) {
                        echo "⚠️ Vérification impossible : ${e.getMessage()}"
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
                        subject: "✅ Sokali #${env.BUILD_NUMBER} - SUCCESS",
                        body: """
                            <html>
                                <body>
                                    <h2 style="color: #28a745;">✅ Build réussi !</h2>
                                    <p><b>Projet :</b> Sokali</p>
                                    <p><b>Build # :</b> ${env.BUILD_NUMBER}</p>
                                    <p><b>URL :</b> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                                    <p><b>Rapport :</b> <a href="${env.BUILD_URL}/Rapport_20Playwright/">Voir le rapport</a></p>
                                    <hr/>
                                    <p><b>🌐 Site :</b> <a href="http://localhost/Sokali/">http://localhost/Sokali/</a></p>
                                    <p><b>📅 Date :</b> ${new Date().format('dd/MM/yyyy HH:mm:ss')}</p>
                                </body>
                            </html>
                        """,
                        mimeType: 'text/html'
                    )
                    echo "✅ Email envoyé"
                } catch (Exception e) {
                    echo "❌ Erreur email : ${e.getMessage()}"
                }
            }
        }
        
        failure {
            script {
                echo '❌ Pipeline ÉCHEC'
                
                try {
                    emailext(
                        to: EMAIL_TO,
                        subject: "❌ Sokali #${env.BUILD_NUMBER} - FAILED",
                        body: """
                            <h2 style="color: red;">❌ Build échoué</h2>
                            <p><b>Build # :</b> ${env.BUILD_NUMBER}</p>
                            <p><b>URL :</b> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                            <p>Consultez les logs pour plus de détails.</p>
                            <hr/>
                            <p><b>Problème probable :</b> index.html introuvable</p>
                            <p>Vérifiez que index.html est dans le projet et accessible.</p>
                        """
                    )
                } catch (Exception e) {
                    echo "❌ Erreur email : ${e.getMessage()}"
                }
            }
        }
    }
}
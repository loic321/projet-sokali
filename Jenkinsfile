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
                echo 'Code recupere depuis GitHub'
                
                script {
                    if (fileExists('docs/index.html')) {
                        echo 'index.html trouve dans docs/'
                    } else if (fileExists('index.html')) {
                        echo 'index.html trouve a la racine'
                    } else {
                        error 'index.html introuvable'
                    }
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
                echo 'Dependances npm installees'
            }
        }
        
        stage('Install Browsers') {
            steps {
                bat 'npx playwright install'
                echo 'Navigateurs Playwright installes'
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
                        echo 'Rapport Playwright genere'
                        
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
                            allowEmptyArchive: false,
                            fingerprint: true
                        )
                        
                        echo 'Rapport publie dans Jenkins'
                    } else {
                        echo 'Aucun rapport Playwright trouve'
                    }
                }
            }
        }
        
        stage('Deploy to Apache') {
            steps {
                script {
                    def sourceDir = fileExists('docs/index.html') ? 'docs' : '.'
                    
                    bat """
                        echo "Nettoyage de l'ancien deploiement..."
                        if exist ${APACHE_DEPLOY} rmdir /s /q ${APACHE_DEPLOY}
                        mkdir ${APACHE_DEPLOY}
                        
                        echo "Copie des fichiers depuis ${sourceDir}/ vers Apache..."
                        xcopy /E /I /Y ${sourceDir}\\* ${APACHE_DEPLOY}\\
                        echo "Copie terminee"
                    """
                    
                    if (fileExists('C:/Apache24/htdocs/Sokali/index.html')) {
                        echo 'Deploiement reussi - index.html present'
                    } else {
                        error 'Deploiement echoue - index.html absent'
                    }
                }
            }
        }
        
        stage('Verify Deployment') {
            steps {
                script {
                    echo 'Verification du deploiement...'
                    
                    // Vérifier Apache
                    try {
                        def result = bat(
                            script: 'curl -s -o nul -w "%{http_code}" http://localhost/Sokali/',
                            returnStdout: true
                        ).trim()
                        
                        if (result == '200') {
                            echo "Site accessible (HTTP ${result})"
                        } else {
                            echo "Site repond HTTP ${result}"
                            // Ne pas faire échouer le pipeline
                        }
                    } catch (Exception e) {
                        echo "Apache ne repond pas : ${e.getMessage()}"
                        echo "Verifiez qu'Apache est demarre sur localhost:80"
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
                    echo "Erreur nettoyage : ${e.getMessage()}"
                }
            }
            echo 'Nettoyage du workspace termine'
        }
        
        success {
            script {
                echo 'Pipeline termine avec SUCCES'
                
                try {
                    emailext(
                        to: EMAIL_TO,
                        subject: "Sokali Build ${env.BUILD_NUMBER} - SUCCESS",
                        body: """
                            Build reussi

                            Projet: Sokali
                            Build: ${env.BUILD_NUMBER}
                            URL: ${env.BUILD_URL}
                            Rapport: ${env.BUILD_URL}/Rapport_20Playwright/
                            Site: http://localhost/Sokali/
                            Date: ${new Date().format('dd/MM/yyyy HH:mm:ss')}
                        """
                    )
                    echo "Email de succes envoye"
                } catch (Exception e) {
                    echo "Erreur email : ${e.getMessage()}"
                }
            }
        }
        
        failure {
            script {
                echo 'Pipeline termine en ECHEC'
                
                try {
                    emailext(
                        to: EMAIL_TO,
                        subject: "Sokali Build ${env.BUILD_NUMBER} - FAILED",
                        body: """
                            Build echoue

                            Projet: Sokali
                            Build: ${env.BUILD_NUMBER}
                            URL: ${env.BUILD_URL}
                            Date: ${new Date().format('dd/MM/yyyy HH:mm:ss')}
                            
                            Verifiez que Apache est demarre sur localhost:80
                            Et que le site est accessible sur http://localhost/Sokali/
                        """
                    )
                    echo "Email d'echec envoye"
                } catch (Exception e) {
                    echo "Erreur email : ${e.getMessage()}"
                }
            }
        }
    }
}
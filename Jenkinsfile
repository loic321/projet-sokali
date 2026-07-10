pipeline {
    agent any
    
    environment {
        EMAIL_TO = 'christianloic321@gmail.com'
        APACHE_DEPLOY = 'C:\\Apache24\\htdocs\\Sokali'
        BUILD_STATUS = ''
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
                    def sourceDir = ''
                    
                    // Determiner la source
                    if (fileExists('docs/index.html')) {
                        sourceDir = 'docs'
                        echo "Source: docs/"
                    } else if (fileExists('index.html')) {
                        sourceDir = '.'
                        echo "Source: racine"
                    } else {
                        error 'Aucun index.html trouve'
                    }
                    
                    // Nettoyer et deployer
                    bat """
                        echo "Nettoyage de l'ancien deploiement..."
                        if exist ${APACHE_DEPLOY} rmdir /s /q ${APACHE_DEPLOY}
                        mkdir ${APACHE_DEPLOY}
                        
                        echo "Copie des fichiers depuis ${sourceDir}/ vers Apache..."
                        xcopy /E /I /Y ${sourceDir}\\* ${APACHE_DEPLOY}\\
                        echo "Copie terminee"
                    """
                    
                    // Verification
                    if (fileExists('C:/Apache24/htdocs/Sokali/index.html')) {
                        echo "Deploiement reussi - index.html present"
                    } else {
                        error "Deploiement echoue - index.html absent"
                    }
                }
            }
        }
        
        stage('Verify Deployment') {
            steps {
                script {
                    echo 'Verification du deploiement...'
                    try {
                        def result = bat(
                            script: '''
                                powershell -Command "
                                    try {
                                        $response = Invoke-WebRequest -Uri 'http://localhost/Sokali/' -UseBasicParsing -TimeoutSec 5
                                        Write-Host 'SUCCESS:' $response.StatusCode
                                    } catch {
                                        Write-Host 'ERROR:' $_.Exception.Message
                                    }
                                "
                            ''',
                            returnStdout: true
                        ).trim()
                        
                        if (result.contains('SUCCESS')) {
                            echo "Site accessible : ${result}"
                        } else {
                            echo "Site non accessible : ${result}"
                        }
                    } catch (Exception e) {
                        echo "Verification impossible : ${e.getMessage()}"
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
                    echo "Erreur lors du nettoyage : ${e.getMessage()}"
                }
            }
            echo 'Nettoyage du workspace termine'
        }
        
        success {
            script {
                echo 'Pipeline termine avec SUCCES'
                currentBuild.result = 'SUCCESS'
                
                try {
                    emailext(
                        to: EMAIL_TO,
                        subject: "Sokali Build ${env.BUILD_NUMBER} - SUCCESS",
                        body: """
                            Build reussi
            
                            Projet: Sokali
                            Build: ${env.BUILD_NUMBER}
                            Statut: SUCCESS
                            URL: ${env.BUILD_URL}
                            Rapport Playwright: ${env.BUILD_URL}/Rapport_20Playwright/
                            
                            Resultats:
                            - Tests Playwright: reussis
                            - Deploiement Apache: effectue
                            - Rapport genere et archive
                            
                            Site: http://localhost/Sokali/
                            Date: ${new Date().format('dd/MM/yyyy HH:mm:ss')}
                            Duree: ${currentBuild.durationString}
                            
                            Cet email a ete envoye automatiquement par Jenkins CI/CD.
                        """
                    )
                    echo "Email de succes envoye a ${EMAIL_TO}"
                    
                } catch (Exception e) {
                    echo "ERREUR lors de l'envoi de l'email : ${e.getMessage()}"
                    e.printStackTrace()
                }
            }
        }
        
        failure {
            script {
                echo 'Pipeline termine en ECHEC'
                currentBuild.result = 'FAILURE'
                
                try {
                    emailext(
                        to: EMAIL_TO,
                        subject: "Sokali Build ${env.BUILD_NUMBER} - FAILED",
                        body: """
                            Build echoue
            
                            Projet: Sokali
                            Build: ${env.BUILD_NUMBER}
                            Statut: FAILED
                            URL: ${env.BUILD_URL}
                            
                            Erreurs possibles:
                            - Tests Playwright echoues
                            - Probleme de deploiement Apache
                            - Erreur de compilation ou de dependances
                            
                            Date: ${new Date().format('dd/MM/yyyy HH:mm:ss')}
                            
                            Pour resoudre:
                            1. Consultez les logs Jenkins
                            2. Verifiez le rapport Playwright
                            3. Corrigez les erreurs et repoussez
                            
                            Cet email a ete envoye automatiquement par Jenkins CI/CD.
                        """
                    )
                    echo "Email d'echec envoye"
                    
                } catch (Exception e) {
                    echo "ERREUR lors de l'envoi de l'email d'echec : ${e.getMessage()}"
                    e.printStackTrace()
                }
            }
        }
        
        aborted {
            script {
                echo 'Pipeline annule'
                
                try {
                    emailext(
                        to: EMAIL_TO,
                        subject: "Sokali Build ${env.BUILD_NUMBER} - ABORTED",
                        body: """
                            Build annule
            
                            Projet: Sokali
                            Build: ${env.BUILD_NUMBER}
                            Date: ${new Date().format('dd/MM/yyyy HH:mm:ss')}
                            
                            Le build a ete annule manuellement.
                        """
                    )
                } catch (Exception e) {
                    echo "Erreur email d'annulation : ${e.getMessage()}"
                }
            }
        }
    } 

}
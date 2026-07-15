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

                    script {

                        echo 'Lancement des tests Playwright...'

                        catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {

                            bat 'npx playwright test'

                        }

                        echo "Tests terminés."
                        echo "Résultat actuel : ${currentBuild.currentResult}"

                    }

                }

            }

         stage('Publish Report') {

                steps {

                    script {

                        if (fileExists('playwright-report/index.html')) {

                            echo "Rapport Playwright trouvé."

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
                                fingerprint: true
                            )

                            echo "Rapport publié avec succès."

                        } else {

                            echo "Aucun rapport Playwright trouvé."

                        }

                    }

                }

            }

       stage('Compress Playwright Report') {

            steps {

                bat '''
                if exist playwright-report (
                    powershell Compress-Archive -Path playwright-report -DestinationPath playwright-report.zip -Force
                )
                '''

                archiveArtifacts(
                    artifacts: 'playwright-report.zip',
                    fingerprint: true
                )

            }

        }
        

        stage('Deploy to Apache') {

                when {

                    expression {

                        currentBuild.currentResult == 'SUCCESS'

                    }

                }

                steps {

                    script {

                        def sourceDir = fileExists('docs/index.html') ? 'docs' : '.'

                        bat """
                            echo Nettoyage...
                            if exist ${APACHE_DEPLOY} rmdir /s /q ${APACHE_DEPLOY}
                            mkdir ${APACHE_DEPLOY}

                            echo Copie...
                            xcopy /E /I /Y ${sourceDir}\\* ${APACHE_DEPLOY}\\
                        """

                        if (fileExists('C:/Apache24/htdocs/Sokali/index.html')) {

                            echo 'Déploiement réussi.'

                        } else {

                            error 'Déploiement échoué.'

                        }

                    }

                }

            }
        
       stage('Verify Deployment') {

            when {
                expression {
                    currentBuild.currentResult == null || currentBuild.currentResult == 'SUCCESS'
                }
            }

            steps {

                script {

                    echo "Vérification du déploiement..."

                    def result = bat(
                        script: 'curl -s -o nul -w "%%{http_code}" http://localhost/Sokali/',
                        returnStdout: true
                    ).trim()

                    echo "HTTP : ${result}"

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
                        deleteDirs: true,
                        disableDeferredWipeout: true,
                        cleanWhenFailure: true
                    )
                } catch (Exception e) {
                    echo "Erreur nettoyage : ${e.getMessage()}"
                }
            }
            echo 'Nettoyage du workspace termine'
        }
        
       success {
                script {

                    echo 'Pipeline terminé avec SUCCÈS'

                    echo "Destinataire : ${EMAIL_TO}"
                    echo "Préparation de l'envoi de l'email..."

                    try {

                        emailext(
                            to: EMAIL_TO,

                            subject: "Sokali Build ${env.BUILD_NUMBER} - SUCCESS",

                            mimeType: 'text/html',

                            body: """
            <html>
            <body>

            <h2>Pipeline Sokali terminé avec succès</h2>

            <p>
            Le pipeline Jenkins s'est exécuté correctement.
            </p>


            <table border="1" cellpadding="8" cellspacing="0">

            <tr>
            <td>Projet</td>
            <td>Sokali</td>
            </tr>

            <tr>
            <td>Build</td>
            <td>${env.BUILD_NUMBER}</td>
            </tr>

            <tr>
            <td>Date</td>
            <td>${new Date().format('dd/MM/yyyy HH:mm:ss')}</td>
            </tr>

            </table>


            <p>
            Rapport Playwright :
            <br>

            <a href="${env.BUILD_URL}Rapport_20Playwright/">
            Ouvrir le rapport des tests
            </a>

            </p>


            <p>
            Build Jenkins :
            <br>

            <a href="${env.BUILD_URL}">
            Voir les détails du build
            </a>

            </p>


            <p>
            Site Sokali :
            <br>

            <a href="http://localhost/Sokali/">
            Accéder au site
            </a>

            </p>


            <p>
            Cordialement,
            <br>
            Jenkins CI/CD
            </p>


            </body>
            </html>
            """
                        )


                        echo "Email SUCCESS envoyé avec succès"


                    } catch(Exception e) {

                        echo "Erreur pendant l'envoi de l'email SUCCESS : ${e.getMessage()}"

                    }

                }
            }
                            
           failure {
                script {

                    echo 'Pipeline terminé en ÉCHEC'

                    echo "Destinataire : ${EMAIL_TO}"
                    echo "Préparation de l'envoi de l'email..."

                    try {

                        emailext(
                            to: EMAIL_TO,

                            subject: "Sokali Build ${env.BUILD_NUMBER} - FAILURE",

                            mimeType: 'text/html',

                            body: """
            <html>
            <body>

            <h2>Pipeline Sokali échoué</h2>

            <p>
            Le pipeline Jenkins n'a pas pu terminer correctement.
            </p>


            <table border="1" cellpadding="8" cellspacing="0">

            <tr>
            <td>Projet</td>
            <td>Sokali</td>
            </tr>

            <tr>
            <td>Build</td>
            <td>${env.BUILD_NUMBER}</td>
            </tr>

            <tr>
            <td>Date</td>
            <td>${new Date().format('dd/MM/yyyy HH:mm:ss')}</td>
            </tr>

            </table>


            <p>
            Rapport Playwright :
            <br>

            <a href="${env.BUILD_URL}Rapport_20Playwright/">
            Ouvrir le rapport des tests
            </a>

            </p>


            <p>
            Console Jenkins :
            <br>

            <a href="${env.BUILD_URL}console">
            Voir les logs d'exécution
            </a>

            </p>


            <p>
            Cordialement,
            <br>
            Jenkins CI/CD
            </p>


            </body>
            </html>
            """

                        )


                   echo "Email FAILURE envoyé avec succès"


                 } catch(Exception e) {

                    echo "Erreur pendant l'envoi de l'email FAILURE : ${e.getMessage()}"

                   }

             }
         }
    }
}
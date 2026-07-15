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
                    echo "Tests Playwright terminés."

                    bat 'dir playwright-report'
                }
            }
        }
        
       stage('Publish Report') {

                steps {

                    script {

                        if(fileExists('playwright-report/index.html')) {

                            echo "Rapport Playwright trouvé"

                            publishHTML([
                                allowMissing: false,
                                alwaysLinkToLastBuild: true,
                                keepAll: true,
                                reportDir: 'playwright-report',
                                reportFiles: 'index.html',
                                reportName: 'Rapport Playwright',
                                includes: '**/*'
                            ])

                        } else {

                            error "Rapport Playwright absent"

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

                    try {

                        echo "Test de l'URL : http://localhost/Sokali/"

                        // Affiche le contenu renvoyé par Apache
                        bat 'curl http://localhost/Sokali/'

                        // Récupère le code HTTP
                        def result = bat(
                            script: 'curl -s -o nul -w "%%{http_code}" http://localhost/Sokali/',
                            returnStdout: true
                        ).trim()

                        echo "Résultat curl : ${result}"

                        if (result.contains('200')) {
                            echo "Site accessible (HTTP 200)"
                        } else {
                            echo "Site répond : ${result}"
                        }

                    } catch (Exception e) {
                        echo "Apache ne répond pas : ${e.getMessage()}"
                        echo "Vérifiez qu'Apache est démarré sur localhost:80"
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
        echo "Préparation de l'email HTML..."

        try {

            emailext(
                                to: EMAIL_TO,

                                subject: "✅ Sokali Build ${env.BUILD_NUMBER} - SUCCESS",

                                mimeType: 'text/html',

                                body: """
                                <html>
                                <body>

                                <h2>Pipeline Sokali terminé avec succès</h2>

                                <p>Bonjour,</p>

                                <p>
                                Le pipeline Jenkins s'est exécuté correctement.
                                </p>

                                <table border="1" cellpadding="8">

                                    <tr>
                                        <td><b>Projet</b></td>
                                        <td>Sokali</td>
                                    </tr>

                                    <tr>
                                        <td><b>Build</b></td>
                                        <td>${env.BUILD_NUMBER}</td>
                                    </tr>

                                    <tr>
                                        <td><b>Date</b></td>
                                        <td>${new Date().format('dd/MM/yyyy HH:mm:ss')}</td>
                                    </tr>

                                </table>


                                <h3>Liens Jenkins</h3>

                                <p>
                                📊 Rapport Playwright :
                                <br>
                                <a href="${env.BUILD_URL}Rapport_Playwright/">
                                Ouvrir le rapport des tests
                                </a>
                                </p>


                                <p>
                                ⚙️ Build Jenkins :
                                <br>
                                <a href="${env.BUILD_URL}">
                                Voir les détails du build
                                </a>
                                </p>


                                <p>
                                🌐 Site Sokali :
                                <br>
                                <a href="http://localhost/Sokali/">
                                Ouvrir le site
                                </a>
                                </p>


                                <br>

                                <p>
                                Cordialement,<br>
                                Jenkins CI/CD
                                </p>

                                </body>
                                </html>
                                """,

                                attachmentsPattern: 'playwright-report.zip'

                            )


                            echo "Email SUCCESS envoyé avec succès"

                        } catch(Exception e) {

                            echo "Erreur envoi email SUCCESS : ${e.getMessage()}"

                        }

                    }
                }
                            
        failure {
    script {

        echo 'Pipeline terminé en ÉCHEC'

        echo "Destinataire : ${EMAIL_TO}"
        echo "Préparation de l'email HTML..."

        try {

            emailext(

                        to: EMAIL_TO,

                        subject: "❌ Sokali Build ${env.BUILD_NUMBER} - FAILURE",

                        mimeType: 'text/html',

                        body: """

                        <html>
                        <body>


                        <h2>Pipeline Sokali en échec</h2>


                        <p>Bonjour,</p>


                        <p>
                        Le pipeline Jenkins a rencontré une erreur.
                        </p>


                        <table border="1" cellpadding="8">

                            <tr>
                                <td><b>Projet</b></td>
                                <td>Sokali</td>
                            </tr>

                            <tr>
                                <td><b>Build</b></td>
                                <td>${env.BUILD_NUMBER}</td>
                            </tr>

                            <tr>
                                <td><b>Date</b></td>
                                <td>${new Date().format('dd/MM/yyyy HH:mm:ss')}</td>
                            </tr>

                        </table>


                        <h3>Informations de debug</h3>


                        <p>
                        Rapport Playwright :
                        <br>

                        <a href="${env.BUILD_URL}Rapport_Playwright/">
                        Ouvrir le rapport des tests
                        </a>

                        </p>


                        <p>
                        Logs Jenkins :
                        <br>

                        <a href="${env.BUILD_URL}console">
                        Voir la console Jenkins
                        </a>

                        </p>


                        <br>


                        <p>
                        Cordialement,<br>
                        Jenkins CI/CD
                        </p>


                        </body>
                        </html>

                        """,

                        attachmentsPattern: 'playwright-report.zip'

                    )


                    echo "Email FAILURE envoyé avec succès"


                } catch(Exception e) {


                    echo "Erreur envoi email FAILURE : ${e.getMessage()}"


                }

            }
        }
    }
}
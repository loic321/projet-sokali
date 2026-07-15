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
                echo "Début de l'envoi de l'e-mail..."

                try {

                    mail(
                        to: EMAIL_TO,
                        from: 'christianloic321@gmail.com',
                        subject: "Pipeline terminé avec SUCCÈS",
                        body: """
        Le build Jenkins s'est exécuté correctement.

        Projet : Sokali
        Build : ${env.BUILD_NUMBER}
        URL : ${env.BUILD_URL}
        Site : http://localhost/Sokali/
        Date : ${new Date().format('dd/MM/yyyy HH:mm:ss')}
        """
                    )

                    echo "mail() s'est terminé sans exception."

                } catch(Exception e) {

                    echo "ERREUR pendant mail()"

                    echo e.toString()

                    e.printStackTrace()

                }

            }
        }
                
        failure {
            script {

                echo 'Pipeline terminé en ÉCHEC'

                echo "Destinataire : ${EMAIL_TO}"
                echo "Début de l'envoi de l'e-mail..."

                try {

                    mail(
                        to: EMAIL_TO,
                        from: 'christianloic321@gmail.com',
                        subject: "Pipeline terminé en ÉCHEC",
                        body: """
        Le build Jenkins a échoué.

        Projet : Sokali
        Build : ${env.BUILD_NUMBER}
        URL : ${env.BUILD_URL}

        Consultez les logs Jenkins.
        """
                    )

                    echo "mail() s'est terminé sans exception."

                } catch(Exception e){

                    echo "ERREUR pendant mail()"

                    echo e.toString()

                    e.printStackTrace()

                }

            }
        }
    }
}
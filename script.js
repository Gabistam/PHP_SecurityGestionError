// Données des quiz avec explications détaillées pour le cours sécurité PHP
const quizData = {
    1: [
        {
            explanation: "43% des cyberattaques visent effectivement les petites entreprises, souvent moins bien protégées que les grandes corporations."
        },
        {
            explanation: "Afficher les erreurs complètes aux utilisateurs révèle des informations sensibles comme les chemins de fichiers, noms de base de données, structure des requêtes SQL, etc. C'est une mine d'or pour les pirates !"
        },
        {
            explanation: "En production, il faut toujours logger les erreurs en détail pour le debug (display_errors = Off, log_errors = On) et afficher un message simple et rassurant à l'utilisateur."
        },
        {
            explanation: "PDO::ATTR_ERRMODE avec PDO::ERRMODE_EXCEPTION permet de transformer toutes les erreurs PDO en exceptions, facilitant leur gestion avec try-catch."
        },
        {
            explanation: "Les exceptions personnalisées permettent de gérer différemment chaque type d'erreur (ValidationException, DatabaseException, etc.) avec des traitements spécifiques."
        }
    ],
    2: [
        {
            explanation: "Les requêtes préparées (prepared statements) séparent complètement le code SQL des données, rendant impossible l'injection SQL même avec des données malveillantes."
        },
        {
            explanation: "XSS signifie Cross-Site Scripting - l'injection de code JavaScript malveillant dans une page web pour l'exécuter chez les visiteurs."
        },
        {
            explanation: "Les tokens CSRF uniques et vérifiés côté serveur empêchent qu'un site malveillant force des actions non autorisées au nom de l'utilisateur connecté."
        },
        {
            explanation: "La validation côté client (JavaScript) peut être facilement contournée. Il faut TOUJOURS valider côté serveur car c'est le seul endroit sûr et contrôlé."
        },
        {
            explanation: "htmlspecialchars() convertit les caractères spéciaux HTML (&lt;, &gt;, &amp;, etc.) en entités HTML, empêchant l'exécution de code JavaScript malveillant."
        }
    ],
    3: [
        {
            explanation: "password_hash() utilise des algorithmes modernes comme bcrypt avec salt automatique, contrairement aux anciennes fonctions comme md5() ou sha1() qui sont vulnérables."
        },
        {
            explanation: "session_regenerate_id() après connexion empêche les attaques de fixation de session où un pirate impose un ID de session à la victime."
        },
        {
            explanation: "X-Frame-Options: DENY empêche l'affichage de votre page dans une iframe, protégeant contre les attaques de clickjacking."
        },
        {
            explanation: "En production, display_errors doit être à Off pour ne jamais révéler d'informations techniques aux utilisateurs. Utilisez log_errors = On pour conserver les détails en interne."
        },
        {
            explanation: "La défense en profondeur signifie multiplier les couches de sécurité (application, serveur, réseau) pour qu'une faille dans une couche ne compromette pas tout le système."
        }
    ]
};

let quizScores = {};

// Fonction pour mélanger un tableau (Fisher-Yates shuffle)
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Fonction pour randomiser les positions des réponses dans tous les quiz
function randomizeQuizAnswers() {
    document.querySelectorAll('[id^="quiz"]').forEach(quizElement => {
        const quizId = quizElement.id.replace('quiz', '');

        quizElement.querySelectorAll('.quiz-question').forEach((questionElement, questionIndex) => {
            const optionsContainer = questionElement.querySelector('.quiz-options');
            if (!optionsContainer) return;

            const buttons = Array.from(optionsContainer.querySelectorAll('.quiz-option'));
            if (buttons.length === 0) return;

            const buttonData = buttons.map(button => {
                const isCorrect = button.getAttribute('data-correct') === 'true';
                const text = button.textContent.trim();

                // Extraire la lettre et le contenu
                let letter = '';
                let content = text;
                if (text.match(/^[A-C]\)/)) {
                    letter = text.substring(0, 2);
                    content = text.substring(3);
                }

                return {
                    isCorrect: isCorrect,
                    content: content,
                    originalLetter: letter
                };
            });

            // Mélanger les données
            const shuffledData = shuffleArray(buttonData);

            // Remettre les boutons dans l'ordre mélangé avec nouvelles lettres
            const letters = ['A)', 'B)', 'C)'];
            optionsContainer.innerHTML = '';

            shuffledData.forEach((data, index) => {
                const newButton = document.createElement('button');
                newButton.className = 'quiz-option';
                newButton.setAttribute('data-correct', data.isCorrect);

                // Si c'était un vrai/faux, pas de lettre
                if (data.originalLetter) {
                    newButton.textContent = `${letters[index]} ${data.content}`;
                } else {
                    newButton.textContent = data.content;
                }

                newButton.onclick = function() {
                    selectAnswer(parseInt(quizId), questionIndex + 1, data.isCorrect, this);
                };
                optionsContainer.appendChild(newButton);
            });
        });
    });
}

function toggleIntro(introId) {
    const content = document.getElementById(`intro${introId}`);
    const arrow = content.previousElementSibling.querySelector('.intro-arrow');

    if (content.classList.contains('open')) {
        content.classList.remove('open');
        arrow.classList.remove('open');
    } else {
        content.classList.add('open');
        arrow.classList.add('open');
    }
}

function toggleQuiz(quizId) {
    const content = document.getElementById(`quiz${quizId}`);
    const arrow = content.previousElementSibling.querySelector('.quiz-arrow');

    if (content.classList.contains('open')) {
        content.classList.remove('open');
        arrow.classList.remove('open');
    } else {
        content.classList.add('open');
        arrow.classList.add('open');
    }
}

function selectAnswer(quizId, questionId, isCorrect, buttonElement) {
    const question = buttonElement.closest('.quiz-question');
    const options = question.querySelectorAll('.quiz-option');
    const feedback = question.querySelector('.quiz-feedback');
    const feedbackText = feedback.querySelector('.feedback-text');

    // Désactiver tous les boutons
    options.forEach(option => {
        option.style.pointerEvents = 'none';
        const optionIsCorrect = option.getAttribute('data-correct') === 'true';
        if (optionIsCorrect) {
            option.classList.add('correct');
        } else if (option === buttonElement && !isCorrect) {
            option.classList.add('incorrect');
        }
    });

    // Afficher le feedback
    const data = quizData[quizId][questionId - 1];
    feedbackText.innerHTML = `<strong>${isCorrect ? '✅ Correct !' : '❌ Incorrect.'}</strong><br>${data.explanation}`;
    feedback.classList.add('show');
    feedback.classList.add(isCorrect ? 'feedback-correct' : 'feedback-incorrect');

    // Comptabiliser le score
    if (!quizScores[quizId]) {
        quizScores[quizId] = { correct: 0, total: 0 };
    }

    if (isCorrect) {
        quizScores[quizId].correct++;
    }
    quizScores[quizId].total++;

    // Afficher le score si toutes les questions sont répondues
    if (quizScores[quizId].total === 5) {
        setTimeout(() => showQuizScore(quizId), 1000);
    }
}

function showQuizScore(quizId) {
    const score = quizScores[quizId];
    const scoreElement = document.querySelector(`#quiz${quizId} .quiz-score`);
    const scoreText = scoreElement.querySelector('.score-text');
    const percentage = Math.round((score.correct / score.total) * 100);

    let message = '';
    let emoji = '';

    if (percentage >= 80) {
        emoji = '🛡️';
        message = 'Excellent ! Vous maîtrisez parfaitement les concepts de sécurité PHP. Vos applications seront bien protégées !';
    } else if (percentage >= 60) {
        emoji = '🔒';
        message = 'Bon travail ! Relisez les sections où vous avez eu des difficultés pour renforcer vos défenses.';
    } else {
        emoji = '⚠️';
        message = 'Attention ! Il faut absolument revoir ce chapitre. La sécurité ne souffre aucune approximation !';
    }

    scoreText.innerHTML = `${emoji} Score : ${score.correct}/${score.total} (${percentage}%)<br><br>${message}`;
    scoreElement.classList.add('show');
}

function toggleCheckbox(item) {
    const checkbox = item.querySelector('.checkbox');
    checkbox.classList.toggle('checked');

    if (checkbox.classList.contains('checked')) {
        item.style.transform = 'translateX(10px)';
        setTimeout(() => {
            item.style.transform = 'translateX(0)';
        }, 200);
    }
}

function smoothScroll() {
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const navHeight = document.querySelector('.nav-fixed').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

function updateActiveNav() {
    const sections = document.querySelectorAll('.section, #intro');
    const navLinks = document.querySelectorAll('.nav-links a');
    const navHeight = document.querySelector('.nav-fixed').offsetHeight;

    function highlightNavigation() {
        let current = '';
        const scrollPosition = window.pageYOffset + navHeight + 50;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                current = section.getAttribute('id');
            }
        });

        if (window.pageYOffset < 100) {
            current = 'intro';
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = requestAnimationFrame(highlightNavigation);
    });

    highlightNavigation();
}

// Fonction pour afficher un message d'encouragement personnalisé
function showMotivationalMessage() {
    const messages = [
        "🔐 La sécurité, c'est comme le sport : il faut s'entraîner régulièrement !",
        "🛡️ Un développeur sécurisé en vaut deux !",
        "⚡ Chaque vulnérabilité corrigée vous rend plus fort !",
        "🎯 Vous êtes maintenant un gardien du web sécurisé !",
        "🔒 La sécurité n'est pas une option, c'est une responsabilité !"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // Afficher le message après 3 secondes de navigation
    setTimeout(() => {
        console.log(randomMessage);
        
        // Créer une notification discrète
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 999;
            font-size: 0.9em;
            max-width: 300px;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        notification.innerHTML = randomMessage;
        
        document.body.appendChild(notification);
        
        // Animation d'entrée
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Suppression automatique après 4 secondes
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
        
    }, 3000);
}

// Fonction pour compter les éléments cochés dans la checklist
function updateChecklistProgress() {
    const checkboxes = document.querySelectorAll('.checkbox');
    const checkedBoxes = document.querySelectorAll('.checkbox.checked');
    
    if (checkboxes.length > 0) {
        const progress = Math.round((checkedBoxes.length / checkboxes.length) * 100);
        
        // Afficher le progrès dans la console pour debugging
        console.log(`📋 Progression checklist : ${checkedBoxes.length}/${checkboxes.length} (${progress}%)`);
        
        // Message d'encouragement selon le progrès
        if (progress === 100) {
            setTimeout(() => {
                const completionMessage = document.createElement('div');
                completionMessage.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: linear-gradient(135deg, #10b981, #059669);
                    color: white;
                    padding: 30px;
                    border-radius: 12px;
                    box-shadow: 0 8px 25px rgba(0,0,0,0.3);
                    z-index: 1000;
                    text-align: center;
                    font-size: 1.1em;
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.8);
                    transition: all 0.3s ease;
                `;
                completionMessage.innerHTML = `
                    <h3 style="margin: 0 0 15px 0;">🎉 Checklist complétée !</h3>
                    <p style="margin: 0;">Vous êtes maintenant prêt à développer des applications PHP sécurisées !</p>
                `;
                
                document.body.appendChild(completionMessage);
                
                setTimeout(() => {
                    completionMessage.style.opacity = '1';
                    completionMessage.style.transform = 'translate(-50%, -50%) scale(1)';
                }, 100);
                
                setTimeout(() => {
                    completionMessage.style.opacity = '0';
                    completionMessage.style.transform = 'translate(-50%, -50%) scale(0.8)';
                    setTimeout(() => {
                        if (completionMessage.parentNode) {
                            completionMessage.parentNode.removeChild(completionMessage);
                        }
                    }, 300);
                }, 3000);
            }, 500);
        }
    }
}

// ═══════════════════════════════════════════════════════════
// GESTION DES TABS (ONGLETS)
// ═══════════════════════════════════════════════════════════
function switchTab(tabsContainerId, tabIndex) {
    const container = document.getElementById(tabsContainerId);
    if (!container) return;

    // Désactiver tous les onglets et contenus
    const tabs = container.querySelectorAll('.code-tab');
    const contents = container.querySelectorAll('.code-tab-content');

    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));

    // Activer l'onglet et le contenu sélectionnés
    tabs[tabIndex].classList.add('active');
    contents[tabIndex].classList.add('active');
}

// ═══════════════════════════════════════════════════════════
// GESTION DES ACCORDÉONS
// ═══════════════════════════════════════════════════════════
function toggleAccordion(accordionId) {
    const header = document.querySelector(`[data-accordion="${accordionId}"]`);
    const content = document.getElementById(accordionId);

    if (!header || !content) return;

    const isActive = content.classList.contains('active');

    // Toggle l'état actif
    header.classList.toggle('active');
    content.classList.toggle('active');
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Randomiser les réponses des quiz
    randomizeQuizAnswers();

    // Activer le smooth scroll
    smoothScroll();

    // Activer la navigation active
    updateActiveNav();

    // Afficher un message motivationnel
    showMotivationalMessage();

    // Ajouter un listener pour la checklist
    document.addEventListener('click', function(e) {
        if (e.target.closest('.checklist-item')) {
            // Petite pause pour laisser l'animation se faire
            setTimeout(updateChecklistProgress, 300);
        }
    });

    // Message de confirmation avec style sécurité
    setTimeout(() => {
        console.log('🔐 Cours Sécurité PHP chargé avec succès !');
        console.log('🎲 Les réponses des quiz ont été randomisées.');
        console.log('🛡️ Système de sécurité interactif activé.');
        console.log('⚡ Prêt pour l\'apprentissage de la sécurité PHP !');
    }, 1000);

    // Ajout d'easter eggs pour l'engagement
    let securityTipCount = 0;
    const securityTips = [
        "💡 Astuce : Utilisez toujours HTTPS, même en développement local avec un certificat auto-signé !",
        "🔍 Conseil : Auditez régulièrement vos dépendances avec 'composer audit' !",
        "🛡️ Rappel : La sécurité par l'obscurité n'est pas de la sécurité !",
        "⚡ Tip : Configurez des CSP headers pour bloquer les injections XSS !",
        "🔐 Note : Un mot de passe fort vaut mieux que 10 protections faibles !"
    ];

    // Afficher une astuce sécurité toutes les 30 secondes
    setInterval(() => {
        if (securityTipCount < securityTips.length) {
            console.log(securityTips[securityTipCount]);
            securityTipCount++;
        }
    }, 30000);

    // Détecter la section active pour des conseils contextuels
    let lastActiveSection = '';
    const sectionTips = {
        'erreurs': 'Conseil section erreurs : Loggez tout, affichez peu !',
        'vulnerabilites': 'Conseil section vulnérabilités : Pensez comme un attaquant pour mieux vous défendre !',
        'validation': 'Conseil section validation : Validation côté client = UX, validation côté serveur = sécurité !',
        'authentification': 'Conseil section auth : 2FA > mot de passe complexe > mot de passe simple !',
        'bonnes-pratiques': 'Conseil section pratiques : La sécurité est un marathon, pas un sprint !'
    };

    window.addEventListener('scroll', () => {
        const currentSection = document.querySelector('.nav-links a.active')?.getAttribute('href')?.substring(1);
        if (currentSection && currentSection !== lastActiveSection && sectionTips[currentSection]) {
            console.log('📍 ' + sectionTips[currentSection]);
            lastActiveSection = currentSection;
        }
    });
});

// Fonction utilitaire pour debug (peut être supprimée en production)
function debugQuizData() {
    console.log('🔍 Debug des données de quiz :');
    Object.keys(quizData).forEach(quizId => {
        console.log(`Quiz ${quizId} : ${quizData[quizId].length} questions`);
        quizData[quizId].forEach((data, index) => {
            console.log(`  Q${index + 1}: ${data.explanation.substring(0, 50)}...`);
        });
    });
}

// Fonction pour exporter les résultats des quiz (fonctionnalité bonus)
function exportQuizResults() {
    if (Object.keys(quizScores).length === 0) {
        console.log('❌ Aucun quiz complété à exporter');
        return;
    }

    const results = {
        date: new Date().toISOString(),
        course: 'Sécurité et Gestion d\'Erreurs en PHP',
        scores: quizScores,
        totalQuestions: Object.values(quizScores).reduce((sum, quiz) => sum + quiz.total, 0),
        totalCorrect: Object.values(quizScores).reduce((sum, quiz) => sum + quiz.correct, 0)
    };

    results.globalPercentage = Math.round((results.totalCorrect / results.totalQuestions) * 100);

    console.log('📊 Résultats des quiz :', results);
    
    // Création d'un blob pour téléchargement (optionnel)
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    return results;
}

// Rendre certaines fonctions accessibles globalement pour les tests
window.debugQuizData = debugQuizData;
window.exportQuizResults = exportQuizResults;
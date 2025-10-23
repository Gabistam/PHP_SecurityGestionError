# 🎨 Intégration Tabs & Accordéons - Documentation

## 📋 Résumé des modifications

L'application a été transformée pour utiliser un système de **tabs (onglets)** et **accordéons** afin d'améliorer la lisibilité et l'expérience utilisateur.

## ✨ Nouveautés apportées

### 1. **Système de Tabs pour les 4 exemples de code**
Au lieu d'afficher 4 cartes côte à côte (trop étroit), les exemples de code similaires sont maintenant regroupés dans un système d'onglets :

**Sections transformées :**
- ✅ **Gestion des erreurs** : Try-Catch | Exceptions | Logging | PDO

**Avantages :**
- Navigation fluide entre les exemples
- Affichage pleine largeur pour le code
- Moins de scroll vertical
- Meilleure concentration sur un exemple à la fois

### 2. **Accordéons pour les comparaisons code**
Les sections montrant du code vulnérable VS sécurisé utilisent maintenant des accordéons :

**Sections transformées :**
- ✅ **Injection SQL** : Code vulnérable ↔ Code sécurisé
- ✅ **XSS** : Code vulnérable ↔ Code sécurisé

**Avantages :**
- Comparaison directe facilitée
- Possibilité d'ouvrir les deux en même temps
- Fond sombre unifié
- Meilleure mise en contexte

### 3. **Fond sombre pour le code**
- **Conteneurs avec fond #2d2d2d** (gris foncé) autour de tout le code
- **Headers avec fond #1a1a1a** (plus foncé) pour les onglets et accordéons
- **Meilleur contraste** pour la coloration syntaxique

### 4. **Nouvelle coloration syntaxique PHP**
- **Thème changé** : `prism-okaidia.min.css` au lieu de `prism-tomorrow.min.css`
- **Coloration améliorée** : variables, fonctions, mots-clés PHP mieux différenciés
- **Meilleure lisibilité** sur fond sombre

## 🎨 Structure HTML des Tabs

```html
<!-- SYSTÈME DE TABS -->
<div class="code-tabs-container" id="errorTabs">
    <!-- En-têtes des onglets -->
    <div class="code-tabs">
        <button class="code-tab active" onclick="switchTab('errorTabs', 0)">
            ⚡ Try-Catch Basique
        </button>
        <button class="code-tab" onclick="switchTab('errorTabs', 1)">
            🔒 Exceptions Personnalisées
        </button>
        <!-- ... autres onglets -->
    </div>

    <!-- Contenu Tab 1 -->
    <div class="code-tab-content active">
        <h4>⚡ Try-Catch Basique</h4>
        <p>Description...</p>
        <pre class="line-numbers"><code class="language-php">
        // Code PHP ici
        </code></pre>
    </div>

    <!-- Contenu Tab 2 -->
    <div class="code-tab-content">
        <!-- ... -->
    </div>
</div>
```

## 🎨 Structure HTML des Accordéons

```html
<!-- ACCORDÉON CODE VULNÉRABLE VS SÉCURISÉ -->
<div class="code-accordion">
    <!-- Item 1 : Code Vulnérable -->
    <div class="code-accordion-item">
        <div class="code-accordion-header"
             data-accordion="sqlVulnerable"
             onclick="toggleAccordion('sqlVulnerable')">
            <h4>❌ Code Vulnérable - Description</h4>
            <span class="code-accordion-arrow">▼</span>
        </div>
        <div id="sqlVulnerable" class="code-accordion-content">
            <div class="code-accordion-body">
                <p>Description...</p>
                <pre class="line-numbers"><code class="language-php">
                // Code vulnérable
                </code></pre>
            </div>
        </div>
    </div>

    <!-- Item 2 : Code Sécurisé -->
    <div class="code-accordion-item">
        <div class="code-accordion-header active"
             data-accordion="sqlSecure"
             onclick="toggleAccordion('sqlSecure')">
            <h4>✅ Code Sécurisé - Description</h4>
            <span class="code-accordion-arrow">▼</span>
        </div>
        <div id="sqlSecure" class="code-accordion-content active">
            <div class="code-accordion-body">
                <p>Description...</p>
                <pre class="line-numbers"><code class="language-php">
                // Code sécurisé
                </code></pre>
            </div>
        </div>
    </div>
</div>
```

## 🎯 Classes CSS principales

### Tabs (Onglets)
```css
.code-tabs-container    /* Conteneur principal avec fond sombre */
.code-tabs              /* Barre des onglets */
.code-tab               /* Un onglet individuel */
.code-tab.active        /* Onglet actif (avec bordure bleue) */
.code-tab-content       /* Contenu d'un onglet (caché par défaut) */
.code-tab-content.active /* Contenu visible */
```

### Accordéons
```css
.code-accordion         /* Conteneur principal avec fond sombre */
.code-accordion-item    /* Un item d'accordéon */
.code-accordion-header  /* Header cliquable */
.code-accordion-arrow   /* Flèche qui tourne */
.code-accordion-content /* Contenu (caché par défaut) */
.code-accordion-body    /* Corps du contenu */
```

## ⚙️ Fonctions JavaScript

### switchTab(containerId, tabIndex)
Gère le changement d'onglet :
```javascript
function switchTab(tabsContainerId, tabIndex) {
    const container = document.getElementById(tabsContainerId);

    // Désactiver tous les onglets et contenus
    const tabs = container.querySelectorAll('.code-tab');
    const contents = container.querySelectorAll('.code-tab-content');

    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));

    // Activer l'onglet et le contenu sélectionnés
    tabs[tabIndex].classList.add('active');
    contents[tabIndex].classList.add('active');
}
```

### toggleAccordion(accordionId)
Gère l'ouverture/fermeture d'un accordéon :
```javascript
function toggleAccordion(accordionId) {
    const header = document.querySelector(`[data-accordion="${accordionId}"]`);
    const content = document.getElementById(accordionId);

    // Toggle l'état actif
    header.classList.toggle('active');
    content.classList.toggle('active');
}
```

## 🎨 Palette de couleurs

```css
--bg-dark: #2d2d2d;           /* Fond principal sombre */
--bg-darker: #1a1a1a;         /* Fond header (plus foncé) */
--bg-hover: #3d3d3d;          /* Hover sur onglets */
--border: #404040;            /* Bordures */
--text-main: #fff;            /* Texte principal */
--text-secondary: #ccc;       /* Texte secondaire */
--text-muted: #999;           /* Texte désactivé */
--accent: #667eea;            /* Couleur d'accent (bleu violet) */
--success: #51cf66;           /* Vert (code sécurisé) */
--danger: #ff6b6b;            /* Rouge (code vulnérable) */
```

## 📱 Responsive Design

### Desktop (> 768px)
- Tabs affichés horizontalement
- Largeur pleine pour le code
- Onglets avec border-bottom pour indiquer l'actif

### Mobile (< 768px)
- Tabs en colonne verticale
- Onglets pleine largeur
- Border-left pour indiquer l'actif
- Police et padding réduits

## 🔄 Migration d'autres sections

Pour transformer d'autres sections en tabs :

1. **Copier la structure HTML** du système de tabs
2. **Changer l'ID unique** (ex: `id="validationTabs"`)
3. **Adapter les onclick** : `switchTab('validationTabs', X)`
4. **Remplir les contenus** avec vos exemples de code

Pour transformer en accordéon :

1. **Copier la structure HTML** de l'accordéon
2. **Changer les IDs uniques** pour chaque item
3. **Adapter les data-accordion** et onclick
4. **Remplir avec vos comparaisons**

## 🎓 Avantages pédagogiques

### Pour les étudiants
1. **Moins de distraction** : focus sur un exemple à la fois
2. **Comparaison facilitée** : accordéons ouverts côte à côte
3. **Code plus large** : meilleure lisibilité
4. **Navigation intuitive** : tabs clairs avec emojis

### Pour les formateurs
1. **Structure claire** : organisation logique
2. **Facilité d'extension** : ajouter des onglets facilement
3. **Maintenance simple** : CSS et JS centralisés
4. **Aspect professionnel** : interface moderne

## 📊 Performance

- **Léger** : Pas de bibliothèque externe (vanilla JS)
- **Rapide** : Transitions CSS natives
- **Compatible** : Tous navigateurs modernes
- **Accessible** : Fonctionne sans JS (contenu visible)

## 🔧 Personnalisation

### Changer les couleurs
Modifier les couleurs dans `styles.css` :
```css
.code-tabs-container {
    background: VOTRE_COULEUR;
}

.code-tab.active {
    border-bottom: 3px solid VOTRE_COULEUR_ACCENT;
}
```

### Ajouter des animations
```css
.code-tab-content {
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}
```

## 📝 Notes importantes

1. **IDs uniques** : Chaque système de tabs doit avoir un ID unique
2. **Active par défaut** : Le premier onglet et le code sécurisé sont actifs au chargement
3. **Prism.js** : La coloration syntaxique fonctionne automatiquement sur les blocs `<code class="language-php">`
4. **Numéros de ligne** : Ajoutez `class="line-numbers"` sur `<pre>` pour les numéros

## 🚀 Prochaines améliorations possibles

- [ ] Transitions animées entre onglets
- [ ] Système de recherche dans le code
- [ ] Bouton "Copier le code"
- [ ] Sauvegarde de l'onglet actif dans localStorage
- [ ] Mode plein écran pour le code
- [ ] Export PDF avec code formaté

---

**Date de mise à jour** : 2025-10-23
**Version** : 2.0 (Tabs & Accordéons)
**Thème Prism.js** : Okaidia (coloration PHP améliorée)

🎓 **Interface optimisée pour l'apprentissage de la sécurité PHP !**

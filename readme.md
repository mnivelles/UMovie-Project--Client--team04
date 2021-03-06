<p align="center">
  <img height="300" width="300" style="max-width:100%;" src="logo-umi-project-github.png" alt="Logo de UMI - ULaval Movie Ima" />
</p>

# UMI - ULaval Movie Ima (v0.1.0α) par 300 Umi

>N.B. : Si certaines commandes ne semblent pas fonctionner ou que la documentation ne semble pas à jour, consulter la version du readme.md de la branche `develop`.

## Requis

1. Pour ceux sous Windows ne voyant jamais de couleurs, il est très fortement conseillé d'installé [Enable ANSI colors in Windows command prompt](https://www.liferay.com/fr/web/igor.spasic/blog/-/blogs/enable-ansi-colors-in-windows-command-prompt) ou un équivalent. Dans le cas contraire, vous ne pourrez pas bien lire les messages notamment pour les tests.
1. [**npm/Node.js**](http://nodejs.org) doit être installé.
1. [**Git**](http://git-scm.com/downloads) doit être installé. L'installation sous Windows d'un logiciel gérant Git comme Tortoise n'installe pas forcément ce dernier dans la ligne de commande.
1. Lancer les commandes suivantes afin d'installer **Bower** et **Gulp** de manière générale sur votre machine. Un `sudo` peut être nécessaire sur OS X/Unix.

> N.B. : Sous OS X et Linux pour des raisons de sécurité, il est préférable de suivre le conseil de StudioRGB : [Fix privileges and never again use `sudo` with **npm**](http://studiorgb.uk/fix-priviliges-and-never-again-use-sudo-with-npm/)

```bat
npm install gulp  -g
```
```bat
npm install bower -g
```

(Optionnel) Pour ceux ayant déjà **npm**, **Gulp** ou **Bower**, il est recommander d'effectuer les commandes suivantes.


```bat
npm update -g npm
```
```bat
npm update -g gulp
```
```bat
npm update -g bower
```

```bat
npm cache clean
```
```bat
bower cache clean
```

### Clés d'API
Il faut ajouter votre clef d'API pour TMDB et Tastekid dans le fichier `app/src/helper/common.js` et pour YouTube dans `app/src/helper/youtubeSearch.js`.
Aussi, dans la section « Mise à jour des Emoji-reactions et des revues », il est indiqué comment mettre à jour le JSON Blob.

## Installation

Clonner le dépôt Git suivant en effectuant la commande suivante. Un nom optionnel peut être optionnellement ajouté à la fin.

```bat
git clone https://github.com/GLO3102/team04.git umi-project
```

Aller dans le dossier du projet

```bat
cd umi-project
```

Changer et suivre la branche `develop`

```bat
git checkout -b develop remotes/origin/develop
```

Effectuer les commandes suivantes afin d'installer toutes les extensions nécessaires.

```bat
npm install
```

(Optionnel) La commande suivante est sensée s'effectuer avec la précédente.

```bat
bower install
```

##Utilisation

Effectuer la commande suivante si vous voulez «builder» le projet. Optionnellement, `--production` peut être ajouté afin que les fichiers soient minifiés pour la production.

```bat
gulp build
```

La commande suivante permet de «builder» le projet tout en le mettant à jour pendant vos modifications.

```bat
gulp watch
```

Dans le navigateur. il faut aller à : `http://localhost:8042/`.

> Important : Quand vous voulez travailler, effectuer un `npm install` juste après le **pull** sur Git. Ainsi, les dépendances seront à jour.

### Projet en mode ne rien oublier (pour les développeurs)

La commande suivante permet d'installer toutes les dépendances et de lancer `gulp watch`.

```bat
npm start
```

### Enregistrement, authentification et profile utilisateur
* En arrivant sur notre application, vous serez redirigés vers la page de login. Si vous avez déjà créé un compte utilisateur, vous pouvez entrez vos informations pour vous connecter. Sinon vous pouvez cliquer sur le bouton `sign up` pour vous créer un compte utilisateur.
* Une fois connecté, vous aurez accès à toutes les pages de l’application.
* Si vous cliquez sur l’icône d’hippocampe dans la barre de menu, vous pourrez voir votre profile ou vous déconnecter de votre compte (vous serez alors redirigés vers la page de login).

### Page d’une série télévisée
* Sur la page d’accueil, vous pouvez cliquer sur un des posters dans la section «Top Tv Show» pour afficher la page d’une série télévisée.
* Une fois sur la page, vous pouvez cliquer sur le titre d’un épisode dans le bas de la page pour ouvrir la fenêtre modale associée à cet épisode.
* Vous pouvez aussi faire une recherche parmi les épisodes de la série en utilisant le champ Search au centre de la page.

### Recherche
* Dans la barre de menu, vous pouvez faire une recherche en écrivant une requête dans le champ Search.
* En cliquant sur la loupe, vous pourrez choisir de faire une recherche par film, acteur, utilisateur ou série télévisée.
* En appuyant sur la touche `Entrée`, vous serez redirigés vers la page des résultat.

### Page d’un utilisateur
* Vous pouvez voir la page d’un utilisateur en faisant une recherche et en cliquant sur l’un des résultats.
* La page affichera toutes les informations demandées. Si vous ne suivez pas l’utilisateur afficher, un bouton au centre de la page vous permettra de le suivre. Sinon, si vous le suivez déjà, un bouton vous permettant d’arrêter de le suivre sera affiché.
* La section Following, affiche le nom des utilisateurs suivis par l’utilisateur courant. Vous pouvez cliquer sur ceux-ci pour voir la page associé à cet utilisateur.

## Fonctionnalités avancées

### Première fonctionnalité avancée : Obtenir des suggestions d’acteurs similaires à un acteurs ou de films similaires à un film
Pour voir cette fonctionnalité en action, vous devez vous rendre sur la page d’un film et naviguer jusqu’à la section intitulée “Movies suggestion”. Vous trouverez alors, lorsque disponible, une sélection de films similaires au film courant. En ce qui concerne les suggestions d’acteurs similaires à un acteur, vous devez vous rendre sur la page d’un acteur et naviguer jusqu’à la section intitulée “Actors suggestion”. Vous trouverez alors, lorsque disponible, une sélection d’acteurs similaires à l’acteur courant.

### Seconde fonctionnalité avancée : emoji-réactions et revues
Cette fonctionnalité permet à l’utilisateur d’exprimer son opinion au sujet d’un film (movie), d’une saison de série télévisée (tv show) ou d’une liste de lecture (watchlist). Elle consiste en deux éléments :  des emoji-réactions et des revues.

#### Emoji-réactions
Sur les pages des films, des saisons de série tv et des listes de lecture, sous l’entête et la barre d’actions (boutons) se trouve un bandeau contenant des emojis. Il est possible d’en choisir un. Il devient alors bleu. Sous les emojis est inscrit le pourcentage qu’a obtenu chacun d’entre eux grâce aux votes des utilisateurs de l’application.

#### Revues
Au bas des pages de films, de saisons de séries tv et de listes de lectures se trouvent les revues laissées par les utilisateurs. Les utilisateurs de l’application peuvent dire ce qu’ils pensent en un court ou long discours. Un bouton vert permet d’ajouter une revue. Il est ensuite possible de la modifier avec le bouton d’édition.

#### Commun aux deux
Il est possible à tout moment de modifier son choix ou de modifier sa revue. En revanche, il n’est possible de supprimer ni le choix d’emoji, ni sa revue. C’est un choix de conception volontaire.

#### Mise à jour des Emoji-reactions et des revues
Les Emoji-réactions et les revues des utilisateurs sont stockés sur JSON Blob. Elles restent disponibles 60 jours après la dernière consultation. Il peut donc être nécessaire de recréer le stockage de ces éléments. Pour ce faire, il faut suivre les étapes qui suivent. Ces étapes suivantes sont valables pour les films (movie). Il faut faire de même pour les séries télévisées (tvshow) et les listes de lectures (watchlist).

1. Aller sur [JSON Blob](https://jsonblob.com/)
2. Coller le JSON suivant :
```json
[
    {
        "id": "1234567890",
        "voters": [
            {
                "id": "nanashi@nan.umi",
                "reaction": "shoot"
            }
        ],
        "reviews": [
            {
                "id": "nanashi@nan.umi",
                "review": "C'est un futur bien vert et bleu. Pas sûr qu'il soit le bon."
            }
        ],
        "happy": 3,
        "cry": 4,
        "shoot": 7,
        "devil": 1,
        "cheers": 10,
        "cool": 2,
        "surprised": 9,
        "sad": 0,
        "funny": 1
    }
]
```
3. Cliquer sur `Save`.
4. Coller la fin de l'URL obtenue (Ex : `56a5316be4b01190df4b2a64`) dans `/app/src/helper/common.js` au niveau de `REACTIONS_EMOJI_MOVIE_URL` à la place de l'ancien identifiant (Ex : `565139c6e4b01190df40ef0a`).
5. Sauvegarder le fichier.
6. Redémarrer le site.

## Installation de bibliothèques externes pour le *Front-end*
Effectuer la commande suivante en remplaçant `nom-de-la-bibliotheque`
```bash
bower install --save nom-de-la-bibliotheque
```
Aller dans `/gulp-task/js.js` pour ajouter votre bibliothèque. Dans la variable `vendor`, ajoutez votre bibliothèque. À la fin de préférence. Le chemin pour le dossier Bower est disponible via `cte.basePaths.bower`.

Si il y a en plus du CSS à ajouter, aller dans `/gulp-task/css.js`. Ajouter la bibliothèque dans `vendor`. Le chemin pour le dossier Bower est disponible via `cte.basePaths.bower`. Bien entendu, profitez pour supprimer le fichier `nothing.css`.

N.B.: Si il n'y a pas de rechargement automatique. Il faut recommencer la commande `gulp watch` et signaler une *issue* sur Github avec le tag ```automatisation```.

## Astuces

Comme mentionner plus haut, il est souhaitable sous Windows d'ajouter un programme qui permet d'afficher les couleurs ANSI dans la ligne de commande. 

### Lancement de Gulp depuis Webstorm

1. Tools>Run Gulp/Grunt Task;
1. Puis Choisir **Gulp**;
1. Choisir la tâche à effectuer. Ex : `watch`.

Une console apparaît et montre le résultat sans sortir de Webstorm.

### Utilisation de Materialize

Pour éviter d'importer toute la bibliothèque Materialize au complet, les composants non utilisés ont été mis en commentaire dans app/asset/scss/_materialize.scss. Afin de rendre un composant disponible à l'utilisation, il faut s'assurer de le décommenter dans ce fichier avant.

###Images de remplacements
Pour ne pas ajouter des images au projet qui l'alourdiraient inutilement, il est possible d'utiliser les trois fournisseurs suivants :

* [placekitten.com](http://placekitten.com)
* [lorempixel.com](http://lorempixel.com)
* [placeimg.com](https://placeimg.com)

### Créations graphiques
Les créations graphiques sont à ranger dans le dossier `/creation`.
>N.B. : Éviter les noms avec accents ou caractères exotiques pour une bonne entente OS X, Linux et Windows.

Voici un site pour modifier les SVG : [http://editor.method.ac](http://editor.method.ac).

Il est préférable de mettre dans le dossier `creation` la version de travail plutôt que le résultat. Aussi, les formats de fichiers non standards sont déconseillés sauf si il s'agit de logiciels libres comme **Gimp**.

### Zencode
Essayer dans un fichier HTML : ```#page>div.logo+ul#navigation>li*5>a{Item }``` puis appuyer sur `Tab`
Voir [Emmet](http://docs.emmet.io/abbreviations/).

## Organisation des fichiers
Le dossier de travail est le dossier `app`. Il se présente comme suit :

```bash
app/
----- assets/
---------- image/      // Images and icons for your app
---------- scss/       // All styles and style related files (SCSS or LESS files)
---------- js/         // JavaScript files written for your app that are not for backbone
----- src
---------- app.js
---------- routes.js
---------- index.html
---------- shared/   // acts as reusable components or partials of our site
--------------- header/
-------------------- header.js
-------------------- header.html
--------------- primaryMenu/
-------------------- primaryMenu.js
-------------------- primaryMenu.html
--------------- footer/
-------------------- footer.js
-------------------- footer.html
---------- components/   // each component is treated as a mini Backbone app
--------------- home/
-------------------- home.page.view.js
-------------------- home.html
--------------- blog/
-------------------- blog.js
-------------------- blog.html
```

Source : [https://scotch.io/tutorials/angularjs-best-practices-directory-structure](https://scotch.io/tutorials/angularjs-best-practices-directory-structure)


## Attribution de contenus
* Logo baleine [Fish in circle shape](http://www.flaticon.com/free-icon/fish-in-circle-shape_32631) par [freepik](http://www.freepik.com) de [www.flaticon.com](www.flaticon.com)
* Avatar hippocampe [Sea horse](http://www.flaticon.com/free-icon/sea-horse_65881) par [freepik](http://www.freepik.com) de [www.flaticon.com](www.flaticon.com)
* Fontelico de [Crowdsourced, for Fontello project](http://fontello.com) en [SIL](http://scripts.sil.org/OFL)
* [Flux RSS de iTunes](https://rss.itunes.apple.com/us/?urlDesc=) pour le top des films et des saisons de séries télévisées
* [TheMovieDb](https://www.themoviedb.org/) pour les listes de films populaires


<p align="center">
  <img height="300" width="300" src="logo-umi-project-github.png" alt="Logo de UMI - ULaval Movie Ima" />
</p>

#UMI - ULaval Movie Ima (v0.0.0α) par 300 Umi

>N.B. : Si certaines commandes ne semblent pas fonctionner ou que la documentation ne semble pas à jour, consulter la version du readme.md de la branche `develop`.

##Requis

1. Pour ceux sous Windows ne voyant jamais de couleurs, il est très fortement conseillé d'installé [Enable ANSI colors in Windows command prompt](https://www.liferay.com/fr/web/igor.spasic/blog/-/blogs/enable-ansi-colors-in-windows-command-prompt) ou un équivalent. Dans le cas contraire, vous ne pourrez pas bien lire les messages notamment pour les tests.
1. [**npm/Node.js**](http://nodejs.org) doit être installé.
1. [**Git**](http://git-scm.com/downloads) doit être installé. L'installation sous Windows d'un logiciel gérant Git comme Tortoise n'installe pas forcément ce dernier dans la ligne de commande.
1. Lancer les commandes suivantes afin d'installer **Bower** et **Gulp** de manière générale sur votre machine. Un `sudo` peut être nécessaire sur OS X/Unix.

>N.B. : Sous OS X et Linux pour des raisons de sécurité, il est préférable de suivre le conseil de StudioRGB : [Fix privileges and never again use `sudo` with **npm**](http://studiorgb.uk/fix-priviliges-and-never-again-use-sudo-with-npm/)

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

##Installation

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

Le fichier à ouvrir dans le navigateur est : ``nom-du-projet/build/index.html```.

>Important : Quand vous voulez travailler, effectuer un `npm install` juste après le **pull** sur Git. Ainsi, les dépendances seront à jour.

###Projet en mode ne rien oublier (pour les développeurs)

La commande suivante permet d'installer toutes les dépendances et de lancer `gulp watch`.

```bat
npm start
```

##Installation de bibliothèques externes pour le *Front-end*
Effectuer la commande suivante en remplaçant `nom-de-la-bibliotheque`
```bash
bower install --save nom-de-la-bibliotheque
```
Aller dans `/gulp-task/js.js` pour ajouter votre bibliothèque. Dans la variable `vendor`, ajoutez votre bibliothèque. À la fin de préférence. Le chemin pour le dossier Bower est disponible via `cte.basePaths.bower`.

Si il y a en plus du CSS à ajouter, aller dans `/gulp-task/css.js`. Ajouter la bibliothèque dans `vendor`. Le chemin pour le dossier Bower est disponible via `cte.basePaths.bower`. Bien entendu, profitez pour supprimer le fichier `nothing.css`.

N.B.: Si il n'y a pas de rechargement automatique. Il faut recommencer la commande `gulp watch` et signaler une *issue* sur Github avec le tag ```automatisation```.

##Astuces

Comme mentionner plus haut, il est souhaitable sous Windows d'ajouter un programme qui permet d'afficher les couleurs ANSI dans la ligne de commande. 

###Lancement de Gulp depuis Webstorm

1. Tools>Run Gulp/Grunt Task;
1. Puis Choisir **Gulp**;
1. Choisir la tâche à effectuer. Ex : `watch`.

Une console apparaît et montre le résultat sans sortir de Webstorm.

###Utilisation de Materialize

Pour éviter d'importer toute la bibliothèque Materialize au complet, les composants non utilisés ont été mis en commentaire dans app/asset/scss/_materialize.scss. Afin de rendre un composant disponible à l'utilisation, il faut s'assurer de le décommenter dans ce fichier avant.

###Images de remplacements
Pour ne pas ajouter des images au projet qui l'alourdiraient inutilement, il est possible d'utiliser les trois fournisseurs suivants :

* [placekitten.com](http://placekitten.com)
* [lorempixel.com](http://lorempixel.com)
* [placeimg.com](https://placeimg.com)

###Créations graphiques
Les créations graphiques sont à ranger dans le dossier `/creation`.
>N.B. : Éviter les noms avec accents ou caractères exotiques pour une bonne entente OS X, Linux et Windows.

Voici un site pour modifier les SVG : [http://editor.method.ac](http://editor.method.ac).

Il est préférable de mettre dans le dossier `creation` la version de travail plutôt que le résultat. Aussi, les formats de fichiers non standards sont déconseillés sauf si il s'agit de logiciels libres comme **Gimp**.

###Zencode
Essayer dans un fichier HTML : ```#page>div.logo+ul#navigation>li*5>a{Item }``` puis appuyer sur `Tab`
Voir [Emmet](http://docs.emmet.io/abbreviations/).

##Organisation des fichiers
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
-------------------- home.view.js
-------------------- home.html
--------------- blog/
-------------------- blog.js
-------------------- blog.html
```

Source : [https://scotch.io/tutorials/angularjs-best-practices-directory-structure](https://scotch.io/tutorials/angularjs-best-practices-directory-structure)


##Futur
###Technologies possibles
* [Immutable par Facebook](http://facebook.github.io/immutable-js/) : Si vous voulez des éléments qui ne changent pas; y compris des `Object`(Cf. `Record`).

##Attribution de contenus
* Logo baleine [Fish in circle shape](http://www.flaticon.com/free-icon/fish-in-circle-shape_32631) par [freepik](http://www.freepik.com) de [www.flaticon.com](www.flaticon.com)  

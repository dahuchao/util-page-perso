# util-page-perso
Utilitaire pour travailler des pages personnalisée d'un SAAS.

Cet utilitaire traite de problèmes de chemin vers les images ou de problèmes d'encodage. Lorsqu'on doit retravailler
une page qui est hébergée dans un SAAS, il faut préallablement la télécharger sur sa station pour l'éditer.
Une page est constituée de code HTML, de code CSS et de lien vers d'autres ressources (typiquement des images).
Ces liens sont des chemins vers d'autres fichiers. Ils sont relatifs à la racine du site web. Lorsque la page est 
exécutée en local, ces liens sont brisés car la racine du chemin n'est plus valable. C'est pour résoudre 
ce problème que l'utilitaire entre en action : il va parcourir la page d'origine à la recherche de ces liens pour
les remettre en cohérence avec la racine des liens locaux.

Il facilite le travail du développeur en lui évitant de sortir de son éditeur pour raffraichir ses navigateurs.
Lorsqu'un développeur réalise des modifications sur les fichiers HTML ou CSS, il doit raffraichir ses 
navigateurs pour observer les effets de ses changements. Cela peut devenir fastidieux car les changements sont
très fréquents. D'autant fastidieux que le nombre de navigateur cible est important (IE, Chrome, Firefox ...).

## Installation

L'utilitaire s'appuie sur nodesjs qui doit par conséquent être préallablement installé.

Cloner le dépot git dans un répertoire d'une station de travail : 

    git clone https://github.com/dahuchao/util-page-perso.git

Installer l'utilitaire en lancant la commande suivante : 

    $ npm install

## Utilisation

Pour lancer l'utilitaire, il suffit d’exécuter la commande suivante dans une boite DOS à la racine des sources:

    $ gulp dev --page dossier-page

Dans cet exemple, la page (téléchargée depuis le SAAS) et ses ressources (typiquement les images) sont enregistrées
dans le répertoire /dossier-page.

Au lancement l'utilitaire ouvre une page dans le navigateur par défaut à l'adresse : http://localhost:3000. 
A cette étape, la page est blanche (rien ne s'affiche) dans le navigateur (pas de panic:). 
Mais, lorsque le développeur modifie un fichier html du répertoire (exemple : block-page.html), le navigateur 
est automatiquement rafraichit montrant le résultat du chargement de la page ainsi modifiée.

## Comment ca marche (pas de mistère)

Organisation des sources

    /
    |- package.json
    |- gulpfile.js
    |- index.html
    |- dossier-page/
    |  |- block-page.html
    |  |- img/
    |  |  |- image.png

L'utilitaire est un script gulp lancé par nodejs. Le script gulp est enregistré dans le fichier gulpfile.js.
Le développeur n'a normalement pas besoin de modifier ce fichier.

Chaque page personnalisée fait l'objet d'un dossier (dossier-page) dans lequel se trouve tous les block de la 
page ainsi que les images qui leurs sont associées.

Le développeur devra créer et mettre à jour ce répertoire pour chacune des pages qu'il voudra éditer avec
cet utilitaire.

Au lancement de cette commande

    $ gulp dev --page dossier-page

l'utilitaire enregistre une copie du fichier index.html dans le <dossier-page> de la page.

    /
    |- package.json
    |- gulpfile.js
    |- index.html
    |- dossier-page/
    |  |- block-page.html
    |  |- index.html  <<<<<<<<<<<<<<
    |  |- img/
    |  |  |- image.png

L'utilitaire surveille les fichiers et lorsque le développeur en modifie un, il le recopie sous le nom dev.html 
en ayant relocaliser les liens pour qu'ils fonctionnent en local.

    /
    |- package.json
    |- gulpfile.js
    |- index.html
    |- dossier-page/
    |  |- block-page.html
    |  |- index.html
    |  |- dev.html  <<<<<<<<<<<<<<
    |  |- img/
    |  |  |- image.png

Le fichier index.html est un document très simple qui ne fait qu'afficher le fichier dev.html dans une balise iframe :

    <html>

    <head>
        <title>Votre titre</title>
        <script type="text/javascript" src="../csod-jquery-1.7.2.min.js"></script>
    </head>

    <body>
        <div>
            <iframe src="./dev.html" width="100%" height="800px" scrolling="false" />
        </div>
    </body>

    </html>

Notons que toutes les pages ouvertes à l'adresse localhost:3000 sont rafraichies, dans tous les navigateurs. 
Le développeur peut ainsi voir, immédiatement après avoir enregistré son fichier, le rendu de sa page dans
tous ses navigateurs cibles (Firefox, Chrome et IE).
# util-page-perso
Utilitaire pour travailler des pages personnalisée d'un SAAS

Cet utilitaire traite des problèmes de chemin vers les images par exemple, traite du problème d'encodage et facilite 
le travail du développeur en lui évitant de sortir de son éditeur pour raffraichir son navigateur afin d'observer
les effets de ses changements.

## Installation

L'utilitaire s'appuie sur nodejs qui doit par conséquent être installé préallablement.
Ensuite l'installation est faite par cette commande : 

    $ npm install

## Utilisation

Pour lancer l'utilitaire, il suffit d’exécuter la commande suivante dans une boite DOS à la racine des sources:

    $ gulp dev --page dossier-page

Le programme ouvre une page dans le navigateur par défaut à l'adresse : http://localhost:3000. 
A cette étape, la page est blanche (rien ne s'affiche) dans le navigateur (pas de panic:). 
Mais, lorsque le développeur modifie un fichier html du répertoire (exemple : block-page.html), le navigateur est automatiquement rafraichit.

## Comment ca marche (pas de mistère)

L'utilitaire est un script gulp lancé par nodejs.

Organisation des sources

    /
    |- package.json
    |- gulpfile.js
    |- index.html
    |- dossier-page/
    |  |- block-page.html
    |  |- img/
    |  |  |- image.png

Chaque page personnalisée fait l'objet d'un dossier (dossier-page) dans lequel se trouve tous les block de la page ainsi que les images qui leurs sont associées.

L'utilitaire enregistre une copie du fichier index.html dans le dossier-page de la page.

    /
    |- package.json
    |- gulpfile.js
    |- index.html
    |- dossier-page/
    |  |- block-page.html
    |  |- index.html
    |  |- img/
    |  |  |- image.png

L'utilitaire surveille les fichiers et lorsque le développeur en modifie un, il le recopie sous le nom dev.html en ayant relocaliser les liens pour qu'ils fonctionnent en local.

    /
    |- package.json
    |- gulpfile.js
    |- index.html
    |- dossier-page/
    |  |- block-page.html
    |  |- index.html
    |  |- dev.html
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

Notons que toutes les pages ouvertes à l'adresse localhost:3000 sont rafraichies, dans tous les navigateurs. Vous pouvez ainsi voir le rendu de votre page dans Firefox, Chrome et IE immédiatement.

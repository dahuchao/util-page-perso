# util-page-perso
Utilitaire pour travailler des pages personnalisée d'un SAAS

Installation

L'utilitaire s'appuie sur nodesjs qui doit par conséquent être installé préallablement.
Lancer la commande suivante : npm install
Edit
Utilisation

Pour lancer l'utilitaire, il suffit d’exécuter la commande suivante dans une boite DOS à la racine des sources:

$ gulp dev --page <dossier-page>

Exemple d'ouverture de l'utilitaire pour la page details actualité

$ gulp dev --page details_actualites

Le programme ouvre une page dans le navigateur par défaut à l'adresse : http://localhost:3000. A cette étape, la page est blanche (rien ne s'affiche). Mais, lorsque le développeur modifie un fichier html du répertoire, le navigateur est automatiquement rafraichit.

Comment ca marche.

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
    <title>Réalisez votre potentiel: legroupelaposte</title>
    <script type="text/javascript" src="../csod-jquery-1.7.2.min.js"></script>
</head>

<body>
    <div>
        <iframe src="./dev.html" width="100%" height="800px" scrolling="false" />
    </div>
</body>

</html>

Notons que toutes les pages ouvertes à l'adresse localhost:3000 sont rafraichies, dans tous les navigateurs. Vous pouvez ainsi voir le rendu de votre page dans Firefox, Chrome et IE immédiatement.
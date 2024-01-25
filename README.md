# NFCdex

## Contexte

### Pouquoi le NFCdex ?

Le NFCdex est une démonstration technique de la possibilité de stockage du protocole NFC. Il a pour objectif, en reprenant le concept de la célèbre série de jeux-vidéos Pokémon®, de permettre la création et la collection de créatures virtuelles sur des cartes NFC.

### Les enjeux du NFCdex

L'objectif du NFCdex est d'appréhender les nouvelles technologies supportées par le web d'aujourd'hui. La technologie NFC étant encore très expérimentale, le NFCdex s'inscrit dans une démarche d'affranchissement d'un back-end, améliorer la sûreté des sites webs et économiser des ressources serveurs afin de s'inscrire dans une démarche économique et environnementale liée aux coûts de ceux-ci. Au travers de ce projet, nous avons étudié la possibilité de stocké des données et les sauvegarder ailleurs que dans un serveur.


## Compatibilité du NFCdex

Le NFCdex est pleinement utilisable sur une version a peu près récente de chrome android, il est également nécessaire d'utiliser une carte NFC avec un minimum de 8 Ko de stockage afin d'éviter les problèmes de corruption d'espace. Le NFCdex fonctionne également sur PC et iphone, mais vous ne pourrez pas bénéficer de toute les fonctionnalités essentielles du NFC.

## Utilisation du NFCdex

### Activation du NFC

Afin d'utiliser le NFCdex, il faut tout d'abord autoriser et activer la permission NFC pour le NFCdex. Si les autorisations sont en cours de validation par l'utilisateur, un bouton apparaît à cet effigie. Auquel cas un message de bienvenue se lance, ou un message d'avertissement. 

### Importer ou Exporter un NFCmon

Le scan d'un NFCmon déclenche automatiquement l'affichage de celui-ci sur le NFCdex. Afinde créer un NFCmon, il suffit de remplir le formulaire assoçié, appuyer sur le bouton 'envoyer' et de scanner une carte NFCmon vierge ou occupée.

### Un problème avec une carte NFCmon ?

Dans le cadre expérimental du projet NFCdex et afin de faciliter le débbugage, si votre carte NFCmon est corrompue, il est possible de la réinitialiser en appuyant sur les Mentions légales et en scannant la carte dans un temps imparti, vous serez avertis en conséquence.

### Une PWA, un mode hors ligne (WIP)

En appuyant sur l'un des boutons télécharger, vous bénéfécierez d'un mode hors-ligne (WIP) afin de pouvoir profiter du NFCdex sans connexion.

## Observations sur le NFCdex

En développant le NFCdex, voici les observations que nous avons pus emettre.

### Avantages

Le NFCdex ne nécessite pas d'infrastructures réseaux complexes ou de développement back-end. Cela permet de s'affranchir de coûts serveurs.

### Inconvénients

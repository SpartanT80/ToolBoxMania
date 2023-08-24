# ToolBoxMania
e-commerce website

L'application ToolBoxMania presente un site de vente en ligne d'outillage fictif.
Un utilisateur peut donc visiter le site, ajouter differents outils dans son panier et gerer celui ci.
Il peut aussi s'inscrire au site et ensuite gerer les differentes informations de son profil.

Un administrateur pourras gerer la base de donnee du site via une interface admin d'ou il pourras ajouter, modifier et supprimer les outils disponibles en magasin.


## Table des matières
1. [Infos Général](#general-info)
2. [Technologies](#technologies)
3. [Installation](#installation)
3. [Utilisation](#utilisation)

## Infos Général

Ce projet a été développé dans le cadre d'une formation en développement web fullstack Javascript et vise à valider les compétences acquises, ainsi qu'à obtenir le titre RNCP niveau 5.

Réalisé et développé par Florian Duyck.

Statut actuel : Version non déployée.

## Technologies
***
Coté client :
- [React](https://fr.legacy.reactjs.org/)
- [Redux](https://www.npmjs.com/package/redux)
- [Axios](https://www.npmjs.com/package/axios)
- [React-dom](https://www.npmjs.com/package/react-dom)
- [React-icon](https://www.npmjs.com/package/react-icons)
- [React-router-dom](https://www.npmjs.com/package/react-router-dom)

Coté server :
- [NodeJs](https://nodejs.org/en)
- [axios](https://www.npmjs.com/package/axios)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [cors](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://www.npmjs.com/package/express)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [mysql2](https://www.npmjs.com/package/mysql2)

## Installation
***
- Assurez-vous d'avoir installé Node.js version 12.x.x ou ultérieure.
- Lancez WampServer et assurez-vous d'avoir la base de données. Importez le fichier SQL dans votre base de données, si nécessaire.
- Voici les étapes à suivre :

1. Cloner le projet à l'emplacement que vous souhaitez :
```
$ git clone https://github.com/SpartanT80/ToolBoxMania.git
```
3. Rendez-vous dans le dossier ToolBoxMania :
```
$ cd ToolBoxMania
```
3. Rendez-vous dans le dossier client et installez les dépendances :
```
$ cd client
$ npm install
```
4. Retournez dans le dossier de base, puis rendez-vous dans le dossier server et installez les dépendances :
```
$ cd ..
$ cd server
$ npm install
```
5. Toujours dans le dossier server, créez un fichier `.env` et ajoutez le code suivant en le complétant :
```
LOCAL_PORT = " "
HOST = " "

DB_HOST = " "
DB_NAME = " "
DB_USER = " "
DB_PWD = 

TOKEN_SECRET = " "

API_WEATHER_KEY = " "
```
6. Afin de pouvoir lancer l'application, exécutez cette commande dans les dossiers server et client dans des terminaux séparés :
```
$ npm start
```

## Utilisation
***
Voici deux comptes déjà intégrer dans la base de données :
```
Email : admin@admin.com
Password : admin
```
```
Email : user@user.com
Password : user
```

# Web_Films
Rendu final de la semaine Web. Notre objectif est de faire un site internet utilisant la base de donnée TMDB

# Page d'acceuil du site

Sur la première page d'acceuil, nous avons choisi de partir sur deux fonctionnalités pour notre site web. 

## La liste de films

En cliquant sur le lien de cette page, nous pouvons voir une liste de 20 films. Chaque film est présenté avec son image, son titre, sa note sur 10 et son genre.

Sur la gauche, on trouve une liste déroulante pour sélectionner les genres qui nous intéressent. En cochant les genres et en cliquant sur le bouton "Valider", le tri se fait parmi les 20 films et seules les fiches correspondant aux genres sélectionnés sont gardées à l'affichage. Il est ensuite possible de cliquer sur le bouton "Reset" pour faire en sorte que les 20 films du départ s'affichent à nouveau.

On remarque aussi la fonctionnalité de recherche. En tapant un nom de film dans la barre de recherche et en appuyant sur le bouton/en pressant Entrée, on affiche les films correspondant entièrement ou partiellement à la valeur rentrée dans la barre de recherche.

Il est aussi possible de revenir aux 20 films de départ en cliquant sur "Reset".

## Cliquer sur les films

En cliquant sur l'image d'un film, il est possible d'en voir la fiche de description et de notamment trouver les acteurs. En cliquant ensuite sur les acteurs, il est possible de voir leur fiche avec les films dans lesquels ils ont joué.

# Le film aléatoire

Nous nous sommes dit qu'il serait intéressant pour quelqu'un qui ne sait pas quel film regarder de pouvoir trouver un film au hasard. C'est pour cela que nous avons créé une roulette de hasard qui nous donne la fiche d'un film avec tous les détails intéressants.

# Pour le lancement

Il faut tout d'abord exécuter la commande (même si cela est probablement déjà fait chez vous) :

npm install -g http-server

Il faut ensuite aller dans le dossier concerné puis exécuter la commande :

http-server

Ce qui donne 

Starting up http-server, serving ./
Available on:
   http://127.x.x.x:8080
   http://192.x.x.x:8080

Cela vous donnera un lien à suivre qui constituera votre serveur en local.

Il faut ensuite aller dans film_main/film_main.html
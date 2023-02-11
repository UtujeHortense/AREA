# **Dashboard Epitech**

## **Authors**

- utuje.hortense@epitech.eu
- ugo.oger@epitech.eu
- theo.rodrigues@epitech.eu
- loic.vassaux-artur@epitech.eu
- francois.le-carpentier@epitech.eu

## **Project overview**

The objective of this project is to create an WEB and MOBILE app to create some AREA.

The project is built with :

- Front-end mobile → React Native with Expo
- Front-end web → Angular
- Back-end → JS
- Database → MySql / Azure Microsoft

Users can sign up and login with their own Email and Password to have a completely configurable AREA, they can also login with Discord OAUTH.

## **Application**


All of our services are compiled with docker `docker-compose up --build` at the root of the repo.

All the informations about a user, is saved in a Database hosted on Azure Microsoft server.

## **Action**

We implemented some actions that trigger reactions
**All of our service's state are maintained for the next connection.**

- Weather : Every weather action is timed on a 1h delay
    - If the temperature in a city changes

    - If the wind speed in a city is higher than 50km/h

    - If the uv index in a city is higher than 5

    - If the percentage of humidity is higher than 70 for a city
    It is possible to configure thoses actions by changing the city name.

- Twitter :
    - If a user tweets
    It is possible to configure this widget by changing the tweet user check.

    - If someone mentions the connected user

## **Reaction**

We implemented some reactions that do something after an action is set in motion
**All of our service's state are maintained for the next connection.**

- Twitter :
    - Post a tweet
    It is possible to configure this reaction by changing the text to be posted.

- Discord :
    - Post a discord message on a channel
    It is possible to configure this reaction by changing the text message.

- Spotify :
    - Create a Spotify playlist
    It is possible to configure this reaction by changing the text for the playlist name.

- Github :
    - Create an issue
    It is possible to configure this reaction by changing the text for the issue Title and the issue description.


## **Bonus**

Database server online with Azure Microsoft
# NoYouChoose
Have you ever made plans to meet a friend for dinner but neither of you can decide where to eat? In my experience, the conversation usually goes like this:
- Me: I don't care where we eat, any preferences?
- Friend: I don't care, feel free to pick.
- Me: No, you can choose!

On top of this indecisiveness, both parties need to know where the other person is coming from. This usually leads to many back-and-forth texts of 'so, where do you work again?' and 'how far away are you from me?'.

**My mobile application NoYouChoose takes care of both issues by providing real-time geolocation sharing and allowing users to easily pick a food spot that is convenient for both.**

## How NoYouChoose Works
* User A and User B see each other's geolocation.
![picture](/assets/images/IMG_1494_2.png)<img src="/assets/images/IMG_1494_2.png" width="20" height="40">
* User A picks a 'food circle' - a circle on the map will appear with pins of all the restaurants in that region.
* User B scrolls through the food options in the 'food circle' that User A defined.
* User B picks a food spot in that 'food circle'.
* User A is notified of the restaurant chosen by User B.

## Getting Started
In order to run this app on your device, download [Expo Client](https://itunes.apple.com/us/app/expo-client/id982107779?mt=8).

### Install dependencies and start server
```npm install```
```expo start```

## Tech Used
* [React-Native](https://facebook.github.io/react-native/)
* [Expo.io](https://expo.io/)
* [Socket.io](https://socket.io/)
* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [Yelp Fusion API](https://www.yelp.com/fusion)

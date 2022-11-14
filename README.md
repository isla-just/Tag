<!-- PROJECT LOGO -->
<br />

![GitHub repo size](https://img.shields.io/github/repo-size/isla-just/BloomInventories?color=%23FB5E1B)
![GitHub watchers](https://img.shields.io/github/watchers/isla-just/BloomInventories?color=%23FECE34)
![GitHub language count](https://img.shields.io/github/languages/count/isla-just/BloomInventories?color=%23F583B4)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/isla-just/BloomInventories?color=%236C97FB)
[![LinkedIn][linkedin-shield]][linkedin-url]
[![Instagram][instagram-shield]][instagram-url]


<h6 align="center">Isla Just 200080 IDV 302</h6>
<p align="center">
</br>
   
   <p align="center">
  <a href="https://github.com/isla-just/Tag ">
    <img src="ReadMeImg/logo.png" alt="Logo" width="180" height="">
  </a>
  </p>
  
  <h3 align="center">This is Tag</h3>

  <p align="center">
    A massive game of tag!<br>
      <a href="https://github.com/isla-just/Tag"><strong>Explore the docs »</strong></a>
      <br />
      <br />
      <a href="https://drive.google.com/file/d/1deRish0cNObeLFc7iwwodsTuOQ7Glfhg/view?usp=sharing">View Demo</a>
       ·
       <a href="https://github.com/isla-just/Tag/issues">Report Bug</a>
       ·
       <a href="https://github.com/isla-just/Tag/issues">Request Feature</a>
   </p>

<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Project Description](#project-description)
  * [Built with](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Features and Functionality](#features-and-functionality)
   * [Features](#features)
   * [Functionality](#functionality)
* [Concept Process](#concept-process)
   * [ERD](#ERD)
   * [Wireframes](#wireframes)
   * [User-flow](#user-flow)
* [Development Process](#development-process)
   * [Implementation Process](#implementation-process)
        * [Highlights](#highlights)
        * [Challenges](#challenges)
   * [Reviews and Testing](#reviews-and-testing)
        * [Unit Testing](#unit-testing)
   * [Future Implementation](#future-implementation)
* [Final Outcome](#final-outcome)
   * [Mockups](#mockups)
   * [Video Demonstration](#video-demonstration)
   * [Promotional Video](#promotional-video)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)

<!--PROJECT DESCRIPTION-->
## About the Project

![image1][image1]

### Project Description

A massive worldwide game of tag which is hosted monthly and uses your geolocation to find players nearby. 

Every month there is a huge tag competition hosted on the app. You have to enter as a player and then pass the tag on if you are tagged - this works by finding other players nearby. Climb the leaderboard and you might just win a crown

### Built With

* [Firebase](https://firebase.google.com/)
* [React Native](https://reactnative.dev/)
* [Expo](https://expo.dev/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [GitHub](https://github.com/)

<!-- GETTING STARTED -->
## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

For development, I used Visual Studio Code [Visual Studio Code Download](https://code.visualstudio.com/). And I used ExpoGo to text the app on my phone [ExpoGo Download](https://expo.dev/client)



### Installation
 
1. Clone the repo
```sh
git clone https://github.com/isla-just/Tag.git
```

2. Open the solution in Visual Studio Code

3. Install all dependencies using Visual Studio
```sh
npm install
```

4. Run expo start in your terminal 

5. then download the ExpoGo app on your mobile device and scan the QR code

<!-- FEATURES AND FUNCTIONALITY-->
## Features and Functionality

### Features

### Login and signup

![image2][image2]

Simple login and signup forms allowing you to be onboarded quickly and easily. There is also a preloader, welcome, login, signup and permission screen. This onboarding experience is quick and easy and has been implemented using simple forms and firebase authentication for the backend

### Tag you're it!

![image3][image3]

If the user has been tagged by another player, this screen will pop up in real time. You are given a dynamic map with all the other player's locations on it - the markers are interactive

### Home page

![image4][image4]

On the home page, you are given the game countdown and are shown the region of the tag currently - but you never know who has it. You can view the top 3 players and view your player stats like the amount of times you have been tagged. 

### Entering and viewing competitions

![image5][image5]

You can view the dynamic leaderboard which updates in real-time. You can also join next month's competition from the home page and view how many people are waiting to play and the dates

### Completed competition

![image6][image6]

There is a cloud function that runs at the begining of each month to handle this functionality. Once the cloud function has run and the countdown on the home page has run out, this page will pop up. You can view your place in the competition and if you come first you even win a funky crown.

### Functionality

* `Firebase authentication` allowing for safe and secure login and register of users - also allowing the user to log out securely
* `Location Monitoring` monitoring user locations and plotting them on a map
* `Tagging functionality` interactive markers allowing you to tag someone closeby
* `Game countdown` using react countdown 
* `Finding tag region` using the geonames API 
* `Entering next month's competition` where you are shown the dates for the next competition and how many people have already entered
* `Dynamic leaderboard` for the competition as well as showing the top three players on the leaderboard and home page
* `Player statistics` shown on the home page. You are shown a a tag counter, your points and your region
* `Cloud function` generating competitions and updating the statuses of current and past competitions
* `Winning crowns` if you place first on the leaderboard
* `Boring Avatar` API that randomly assigns every user a funky avatar

<!-- CONCEPT PROCESS -->
## Concept Process

The `Conceptual Process` is the set of actions, activities and research that was done when starting this project.

### ERD

![image8][image8]

### User-flow

![image7][image7]

<!-- DEVELOPMENT PROCESS -->
## Development Process


The `Development Process` is the technical implementations and functionality done in the backend of the application.

### Implementation Process

### Frontend development and project setup
I set up my project using Expo and started coding my frontend components. I also set up my firebase and started implementing navigation 

### Login and signup - firebase authentication and database setup
After playing around with forms, I linked my firebase and implemented authentication. I also created my DB structure 

### Tagging functionality
Managing map permissions on all platforms. I used geoqueries and geohashing to store the locations in the database

### Entering competitions and dynamic data
Outputting data dynamically on the frontend and entering the next competition functionality

### Create competition cloud functions
Writing a cloud function that does 3 things at the beginning of each month Completed competition functionality

![image9][image9]

#### Highlights

* I really enjoyed working on this app because of the concept I picked. I found working with Expo and React Native very efficient and overall enjoyable. 

#### Challenges

* The locations and tagging aspect of this project with geoqueries were very tricky. 
* The timing aspect of this project using cloud functions was also one of my biggest challenges but I am so pleased that I got it working


#### Future Implementation

* Push notifications when a competition is complete
* customised avatars
* winning powerups once a week - getting special skills to help you in the competition
gifts functionality to send other players gifts

<!-- MOCKUPS -->
## Final Outcome

### Mockups

![image10][image10]
![image11][image11]

<!-- VIDEO DEMONSTRATION -->
## Video Demonstration

To see a run through of the application, click below:

[View Demonstration](https://drive.google.com/file/d/1deRish0cNObeLFc7iwwodsTuOQ7Glfhg/view?usp=sharing)

<!-- PROMO VIDEO -->
## Promotional Video

To see the promotional video, click below:

[View Promotional Video](https://youtu.be/bP1KuMEj_iA)

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/isla-just/Tag/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- AUTHORS -->
## Authors

* **Isla Just** - [IslaJust](https://github.com/isla-just)

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.\

<!-- LICENSE -->
## Contact

* **Isla Just** - [@byislajust](https://www.instagram.com/byislajust/) - isla@just.co.za
* **Project Link** - https://github.com/isla-just/Tag

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

* Design inspiration from headspace [Headspace](https://www.headspace.com/)
* Avatars from [Boring Avatars](https://boringavatars.com/)

### Documentation 
* https://docs.expo.dev/versions/latest/sdk/location/
* https://reactnavigation.org/
* https://firebase.google.com/docs/reference/android/com/google/firebase/firestore/GeoPoint
* https://firebase.google.com/docs/firestore/solutions/geoqueries#web_1
* https://firebase.google.com/docs/functions/schedule-functions

### Mockups
* https://originalmockups.com/mockups/free-mockups
* https://freedesignresources.net/category/free-mockups/?_paged=6
* https://www.anthonyboyd.graphics/mockups/28/

### Tutorials
* https://instamobile.io/react-native-tutorials/uber-react-native-geolocation/
* https://www.freecodecamp.org/news/how-to-schedule-a-task-with-firebase-cloud-functions/
* https://www.youtube.com/watch?v=D4wgrgb24o0

* Peers: Pieter Venter https://github.com/Pieter-stack and Hansin Prema
* lecturer: Armand Pretorius https://github.com/ArmandPret


[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/isla-just-b038a2202
[instagram-shield]: https://img.shields.io/badge/-Instagram-black.svg?style=flat-square&logo=instagram&colorB=555
[instagram-url]: https://www.instagram.com/dylandasilva.designs/

<!-- MARKDOWN LINKS & IMAGES -->
[logo]: ReadMeImg/logo.png
[image1]: ReadMeImg/image1.png
[image2]: ReadMeImg/image2.png
[image3]: ReadMeImg/image3.png
[image4]: ReadMeImg/image4.png
[image5]: ReadMeImg/image5.png
[image6]: ReadMeImg/image6.png
[image7]: ReadMeImg/image7.png
[image8]: ReadMeImg/image8.png
[image9]: ReadMeImg/image9.png
[image10]: ReadMeImg/image10.png
[image11]: ReadMeImg/image11.png

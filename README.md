<!-- PROJECT LOGO -->
<br />

![GitHub repo size](https://img.shields.io/github/repo-size/isla-just/BloomInventories?color=%23C2C6B1)
![GitHub watchers](https://img.shields.io/github/watchers/isla-just/BloomInventories?color=%23EDC9B5)
![GitHub language count](https://img.shields.io/github/languages/count/isla-just/BloomInventories?color=%23EDC9B5)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/isla-just/BloomInventories?color=%23EDC9B5)
[![LinkedIn][linkedin-shield]][linkedin-url]
[![Instagram][instagram-shield]][instagram-url]

<h6 align="center">Isla Just 200080 IDV 301</h6>
<p align="center">
</br>
   
   <p align="center">
  <a href="https://github.com/isla-just/BloomInventories ">
    <img src="ReadMeImg/logo.png" alt="Logo" width="240" height="">
  </a>
  </p>
  
  <h3 align="center">Bloom Inventories</h3>

  <p align="center">
    employee-centred florist inventory management portal<br>
      <a href="https://github.com/isla-just/BloomInventories"><strong>Explore the docs »</strong></a>
      <br />
      <br />
      <a href="ReadMeImg/IslaJust_200080_DV300_T1_demo.mp4">View Demo</a>
       ·
       <a href="https://github.com/isla-just/BloomInventories/issues">Report Bug</a>
       ·
       <a href="https://github.com/isla-just/BloomInventories/issues">Request Feature</a>
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

Bloom Inventories keeps track of bouquets and flowers so that employees can easily manage all three Bloom Inventory locations. 

Grocery flowers are becoming more impersonal and are also insanely expensive - they also die quickly because they aren't fresh. Bloom Inventories takes an employee-centred design approach to allow employees to keep track of flowers and bouquets. Bloom Inventories also does weekly bouquets where people can subscribe and get bouquets sent to their homes every week.

### Built With

* [ASP.NET](https://dotnet.microsoft.com/en-us/apps/aspnet)
* [mySQL database](https://www.mysql.com/)
* [C# language](https://docs.microsoft.com/en-us/dotnet/csharp/)
* [Visual Studio](https://visualstudio.microsoft.com/)
* [GitHub](https://github.com/)
* [Mamp](https://www.mamp.info/en/windows/)

<!-- GETTING STARTED -->
## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

For development, the latest version (ideally the 2022 preview) of Visual Studio is required - install it with .NET. The latest version can be downloaded from [Visual Studio Download](https://visualstudio.microsoft.com/downloads/)

### Installation
 
1. Clone the repo
```sh
git clone https://github.com/isla-just/BloomInventories.git
```
2. Start your MAMP server which can be downloaded  [here](https://www.mamp.info/en/windows/)

3. Open the solution in Visual Visual Studio

4. Find the migrations folder in the directory and import the bloom.sql file using phpmyadmin

5. Navigate to the Services folder and the Database.cs file and change the database connection string 
```sh
	private static string serverConfiguration = @"server=localhost;port=8889 userid=root;password=root;database=bloom";
```
6. if neccessary, install respective NuGet Packages
* XAct.Core.PCL - SHA1 encryption
* MySQL.Data - sql

7. Build Bloom Inventories!

<!-- FEATURES AND FUNCTIONALITY-->
## Features and Functionality

### Features

### Contextual home page

![image2][image2]

There is a dynamic slider on the home page as well as a dynamic flower gallery. There is a location section that shows a slideshow of locations. There is also a subscription form that allows you to subscribe for weekly flowers - this includes database verification testing if the email has already been taken as well as user feedback. 

### Verify Bloom Inventory employee

![image3][image3]

Unconventional verification has been achived through a popup on the homepage that randomly generates a flower from the database and shows an image of it. The employee must name the flower correcly to move forward. the flower name has been hashed using the cryptographic hash function and there is also security implemented on each employee accessible page

### Dashboard page

![image4][image4]

the dashboard page provides users with an overview of seasonal and low stock flowers based on their location. They are also shown the bouquet of the week where they can generate a new random bouquet. Counters for the location's bouquets and weekly bouquet subscribers are also shown.   

### Inventory management

![image5][image5]

Employees can visualise flowers and packing materials for each location as well as their quantities. Employees can update materials and are given feedback. They can also filter based on category. Location filtering and inventory management can also be done on this page.

### Create bouquets

![image6][image6]

Employees can see all bouquets in the selected location and they can further filter results according to category as well as change the location. They can see which bouquets can be created and are given a popup walkthrough to craft the bouquet. Once crafted, it is added to the inventory and respective flower quantities are updated accordingly. 

### Functionality

* `MVC` a model view controller architecture has been used with RazorPages to embed c# code in our html.
* `ASP form handlers` have been used to handle the submits of all the dynamic forms throughout the website.
* `local storage` has been used to check if the employee has been verified on every page.
* `password hashing` SHA1 hashing has been used to hash the flower name in the database.
* `OOP principles` used to model objects in classes.
* `database relationships` modelling complex data structures in SQL.
* `User experience` frontend refinements to cater for good user experience. 
* `UQL queries` storing session data to output data dynamically on the frontend. 
* `Crafting bouquets` and updating respective flower quantities accordingly. 

<!-- CONCEPT PROCESS -->
## Concept Process

The `Conceptual Process` is the set of actions, activities and research that was done when starting this project.

### ERD

![image9][image9]

### Wireframes

![image11][image11]
![image12][image12]

### User-flow

![image10][image10]

<!-- DEVELOPMENT PROCESS -->
## Development Process


The `Development Process` is the technical implementations and functionality done in the backend of the application.

![image13][image13]

### Implementation Process

#### Frontend layout and oject modelling
I started by designing the frontend of my website using my razorpages as well as regular html and css. I also started implementing some OOP basics in my project so I could start modelling objects

#### database linking and dynamic data
Then I did my database link and started modelling my data in my database. I also had to populate my database with all the flowers and bouquets

#### CRUD and crafting functionality
this was the main functionality of this project. All handling as done using asp page handlers on form submits, calling data from the model and the database class

#### UX, verification, security and frontend refinements
next I started making my project dynamic with jquery. I also added the unconventional verification and flower hashing. I implemented the security on each page

#### Highlights

* I really enjoyed being creative with this theme. Once I got the hang of OOP and C#, I ended up really enjoying it

#### Challenges

* Popups and feedback also proved to be a challenge because of page refreshes after form submits
* my frontend also took a little longer than expected because I had to rebuild my project after every minor change


#### Future Implementation

* A payment portal where you can sell bouquets implementing the Snapscan api
* Bouquet of the week functionality timer and automation

<!-- MOCKUPS -->
## Final Outcome

### Mockups

![image15][image15]

<!-- VIDEO DEMONSTRATION -->
## Video Demonstration

To see a run through of the application, click below:

[View Demonstration]()

<!-- PROMO VIDEO -->
## Promotional Video

To see the promotional video, click below:

[View Promotional Video]()

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/isla-just/BloomInventories/issues) for a list of proposed features (and known issues).

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
* **Project Link** - https://github.com/isla-just/BloomInventories

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

* [Visual Studio Documenation](https://docs.microsoft.com/en-us/visualstudio/windows/?view=vs-2019)
* [StackOverflow](https://stackoverflow.com/)

mockups:
* https://originalmockups.com/mockups/free-mockups
* https://freedesignresources.net/category/free-mockups/?_paged=6
* https://www.anthonyboyd.graphics/mockups/28/

* Peers: Pieter Venter https://github.com/Pieter-stack and Hansin Prema
* lecturer: Armand Pretorius https://github.com/ArmandPret


[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/isla-just-b038a2202
[instagram-shield]: https://img.shields.io/badge/-Instagram-black.svg?style=flat-square&logo=instagram&colorB=555
[instagram-url]: https://www.instagram.com/dylandasilva.designs/

<!-- MARKDOWN LINKS & IMAGES -->
[image1]: ReadMeImg/devmockup3.png
[image2]: ReadMeImg/15.png
[image3]: ReadMeImg/16.png
[image4]: ReadMeImg/17.png
[image5]: ReadMeImg/18.png
[image6]: ReadMeImg/19.png
[image9]: ReadMeImg/8.png
[image10]: ReadMeImg/9.png
[image11]: ReadMeImg/10.png
[image12]: ReadMeImg/11.png
[image13]: ReadMeImg/14.png
[image14]: ReadMeImg/22.png

[image15]: ReadMeImg/devmockup1.png

 

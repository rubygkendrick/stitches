
# Stitches

## Problem Solved

Embroidery Artists understand the importance of thorough planning to realize their creative ideas. Stitches provides a complete solution, allowing users to carefully design and manage their projects before threading the needle! With Stitches, users can effortlessly create and save personalized embroidery kits, including pattern drawings, color schemes, stitch types, and strand counts. This user-friendly platform not only supports individual creativity, but also encourages collaboration by enabling users to easily share their curated kits with fellow embroidery enthusiasts.



## Database

[Capstone Database GitHub Repository](https://github.com/rubygkendrick/stitches-api)

 ## Technologies Used 

- ReactJS 
- JavaScript
- HTML5
- CSS3
- Vite


## Installation and Setup Instructions

Clone this repository, and the [Database](https://github.com/rubygkendrick/stitches-api) repository. You will need [node](https://github.com/nodejs/node), [npm](https://github.com/npm/cli), and [json-server@0.17.4](https://github.com/typicode/json-server) installed globally on your machine.

#### Installation:
Navigate to the cloned directory for this repository, and run
```
npm install
```
#### Run database:
Navigate to the cloned directory for the [database]((https://github.com/rubygkendrick/stitches-api)) repository, and run
```
npm run dev
```
Then navigate to http://localhost:8088

## Wireframe
[Project Wireframe](https://miro.com/app/board/uXjVNj-xYNI=/?moveToWidget=3458764581599684756&cot=14)

## ER Diagram
[Entity Relationship Diagram](https://dbdiagram.io/d/Stitches-Capstone-65ea070eb1f3d4062c65270f)


## Usage Notes:
### KitForm.jsx

`KitForm.jsx` serves as the primary component for both creating a new kit and editing an existing one. It facilitates user interaction with input fields and relies heavily on the state management of `currentKit` and `currentKitStitchIds`.

- **Editing an Existing Kit**: Editing an existing kit involves pre-populating the form fields with the existing data. Ensure that the `currentKit` and `currentKitStitchIds` states are appropriately updated with the existing kit details upon rendering the form.

### Important Considerations:

- **State Management**: Be cautious when manipulating the `currentKit` and `currentKitStitchIds` states. Any changes made to these states will reflect immediately in the form fields.

- **Validation**: Implement necessary validation checks to ensure that the data entered in the form is accurate and meets the required criteria.

- **Event Handling**: Handle user interactions and form submissions carefully to maintain the integrity of the `currentKit` and `currentKitStitchIds` states.

Please review and test thoroughly before making any modifications to `KitForm.jsx`. In case of any uncertainties or issues, refer to the state management logic and ensure consistency in data handling.


## Reflection
In this capstone project, I was able to implement CRUD functionality, navigation between React components using React-Router, and styling throughout my website using CSS.

My primary challenge was properly handling how to build up layers of dependant information over multiple renders, useEffects, and fetch calls. Managing State with checkboxes was also challenging. 

I plan to eventually implement a color picker window for creating a new kit, and color boxes to display the colors for each kit, as opposed to displaying the hex codes. 

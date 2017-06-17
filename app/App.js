// Include the Main React Dependencies
import React from "react";
import ReactDOM from "react-dom";

// Include the Main Component
let Main = require('./Components/Main');

// This code here allows us to render our main component (in this case "Main")
ReactDOM.render(

    <Main />,
    document.getElementById('app')
);
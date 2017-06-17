/**
 * Created by ryanrodwell on 6/9/17.
 */
import React from "react";

let Results = require("./Results");

// Component creation
let Search = React.createClass({

    // Here we set a generic state associated with the text being searched for
    getInitialState: function(){
        return {
            topic: "",
            startYear: "",
            endYear: ""
        }
    },

    // This function will respond to the user input
    handleChange: function(event){

        // Here we create syntax to capture any change in text to the query terms (pre-search).
        let newState = {};
        newState[event.target.id] = event.target.value;
        this.setState(newState);

    },

    // When a user submits...
    handleClick: function(){

        // Set the parent to have the search term
        this.props.setTerm(this.state.topic, this.state.startYear, this.state.endYear);

    },

    render() {
        return(
            <div>
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <h3 className="panel-title">Search Results</h3>
                    </div>
                    <div className="panel-body results">
                        <form>
                            <div className="form-group">
                                <h4 className=""><strong>Topic</strong></h4>
                                <input type="text" className="form-control text-center" id="topic" onChange= {this.handleChange} required/>
                                <br />

                                <h4 className=""><strong>Start Year</strong></h4>
                                <input type="text" className="form-control text-center" id="startYear" onChange= {this.handleChange} required/>
                                <br />

                                <h4 className=""><strong>End Year</strong></h4>
                                <input type="text" className="form-control text-center" id="endYear" onChange= {this.handleChange} required/>
                                <br />

                                <button type="button" className="btn btn-info" onClick={this.handleClick}>Search</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
});

export default Search;
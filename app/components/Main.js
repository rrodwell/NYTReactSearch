// Include React
import React from "react";

import axios from 'axios';


import Search from "./Children/Search";
import Saved from "./Children/Saved";
import Results from "./Children/Results";

// Helper Function
import helpers from './utils/helpers.js';



let Main = React.createClass({

    // Here we set a generic state associated with the number of clicks
    getInitialState: function(){
        return {
            topic: "",
            startYear: "",
            endYear: "",
            results: [],
            savedArticles: []
        }
    },

    // We use this function to allow children to update the parent with searchTerms.
    setTerm: function(tpc, stYr, endYr){
        this.setState({
            topic: tpc,
            startYear: stYr,
            endYear: endYr
        })
    },

    saveArticle: function(title, date, url){
        helpers.postArticle(title, date, url);
        this.getArticle();
    },

    deleteArticle: function(article){
        console.log(article);
        axios.delete('/api/saved/' + article._id)
            .then(function(response){
                this.setState({
                    savedArticles: response.data
                });
                return response;
            }.bind(this));

        this.getArticle();
    },

    getArticle: function(){
        axios.get('/api/saved')
            .then(function(response){
                this.setState({
                    savedArticles: response.data
                });
            }.bind(this));
    },

    // If the component updates we'll run this code
    componentDidUpdate: function(prevProps, prevState){

        if(prevState.topic != this.state.topic){
            console.log("UPDATED");

            helpers.runQuery(this.state.topic, this.state.startYear, this.state.endYear)
                .then(function(data){
                    console.log(data);
                    if (data != this.state.results)
                    {
                        this.setState({
                            results: data
                        })
                    }
                }.bind(this))
        }
    },

    componentDidMount: function(){
        axios.get('/api/saved')
            .then(function(response){
                this.setState({
                    savedArticles: response.data
                });
            }.bind(this));
    },

  // Here we render the component
  render() {

    return (
        <div>
          <div className="jumbotron">
            <h1>New York Times Articles</h1>
          </div>
          <div className="container content">
            <div className="panel panel-info">
              <div className="panel-heading">
                <h3 className="panel-title">Search Parameters</h3>
              </div>
              <div className="panel-body">
                <form role="form">
                  <div className="form-group">
                    <label>Search Term:</label>
                    <input type="text" className="form-control" id="search" />
                  </div>
                  <div className="form-group">
                    <label>Number of Records to Retrieve:</label>
                      <select className="form-control" id="num-records">
                        <option value="1">1</option>
                        <option value="5" selected>5</option>
                        <option value="10">10</option>
                      </select>
                  </div>
                  <div className="form-group">
                    <label>Start Year:</label>
                    <input type="text" className="form-control start-year" />
                  </div>
                  <div className="form-group">
                    <label>End Year:</label>
                    <input type="text" className="form-control" id="end-year" />
                  </div>
                  <button type="submit" className="btn btn-primary" id="search-btn">Search</button>
                  <button type="button" className="btn btn-default clear">Clear</button>
                </form>
              </div>
            </div>
              <div className="row">

                  <Search setTerm={this.setTerm}/>

              </div>

              <div className="row">

                  <Results results={this.state.results} saveArticle={this.saveArticle}/>

              </div>

              <div className="row">

                  <Saved savedArticles={this.state.savedArticles} deleteArticle={this.deleteArticle} />

              </div>
          </div>
        </div>
    );//return
  }//render
});//class

// Export the component back for use in other files
export default Main;

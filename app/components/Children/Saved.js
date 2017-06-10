/**
 * Created by ryanrodwell on 6/9/17.
 */
import React from "react";
import Results from "./Grandchildren/Results";

class Saved extends React.Component {
    render() {
        return(
          <div>
              <div className="panel panel-info">
                  <div className="panel-heading">
                      <h3 className="panel-title">Saved Articles</h3>
                  </div>
                  <div className="panel-body results">
                      {/*React Component*/}
                      <Results />
                  </div>
              </div>
          </div>
        );
    }
}

export default Saved;
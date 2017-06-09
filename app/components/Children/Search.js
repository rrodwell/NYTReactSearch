/**
 * Created by ryanrodwell on 6/9/17.
 */
import React from "react";

import Query from "./Grandchildren/Query";
import Results from "./Grandchildren/Results";

class Search extends React.Component {
    render() {
        return(
            <div>
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <h3 className="panel-title">Search Results</h3>
                    </div>
                    <div className="panel-body results">
                        {/*React Component*/}
                        <Results />
                        <Query />
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;
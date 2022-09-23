import { useHistory } from "react-router-dom";

import "./PageNotFound.css";

function PageNotFound() {

    const history = useHistory();

    return (
        <div id="not-found-container">
            <div>
                <div id="not-found-header-container">
                    <h1 id="not-found-header">
                        Page Not Found
                    </h1>
                </div>
            </div>
            <div 
                id="image-container"
                onClick={() => history.push("/")}
            >
            </div>
        </div>
    )
}

export default PageNotFound;
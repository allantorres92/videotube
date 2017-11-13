import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import Starrating from './Starrating.jsx';

class Videocard extends React.Component {

    render() {
        const {video} = this.props;
        //CALCULATIONS FOR RATING
        var sum = 0;
        video.ratings.map(rating =>{
            sum+=rating;
        });
        var average = sum/video.ratings.length;

        return(
                <div key={video._id} className="col-sm-6 col-md-4 col-lg-3">
                    <div className="card" >
                        <video className="card-img-top" controls>
                            <source src={video.url} type="video/mp4"/>
                            Your browser does not support the video tag.
                        </video>
                        <div className="card-body">
                            <div className="row justify-content-center">
                                <Starrating rating="5" actualrating={average} editable={false}/>
                            </div>
                            <div className="row">
                                <Link to={"/ViewVideo/"+video._id} className="card-title-link" ><h4 className="card-title">{video.name}</h4>
                                <p className="card-text">{video.description}</p></Link>
                            </div>
                        </div>
                    </div>    
                </div>
            );
    }
}

export default Videocard;
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import { loadVideo, saveRating } from './actions';
import Videocard from './Videocard.jsx';
import Starrating from './Starrating.jsx';

class Viewvideo extends React.Component {

    componentWillMount(){
        this.props.loadVideo(this.props.match.params.id,this.props.auth.token,this.props.history);
    }

    changerating(rating){
        this.props.saveRating(this.props.uqvideo.video._id,rating, this.props.auth.token,this.props.history);
    }

    render() {
        const {loaded,video} = this.props.uqvideo;

        if(!loaded){
            return(
                <div className="row justify-content-center">
                    <div className="col-3">
                        <div className="loader"></div>
                    </div>
                </div>
            );
        }

        //LAS RATING INPUTTED, AND WILL BE REPLACED WHEN A NEW ONE IS SUBMITTED
        var rating = video.ratings[video.ratings.length-1];

        return(
            <div>
                <div className="row justify-content-center">
                    <div className="embed-responsive embed-responsive-16by9">
                        <video controls autoPlay loop className="embed-responsive-item">
                        <source src={video.url} type="video/mp4"/>
                        Your browser does not support the video tag.
                        </video>
                    </div>  
                       
                </div>
                <div className="row justify-content-center">
                    <div className="col-12">
                        <h2 >{video.name}</h2>
                        <Starrating rating="5" actualrating={rating} editable={true} changerating={this.changerating.bind(this)} />
                        <p>{video.description}</p>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
  return {...state.toJS()};
};

export default connect(mapStateToProps,{loadVideo, saveRating})(Viewvideo);

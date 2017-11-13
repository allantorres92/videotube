import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import { loadAllVideos } from './actions';
import Videocard from './Videocard.jsx';

class home extends React.Component {

    componentWillMount(){
        this.props.loadAllVideos(this.props.auth.token,this.props.history);
    }

    render() {
        const {loaded,videos} = this.props.videos;

        if(!loaded){
            return(
                <div className="row justify-content-center">
                    <div className="col-3">
                        <div className="loader"></div>
                    </div>
                </div>
            );
        }
        return(
            <div className="container-fluid" >
                <div className="row">
                    {videos.map((video,index) =>{
                        return(
                            <Videocard key={video._id} video={video}/>
                        );
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
  return {...state.toJS()};
};

export default connect(mapStateToProps,{loadAllVideos})(home);

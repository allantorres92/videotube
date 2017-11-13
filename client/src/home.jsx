import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import { loadAllVideos } from './actions';
import Videocard from './Videocard.jsx';

class home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {    
            loading: false,
            endScroll:false
        };
    }

      
    componentWillMount(){
        this.props.loadAllVideos(this.props.auth.token,this.props.history,true);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this))
        window.scrollTo(0, 0);        
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this))
    }

    //METHOD FOR LAZY LOADING SCROLL
    handleScroll(event) {
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
            if(this.props.videos.videos.length <= 31 && !this.state.endScroll){
                this.setState({loading:true});
                this.props.loadAllVideos(this.props.auth.token,this.props.history,false);
                
            }else{
                this.setState({loading:false,endScroll:true})
            }
        }
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
                <div id="start"/>
                <div className="row">
                    {videos.map((video,index) =>{
                        return(
                            <Videocard key={index}  video={video} data={{length:videos.length,index}} />
                        );
                    })}
                </div>
                {this.state.loading &&                 
                    <div className="row justify-content-center">
                        <div className="col-2">
                            <div className="loader"></div>
                        </div>
                    </div>
                }
                {this.state.endScroll &&
                    <div className="row justify-content-center">
                        <div className="col-2">
                            <button onClick={()=>{window.scrollTo(0, 0)}}>
                                <h4>Back to top</h4>
                            </button>
                        </div>
                    </div>            
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
  return {...state.toJS()};
};

export default connect(mapStateToProps,{loadAllVideos})(home);

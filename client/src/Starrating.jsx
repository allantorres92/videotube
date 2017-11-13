import React from 'react';
import ReactDOM from 'react-dom';


class Starrating extends React.Component {
 constructor(props) {
      super(props);
      this.state = {actualRating: this.props.actualrating};
    }
    
  changerating(newrating){
    this.props.changerating(newrating);
    this.setState({actualRating:newrating});
  }
    
  render() {
  var rows = [];
console.log(this.props);
    return (
            <div className="rating ">
                {(() =>{
                    if(this.props.editable){
                        for (var i = 1; i <= this.props.rating; i++) { 
                            if(i<=this.state.actualRating){
                                rows.push(
                                    <a key={i} onClick={this.changerating.bind(this,i)}>
                                        <i className="fa fa-star fa-2x" aria-hidden="true"></i>
                                    </a>
                                    );
                            }else{
                                rows.push(
                                    <a key={i} onClick={this.changerating.bind(this,i)}>
                                        <i className="fa fa-star-o fa-2x" aria-hidden="true"></i>
                                    </a>
                                    );
                            }
                        }
                    }else{
                        for (var i = 1; i <= this.props.rating; i++) { 
                            if(i<=this.state.actualRating){
                                rows.push(
                                    <i key={i} className="fa fa-star fa-lg" aria-hidden="true"></i>
                                    );
                            }else{
                                rows.push(
                                    <i key={i} className="fa fa-star-o fa-lg" aria-hidden="true"></i>
                                );
                            }
                        }
                    }
                    return(rows);
                })()}
            </div>
        );
  }
}

export default Starrating;
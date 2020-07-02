import React, { Component } from 'react';
import { IoIosStarOutline} from "react-icons/io";
import { IoIosStar } from "react-icons/io";

class review_star_2 extends Component {
    render() {
        return (
            <div>
                 <span>
                     <IoIosStar style={{color:'#45adad'}}/>
                     <IoIosStar style={{color:'#45adad'}}/>
                     <IoIosStarOutline style={{color:'#45adad'}}/>
                     <IoIosStarOutline style={{color:'#45adad'}}/>
                     <IoIosStarOutline style={{color:'#45adad'}}/>
                </span> 
            </div>
        );
    }
}

export default review_star_2;
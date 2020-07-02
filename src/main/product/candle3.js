import React, {Component}  from 'react';
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import '../../user/mypage/container/main.css';
import './cakeView.css';
class Candle3 extends Component
{
  state = {
      
    candle: '',
    candle2: '',
    candle3: '',
  
  }
  
 
  render(){
  const handleChangecandle = (event) => {  
  
      this.setState
      ({    
      candle: event.target.value
      });
      this.props.candlesave1(event.target.value);
      
  };
  const handleChangecandle2 = (event) => {  
    
    this.setState
    ({    
    candle2: event.target.value
    });
    this.props.candlesave2(event.target.value);
       
  };
  
  const handleChangecandle3 = (event) => {  
        
    this.setState
    ({    
    candle3: event.target.value
    });
    this.props.candlesave3(event.target.value);
  };
  return(
    <>
      <TableRow>
        <TableCell align={"right"} > 
        <p className="cakeView_P" > 첫번째 초선택 : </p>
        </TableCell>
        <TableCell>
          <FormControl className="candle">
            <InputLabel shrink id="demo-simple-select-placeholder-label-label"></InputLabel>
            <Select
              labelId="demo-simple-select-placeholder-label-label"
              id="demo-simple-select-placeholder-label"
              style={{ margin: 1 }}
              onChange={handleChangecandle}
            >
            <MenuItem value={"일반초"} >
                <em>일반초</em>
               
              </MenuItem>
              <MenuItem value={"Happy Birthday초"} >
                Happy Birthday초
           
              </MenuItem>
              <MenuItem value={"smile초"} >
                smile초
              
              </MenuItem>
              <MenuItem value={"숫자초"} >
                숫자초
              
              </MenuItem>
              <MenuItem value={"하트초"}>
                하트초
             
              </MenuItem>
            </Select>
          </FormControl>
        </TableCell> 
      </TableRow>
      <TableRow>
        <TableCell align={"right"} > 
        <p className="cakeView_P" >  두번째 초선택 : </p>  
        </TableCell>
        <TableCell>
          <FormControl className="candle">
            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            </InputLabel>
            <Select
              labelId="demo-simple-select-placeholder-label-label"
              id="demo-simple-select-placeholder-label"
              style={{ margin: 1 }}
              onChange={handleChangecandle2}
              >
              <MenuItem value={"일반초"} >
                  <em>일반초</em>
             
              </MenuItem>
              <MenuItem value={"Happy Birthday초"}>
                  Happy Birthday초
               
              </MenuItem>
              <MenuItem value={"smile초"} >
                smile초
              
              </MenuItem>
              <MenuItem value={"숫자초"}>
                숫자초
              
              </MenuItem>
              <MenuItem value={"하트초"} >
                하트초
              
              </MenuItem>
            </Select>
          </FormControl>
       </TableCell> 
      </TableRow>
      <TableRow>
        <TableCell align={"right"} > 
        <p className="cakeView_P" > 세번째 초선택 :   </p> 
        </TableCell>
        <TableCell>
          <FormControl className="candle">
            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            </InputLabel>
            <Select
              labelId="demo-simple-select-placeholder-label-label"
              id="demo-simple-select-placeholder-label"
              style={{ margin: 1 }}
              onChange={handleChangecandle3}
            >
              <MenuItem value={"일반초"} >
                  <em>일반초</em>
                 
                </MenuItem>
                <MenuItem value={"Happy Birthday초"} >
                  Happy Birthday초
                
                </MenuItem>
                <MenuItem value={"smile초"} >
                  smile초
                
                </MenuItem>
                <MenuItem value={"숫자초"} >
                  숫자초
                 
                </MenuItem>
                <MenuItem value={"하트초"} >
                  하트초
               
                </MenuItem>
              </Select>
            </FormControl>
          </TableCell> 
        </TableRow>
      </>         
    )
  }
}
 
export default Candle3
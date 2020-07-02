import React, { Component } from 'react';
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import '../../user/mypage/container/main.css';
import './cakeView.css';

class Candle1 extends Component {
  state = {
    candle: '',
   
  }

  render() {
    const handleChangeCandle = (event) => {

      this.setState
        ({
          candle: event.target.value
        });
      this.props.candlesave1(event.target.value);
    };
    return (
      <>
        <TableRow>
          <TableCell align={"right"} >
          <p className="cakeView_P" > 초선택 : </p> 
          </TableCell>
          <TableCell>
            <FormControl className="candle">
              <InputLabel shrink id="demo-simple-select-placeholder-label-label"></InputLabel>
              <Select
                labelId="demo-simple-select-placeholder-label-label"
                id="demo-simple-select-placeholder-label"
                style={{ margin: 1 }}
                onChange={handleChangeCandle}
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

export default Candle1
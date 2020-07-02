import React, { Component } from 'react';
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import '../../user/mypage/container/main.css';

class lettering1 extends Component {
  state = {

    text: '',
    count: 0,
    textInput: '',

  }

  countChange = (event) => {
    this.setState
      ({
        count: this.state.count + 1,

      })

    this.props.letteringsave1(event.target.value);
  }

  render() {
    const handleChange = (event) => {

      this.setState
        ({
          text: event.target.value,
          textInput: ''
        });
      this.props.letteringsave1(event.target.value);

    };




    return (
      <>
        <TableRow>
          <TableCell align={"right"}>
            <p className="cakeView_P" >  문구를 <br />선택해 주세요  : </p>
          </TableCell>
          <TableCell>
            <FormControl >
              <InputLabel shrink id="demo-simple-select-placeholder-label-label">
              </InputLabel>
              <Select
                labelId="demo-simple-select-placeholder-label-label"
                id="demo-simple-select-placeholder-label"
                onChange={handleChange}

                style={{ margin: 1 }}
              >
                <MenuItem value={"기본문구"}>
                  <em>기본문구</em>
                </MenuItem>
                <MenuItem value={"Happy Birthday"}>
                  Happy Birthday
                                                  </MenuItem>
                <MenuItem value={"Happy New Year"}>
                  Happy New Year
                                                  </MenuItem>
                <MenuItem value={1} >
                  직접입력
                                                  </MenuItem>
              </Select>
              <FormHelperText>
                <div style={{ color: "red" }}> 직접입력시 영어/한글 최대 20글자까지 가능합니다 </div>
              </FormHelperText>
            </FormControl>
          </TableCell>
        </TableRow>
        {this.state.text === 1 &&
          <TableRow>
            <TableCell colSpan={2}>
              <TextField style={{ width: '400px' }} placeholder="문구를 입력해주세요" onChange={this.countChange.bind(this)} />

            </TableCell>
          </TableRow>
        }

      </>


    )
  }
}

export default lettering1
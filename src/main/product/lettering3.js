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

class lettering3 extends Component {


  constructor(props) {
    super(props)

    this.state = {
      text: '',
      text2: '',
      text3: '',
      count: 0,
      count2: 0,
      count3: 0,
      textInput: '',
      textInput2: '',
      textInput3: '',
    }
  }




  countChange = (event) => {
    this.setState
      ({
        count: this.state.count + 1,

      });
    this.props.letteringsave1(event.target.value);
  }

  countChange2 = (event) => {
    this.setState
      ({
        count2: this.state.count2 + 1,
        textInput2: event.target.value
      });
    this.props.letteringsave2(event.target.value);
  }

  countChange3 = (event) => {
    this.setState
      ({
        count3: this.state.count3 + 1,

      });
    this.props.letteringsave3(event.target.value);
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



    const handleChange2 = (event) => {

      this.setState
        ({
          text2: event.target.value,
          textInput2: ''
        });
      this.props.letteringsave2(event.target.value);

    };

    const handleChange3 = (event) => {

      this.setState
        ({
          text3: event.target.value,
          textInput3: ''
        });
      this.props.letteringsave3(event.target.value);

    };



    return (
      <>
        <TableRow>
          <TableCell align={"right"}>
            <p className="cakeView_P" > 첫번째 문구를 <br />선택해 주세요  : </p>
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
                <div style={{ color: "red" }}>  직접입력시 영어/한글 최대 20글자까지 가능합니다 </div>
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
        <TableRow>
          <TableCell align={"right"}>
            <p className="cakeView_P" > 두번째 문구를 <br />선택해 주세요  : </p>
          </TableCell>
          <TableCell>
            <FormControl >
              <InputLabel shrink id="demo-simple-select-placeholder-label-label">
              </InputLabel>
              <Select
                labelId="demo-simple-select-placeholder-label-label"
                id="demo-simple-select-placeholder-label"
                onChange={handleChange2}
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
                <div style={{ color: "red" }}>   직접입력시 영어/한글 최대 20글자까지 가능합니다 </div>
              </FormHelperText>
            </FormControl>
          </TableCell>
        </TableRow>
        {this.state.text2 === 1 &&
          <TableRow>
            <TableCell colSpan={2}>
              <TextField style={{ width: '400px' }} placeholder="문구를 입력해주세요" onChange={this.countChange2.bind(this)} />

            </TableCell>
          </TableRow>
        }
        <TableRow>
          <TableCell align={"right"}>
            <p className="cakeView_P" >세번째 문구를 <br />선택해 주세요  : </p>
          </TableCell>
          <TableCell>
            <FormControl >
              <InputLabel shrink id="demo-simple-select-placeholder-label-label">
              </InputLabel>
              <Select
                labelId="demo-simple-select-placeholder-label-label"
                id="demo-simple-select-placeholder-label"
                onChange={handleChange3}
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
                <div style={{ color: "red" }}>   직접입력시 영어/한글 최대 20글자까지 가능합니다 </div>
              </FormHelperText>
            </FormControl>
          </TableCell>
        </TableRow>
        {this.state.text3 === 1 &&
          <TableRow>
            <TableCell colSpan={2}>
              <TextField style={{ width: '400px' }} placeholder="문구를 입력해주세요" onChange={this.countChange3.bind(this)} />
            </TableCell>
          </TableRow>
        }

      </>
    )
  }
}

export default lettering3
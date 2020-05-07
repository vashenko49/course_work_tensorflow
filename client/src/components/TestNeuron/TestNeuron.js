import React, { Component } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Container } from '@material-ui/core';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import $ from 'jquery';
import * as tf from '@tensorflow/tfjs';

class TestNeuron extends Component {
  constructor(props) {
    super(props);
    this.state = {
      load: false,
      noSick: [],
      noSickResult: [],
      sick: [],
      sickResult: [],
      RESULT_ANSWER: {
        0: 'Normal',
        1: 'Tuberculosis'
      },
      result: ''
    };
  }

  handleNoSick = e => {
    this.setState({ load: true });
    let file = $('#nosick').prop('files');
    for (let i = 0; i < file.length; i++) {
      let reader = new FileReader();
      reader.onload = () => {
        let k = i;
        let dataURL = reader.result;
        const { noSick } = this.state;
        noSick.push(
          $(document.createElement('img'))
            .attr('src', dataURL)
            .get(0)
        );
        this.setState({ ...this.state, noSick });
        if (k === file.length - 1) {
          this.setState({ load: false });
        }
      };
      reader.readAsDataURL(file[i]);
    }
  };
  handleSick = e => {
    this.setState({ load: true });
    let file = $('#sick').prop('files');
    for (let i = 0; i < file.length; i++) {
      let reader = new FileReader();
      reader.onload = () => {
        let k = i;
        let dataURL = reader.result;
        const { sick } = this.state;
        sick.push(
          $(document.createElement('img'))
            .attr('src', dataURL)
            .get(0)
        );
        this.setState({ ...this.state, sick });
        if (k === file.length - 1) {
          this.setState({ load: false });
        }
      };
      reader.readAsDataURL(file[i]);
    }
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ load: true });

    let model = await tf.loadLayersModel('/model.json');
    const { RESULT_ANSWER, noSick, sick } = this.state;

    for (let i = 0; i < noSick.length; i++) {
      const tensor = tf.browser
        .fromPixels(noSick[i])
        .resizeNearestNeighbor([96, 96])
        .toFloat()
        .div(tf.scalar(255.0))
        .expandDims();

      let top5 = Array.from(model.predict(tensor).dataSync())
        .map(function(p, i) {
          return {
            probability: p,
            className: RESULT_ANSWER[i]
          };
        })
        .sort(function(a, b) {
          return b.probability - a.probability;
        })
        .slice(0, 2);
      const { noSickResult } = this.state;
      noSickResult.push(top5);
      this.setState({ ...this.state, noSickResult });
    }

    for (let i = 0; i < sick.length; i++) {
      const tensor = tf.browser
        .fromPixels(sick[i])
        .resizeNearestNeighbor([96, 96])
        .toFloat()
        .div(tf.scalar(255.0))
        .expandDims();

      let top5 = Array.from(model.predict(tensor).dataSync())
        .map(function(p, i) {
          return {
            probability: p,
            className: RESULT_ANSWER[i]
          };
        })
        .sort(function(a, b) {
          return b.probability - a.probability;
        })
        .slice(0, 2);
      const { sickResult } = this.state;
      sickResult.push(top5);
      this.setState({ ...this.state, sickResult });
    }

    let noSickResultperson = 0;
    const { noSickResult } = this.state;
    for (let i = 0; i < noSickResult.length; i++) {
      if (noSickResult[i][0].className === RESULT_ANSWER[0]) {
        noSickResultperson++;
      }
    }

    noSickResultperson = noSickResultperson / noSickResult.length;

    let sickResultperson = 0;
    const { sickResult } = this.state;
    for (let i = 0; i < sickResult.length; i++) {
      if (sickResult[i][0].className === RESULT_ANSWER[1]) {
        sickResultperson++;
      }
    }

    sickResultperson = sickResultperson / sickResult.length;

    this.setState({ result: (sickResultperson + noSickResultperson) / 2 });

    this.setState({ load: false });
  };

  render() {
    const { handleNoSick, handleSubmit, handleSick } = this;
    const { load, result } = this.state;
    return (
      <Container>
        <ValidatorForm ref="form" onSubmit={handleSubmit} onError={errors => console.log(errors)}>
          <Typography variant={'body1'}>No sick</Typography>
          <input multiple={true} type="file" id="nosick" onChange={handleNoSick} />
          <Typography variant={'body1'}>Sick</Typography>
          <input multiple={true} type="file" id="sick" onChange={handleSick} />
          <Box mt={1}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Analysis
            </Button>
          </Box>
        </ValidatorForm>
        <Typography variant={'body1'}>{result}</Typography>
        <Backdrop className={'preloader-in-front'} open={load}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Container>
    );
  }
}

export default TestNeuron;

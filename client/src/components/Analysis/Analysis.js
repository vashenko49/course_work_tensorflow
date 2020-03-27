import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import * as tf from '@tensorflow/tfjs';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Box from '@material-ui/core/Box';
import './Analysis.scss';
import $ from 'jquery';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

class Analysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isImg: true,
      load: false,
      result: [],
      TARGET_CLASSES: {
        0: 'Normal',
        1: 'Tuberculosis'
      }
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ load: true });

    let model = await tf.loadLayersModel('/model.json');

    const { TARGET_CLASSES } = this.state;

    const image = $('#selected-image').get(0);

    const tensor = tf.browser
      .fromPixels(image)
      .resizeNearestNeighbor([96, 96])
      .toFloat()
      .div(tf.scalar(255.0))
      .expandDims();

    let predictions = await model.predict(tensor).data();

    let top5 = Array.from(predictions)
      .map(function(p, i) {
        return {
          probability: p,
          className: TARGET_CLASSES[i]
        };
      })
      .sort(function(a, b) {
        return b.probability - a.probability;
      })
      .slice(0, 2);

    this.setState({
      result: top5,
      load: false
    });
  };

  handleNewPhoto = () => {
    let reader = new FileReader();
    reader.onload = () => {
      let dataURL = reader.result;
      $('#selected-image').attr('src', dataURL);
      $('#prediction-list').empty();
      this.setState({ isImg: false });
    };

    let file = $('#image-selector').prop('files')[0];
    reader.readAsDataURL(file);
  };

  render() {
    const { handleSubmit, handleNewPhoto } = this;
    const { result, load, isImg } = this.state;
    return (
      <Container>
        <Typography variant={'h3'}>Upload your fluorography and get an answer</Typography>
        <ValidatorForm ref="form" onSubmit={handleSubmit} onError={errors => console.log(errors)}>
          <div>
            <Box>
              <input
                multiple
                className="upload-avatar"
                onChange={event => {
                  handleNewPhoto(event);
                }}
                id="image-selector"
                name="fluorography"
                type="file"
              />
              <img id="selected-image" className="ml-3" width="250" alt="" />
              <label htmlFor="image-selector">
                <Button fullWidth variant="contained" color="primary" component="span">
                  Upload fluorography
                </Button>
              </label>
            </Box>
          </div>
          <Box mt={1}>
            <Button disabled={isImg} type="submit" fullWidth variant="contained" color="primary">
              Analysis
            </Button>
          </Box>
          {result.length > 0 &&
            result.map(element => {
              const { probability, className } = element;
              return (
                <Typography
                  key={probability}
                  variant={'body2'}
                >{`Probability ${probability}, className ${className}`}</Typography>
              );
            })}
        </ValidatorForm>
        <Backdrop className={'preloader-in-front'} open={load}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Container>
    );
  }
}

export default Analysis;

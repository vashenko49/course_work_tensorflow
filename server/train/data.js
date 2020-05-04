const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const path = require('path');

const TRAIN_IMAGES_DIR = './data/train';
const TEST_IMAGES_DIR = './data/test';

const loadImages =(dataDir) => {
    const images = [];
    const labels = [];

    let files = fs.readdirSync(path.resolve(__dirname, dataDir));
    for (let i = 0; i < files.length; i++) {
        if (!files[i].toLocaleLowerCase().endsWith(".png")) {
            continue;
        }

        let filePath = path.resolve(__dirname, dataDir, files[i]);

        let buffer = fs.readFileSync(filePath);
        let imageTensor = tf.node.decodeImage(buffer).resizeNearestNeighbor([96,96]).toFloat().div(tf.scalar(255.0)).expandDims();
        images.push(imageTensor);

        let hasTuberculosis = files[i].toLocaleLowerCase().endsWith("_1.png");
        labels.push(hasTuberculosis ? 1 : 0);
    }

    return [images, labels];
}

class TuberculosisData {
    constructor() {
        this.trainData = [];
        this.testData = [];
    }

    loadData() {
        console.log('Loading images...');
        this.trainData = loadImages(TRAIN_IMAGES_DIR);
        this.testData = loadImages(TEST_IMAGES_DIR);
        console.log('Images loaded successfully.')
    }

    getTrainData() {
        return {
            images: tf.concat(this.trainData[0]),
            labels: tf.oneHot(tf.tensor1d(this.trainData[1], 'int32'), 2).toFloat()
        }
    }

    getTestData() {
        return {
            images: tf.concat(this.testData[0]),
            labels: tf.oneHot(tf.tensor1d(this.testData[1], 'int32'), 2).toFloat()
        }
    }
}

module.exports = new TuberculosisData();

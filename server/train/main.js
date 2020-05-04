const data = require('./data');
const model = require('./model');

module.exports = async (epochs, batchSize, modelSavePath) => {
    data.loadData();
    const {images: trainImages, labels: trainLabels} = data.getTrainData();
    model.summary();
    const validationSplit = 0.15;
    await model.fit(trainImages, trainLabels, {
        epochs, batchSize, validationSplit
    });

    const {images: testImages, labels: testLabels} = data.getTestData();
    const evalOutput = model.evaluate(testImages, testLabels);

    console.log(`Loss = ${evalOutput[0].dataSync()[0].toFixed(3)}; Accuracy = ${evalOutput[1].dataSync()[0].toFixed(3)}`);

    if (modelSavePath != null) {
        await model.save(`file://${modelSavePath}`);
        console.log(`Saved to path: ${modelSavePath}`);
    }
};

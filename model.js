// const fs = require('fs');
// const tf = require('@tensorflow/tfjs');
// const axios = require('axios');
// const cheerio = require('cheerio');
// const csv = require('csv-parser');


// async function compareHtmlText(url) {
//   try {
//     // Fetch HTML content

//     function preprocessText(text) {
//       // Tokenization (splitting into words)
//       const tokens = text.split(/\s+/);
    
//       // Lowercasing
//       const lowercasedTokens = tokens.map(token => token.toLowerCase());
    
//       // Join the tokens back into a single string
//       const processedText = lowercasedTokens.join(' ');
    
//       return processedText;
//     }
    
//     const response = await axios.get(url);
//     const htmlContent = response.data;

//     // Parse HTML
//     const $ = cheerio.load(htmlContent);

//     // Preprocess text line-by-line
//     const results = [];
//     $('body').text().split('\n').forEach((line) => {
//       const processedLine = preprocessText(line);

//       // Create a tensor for the processed line
//       // const inputTensor = tf.tensor2d([processedLine], [1, processedLine.length]); // Correct
//       const inputTensor = tf.tensor2d(data, [100, 500]);


      
//       // Make predictions
//       const prediction = model.predict(inputTensor);
//       const result = prediction.dataSync()[0] > 0.5 ? 'Match found!' : 'No match found.';

//       // Store results
//       results.push({ line: line, prediction: result });
//     });

//     return results;
//   } catch (error) {
//     console.error("Error comparing HTML text:", error);
//     // Handle errors gracefully, e.g., return an error message or empty results
//     return []; // Example of returning empty results on error
//   }
// }

// // Load CSV data
// const csvData = [];
// fs.createReadStream('dataFinal.csv')
//   .pipe(csv())
//   .on('data', (row) => {
//     csvData.push(row);
//   })
//   .on('end', async () => {
//     // Load XLSX data (example using a suitable library)
//     const xlsxData = await readXlsxFile('data.xlsx');

//     // Combine and preprocess data (adjust based on your data format and model requirements)
//     const combinedData = [...csvData, ...xlsxData];
//     const preprocessedData = combinedData.map(preprocessRow); // Implement preprocessRow function

//     // Extract features and labels
//     const features = preprocessedData.map(row => row.features);
//     const labels = preprocessedData.map(row => row.label);

//     // Train the model (code provided in previous response)
//     const model = createModel();
//     trainModel(model, features, labels);
//   });


// compareHtmlText('https://www.youtube.com/results?search_query=sandeep+maheshwari');



async function compareHtmlText(url) {
  const fs = require('fs');
  const tf = require('@tensorflow/tfjs');
  const axios = require('axios');
  const cheerio = require('cheerio');
  const csv = require('csv-parser');
  
  // Load the CSV data
  const csvData = [];
  fs.createReadStream('dataFinal.csv')
    .pipe(csv())
    .on('data', (row) => {
      // Print the row to check the data
      console.log(row);
  
      // Push the row to the csvData array
      csvData.push(row);
    })
    .on('end', () => {
      // Preprocess the data
      const labels = csvData.map((row) => row.label === '1' ? 1 : 0);
      const features = csvData.map((row) => preprocessText(row.text));
  
      // Create and train the model
      const model = createModel();
      trainModel(model, features, labels);
  
      // Use the model to predict
      const url = url; // Replace with the URL you want to check
      predictFromUrl(model, url);
    });
  
  // Function to preprocess text data
  
  // Function to preprocess text data
  function preprocessText(text) {
    // Tokenization (splitting into words)
    const tokens = text.split(/\s+/);
  
    // Lowercasing
    const lowercasedTokens = tokens.map(token => token.toLowerCase());
  
    // Join the tokens back into a single string
    const processedText = lowercasedTokens.join(' ');
  
    return processedText;
  }
  
  
  // Function to create a simple neural network model
  function createModel() {
    const model = tf.sequential();
    model.add(tf.layers.dense({ inputShape: [10000], units: 1, activation: 'sigmoid' }));
    model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });
    return model;
  }
  
  // Function to train the model
  // Function to train the model
  // Function to train the model
  function trainModel(model, features, labels) {
    if (!features || features.length === 0 || !features[0]) {
      console.error('Invalid features array:', features);
      return;
    }
  
    // Determine the input shape based on the length of features[0]
    const inputShape = [features[0].length];
  
    if (!inputShape[0]) {
      console.error('Invalid input shape:', inputShape);
      return;
    }
  
    // Convert features and labels to tensors
    const xs = tf.tensor2d(features, [features.length, inputShape[0]]);
    const ys = tf.tensor1d(labels);
  
    // Train the model
    model.fit(xs, ys, {
      epochs: 10,
      shuffle: true,
      callbacks: {
        onEpochEnd: (epoch, logs) => console.log(`Epoch ${epoch + 1} - loss: ${logs.loss}, accuracy: ${logs.acc}`),
      },
    });
  }
  
  
  
  
  
  // Function to predict whether HTML content matches any line in datafinal.csv
  async function predictFromUrl(model, url) {
    try {
      const response = await axios.get(url);
      const htmlContent = response.data;
      
      // Extract text or features from the HTML content (preprocess if needed)
      const features = preprocessText(htmlContent);
  
      // Convert the features to a tensor
      const inputTensor = tf.tensor2d([features]);
  
      // Make predictions
      const prediction = model.predict(inputTensor);
      const result = prediction.dataSync()[0] > 0.5 ? 'Match found!' : 'No match found.';
  
      console.log(result);
    } catch (error) {
      console.error('Error fetching or processing HTML content:', error.message);
    }
  }
  
}



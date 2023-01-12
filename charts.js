function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
   
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// Deliverable 1: 1. Create the buildChart function.
function buildCharts(sample) {
  // Deliverable 1: 2. Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Deliverable 1: 3. Create a variable that holds the samples array. 
    ///MC ADDITION
    var samplesArray = [data]
    // Deliverable 1: 4. Create a variable that filters the samples for the object with the desired sample number.
    ///MC ADDITION
    var filteredSamples = data.samples.filter(sampleObj => sampleObj.id == sample)
    
    // Deliverable 3: 1. Create a variable that filters the metadata array for the object with the desired sample number.
    ///MC ADDITION
    var filteredMeta = data.metadata.filter(sampleObj => sampleObj.id == sample)

    // Deliverable 1: 5. Create a variable that holds the first sample in the array.
    ///MC ADDITION
    var chart1 = samplesArray[0];

    // Deliverable 3: 2. Create a variable that holds the first sample in the metadata array.
    ///MC ADDITION
    var meta1 = filteredMeta[0];

    // Deliverable 1: 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    ///MC ADDITION
    var otu_ids = samplesArray.map(function(otu_ids));

    var otu_labels = samplesArray.map(function(otu_labels));

    var sample_values = samplesArray.map(function(sample_values));



    // Deliverable 3: 3. Create a variable that holds the washing frequency.
    ///MC ADDITION
    var wfreq  = samplesArray.map(function(wfreq));

    // Deliverable 1: 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order 
    // so the otu_ids with the most bacteria are last. 
    ///MC ADDITION
    var yticks = [
      var otu_ids_Sort = [data.samples.otu_ids];
      sortedAge = otu_ids_Sort.sort((a,b) => b - a);
    ];

    // Deliverable 1: 8. Create the trace for the bar chart. 
    ///MC ADDITION
    var barData = [
      x: [ ],
      y: [ ],
      type: "bar"
    ];

    // Deliverable 1: 9. Create the layout for the bar chart. 
    ///MC ADDITION
    var barLayout = {
      title: "'Bar' Chart",
      xaxis: { title: "Drinks"},
      yaxis: { title: "% of Drinks Ordered"}
    };

    // Deliverable 1: 10. Use Plotly to plot the data with the layout. 
    ///MC ADDITION
    Plotly.newPlot("plot", barData, barLayout);

    // Deliverable 2: 1. Create the trace for the bubble chart.
    ///MC ADDITION
    var bubbleData = [
      x: [ ],
      y: [ ],
      type: "markers",
      marker: {
        size: [ 40, 60, 80, 100]
      }
    ];

    // Deliverable 2: 2. Create the layout for the bubble chart.
    ///MC ADDITION
    var bubbleLayout = {
      title: "'Bubble' Chart",
      showlegend: false,
      height: 600,
      width: 600;
    };

    // Deliverable 2: 3. Use Plotly to plot the data with the layout.
    ///MC ADDITION
    Plotly.newPlot("plot", bubbleData, bubbleLayout);

    // Deliverable 3: 4. Create the trace for the gauge chart.
    ///MC ADDITION
    var gaugeData = [ 
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: 270,
        title: { text: "Rate" },
        type: "indicator",
        mode: "gauge+number"
      }
    ];

    // Deliverable 3: 5. Create the layout for the gauge chart.
    ///MC ADDITION
    var gaugeLayout = { width: 600, height: 500, margin: { t: 0, b: 0 } };

    // Deliverable 3: 6. Use Plotly to plot the gauge data and layout.
    ///MC ADDITION
    Plotly.newPlot('plot', gaugeData, gaugeLayout);

  });
}

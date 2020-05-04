function getPlots(id) {
    //Read samples.json
        d3.json("samples.json").then (sampledata =>{
            console.log(sampledata)
            var ids = sampledata.samples[0].otu_ids;
            console.log(ids)
            var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();
            console.log(sampleValues)
            var labels =  sampledata.samples[0].otu_labels.slice(0,10);
            console.log (labels)
        // Select only top 10 otu ids for the plot OTU and reversing it. 
            var OTU_top = ( sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
        // Select otu_id's to the chosen form for the plot.
            var OTU_id = OTU_top.map(d => "OTU " + d);
            console.log(`OTU IDS: ${OTU_id}`)
         // Display the top 10 labels for the plot.
            var labels =  sampledata.samples[0].otu_labels.slice(0,10);
            console.log(`OTU_labels: ${labels}`)
            var trace = {
                x: sampleValues,
                y: OTU_id,
                text: labels,
                marker: {
                color: 'blue'},
                type:"bar",
                orientation: "h",
            };
            // Create the data variable
            var data = [trace];
    
            // Create the layout variable to set layout plots. 
            var layout = {
                title: "Top 10 OTU",
                yaxis:{
                    tickmode:"linear",
                },
                margin: {
                    l: 100,
                    r: 100,
                    t: 100,
                    b: 30
                }
            };
    
            // Create bar plot.
        Plotly.newPlot("bar", data, layout);
            // Bubble Chart
            var trace1 = {
                x: sampledata.samples[0].otu_ids,
                y: sampledata.samples[0].sample_values,
                mode: "markers",
                marker: {
                    size: sampledata.samples[0].sample_values,
                    color: sampledata.samples[0].otu_ids
                },
                text:  sampledata.samples[0].otu_labels
    
            };
    
            //Set layout for the bubble plot
            var layout_2 = {
                xaxis:{title: "OTU ID"},
                height: 600,
                width: 1000
            };
    
            // Create data variable 
            var data1 = [trace1];
    
        // Create bubble plot
        Plotly.newPlot("bubble", data1, layout_2); 
        
        });
    }  
    // Create a function to obtain the necessary data.
    function getDemoInfo(id) {
    // Read json file to extract data
        d3.json("samples.json").then((data)=> {
    //Obtain metadata info for the demographic panel.
            var metadata = data.metadata;
    
            console.log(metadata)
    
          //Filter each meta data info by id
           var result = metadata.filter(meta => meta.id.toString() === id)[0];
          //Select demographic panel to put into the data.
           var demographicInfo = d3.select("#sample-metadata");
            
         // Clear the demographic info panel each time before extracting new id info,
           demographicInfo.html("");
    
         // Grab the necessary demographic data for the id and append the information into the panel
            Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
        });
    }
    // Create a function to change event.
    function optionChanged(id) {
        getPlots(id);
        getDemoInfo(id);
    }
    
    // Create a function for initial data rendering.
    function init() {
        // Select dropdown menu: 
        var dropdown = d3.select("#selDataset");
    
        //Read the data. 
        d3.json("samples.json").then((data)=> {
            console.log(data)
    
            // Obtain id data to place into the dropdown menu.
            data.names.forEach(function(name) {
                dropdown.append("option").text(name).property("value");
            });
    
            //Call the functions to display the data and plots to the page. 
            getPlots(data.names[0]);
            getDemoInfo(data.names[0]);
        });
    }
    
    init();
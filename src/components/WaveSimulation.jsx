import { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import ControlledInput from './ControlledInput';

const WaveSimulation = () => {
    const [animationFrame, setAnimationFrame] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(updateWaveData, 1000 / 30); // Set the desired frame rate by changing the number (30 FPS in this example)
      
        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, [animationFrame]);

    // Define state variables and their setters
    const [params, setParams] = useState({
        frequencyP: 1,
        amplitudeP: 1,
        frequencyS: 2,
        amplitudeS: 0.5,
    });

    // Function to handle input change
    const handleInputChange = (e) => {
        setParams({
        ...params,
        [e.target.name]: e.target.value,
        });
    };

    const updateWaveData = () => {
        // Update wave data based on the current animation frame
        // You can use the animationFrame variable to calculate the new wave data
        
        // Increment the animation frame
        setAnimationFrame((prevFrame) => (prevFrame + 1) % 100); // Set the desired frame rate by changing the number in the modulo operation
    };

    // Calculate wave data for Plotly
    const xValues = Array.from({ length: 500 }, (_, i) => i);
    const yValuesP = xValues.map((i) => params.amplitudeP * Math.sin(params.frequencyP * i));
    const yValuesS = xValues.map((i) => params.amplitudeS * Math.sin(params.frequencyS * i));

    const waveDataP = {
        x: xValues,
        y: yValuesP,
        type: 'scatter',
        mode: 'lines',
        name: 'Onda P',
    };

    const waveDataS = {
        x: xValues,
        y: yValuesS,
        type: 'scatter',
        mode: 'lines',
        name: 'Onda S',
    };

    return (
        <article className='division'>
            <section className='inputs'>
                <ControlledInput
                    name="frequencyP"
                    value={params.frequencyP}
                    onChange={handleInputChange}
                    unit="Hz"
                    label="Frequency P (Hz)"
                />
                <ControlledInput
                    name="amplitudeP"
                    value={params.amplitudeP}
                    onChange={handleInputChange}
                    unit="a.u."
                    label="Amplitude P (a.u.)"
                />
                <ControlledInput
                    name="frequencyS"
                    value={params.frequencyS}
                    onChange={handleInputChange}
                    unit="Hz"
                    label="Frequency S (Hz)"
                />
                <ControlledInput
                    name="amplitudeS"
                    value={params.amplitudeS}
                    onChange={handleInputChange}
                    unit="a.u."
                    label="Amplitude S (a.u.)"
                />
            </section> 

            <Plot
                data={[waveDataP, waveDataS]}
                layout={layout}
                frames={[
                  { data: [waveDataP, waveDataS], name: animationFrame.toString() }
                ]}
                config={{
                  displayModeBar: false,
                  staticPlot: true,
                  scrollZoom: false,
                  doubleClick: false,
                  displaylogo: false,
                  modeBarButtonsToRemove: ['toImage', 'zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d']
                }}
            />
        </article>
    );
};

const layout = {
    title: 'Seismic Waves',
    xaxis: {
      title: 'Time (s)',
      showgrid: false,
      zeroline: false,
      showline: false,
      autotick: true,
      ticks: 'outside',
      ticklen: 5,
      tickwidth: 2,
      tickcolor: 'black'
    },
    yaxis: {
      title: 'Amplitude',
      showgrid: false,
      zeroline: false,
      showline: false,
      autotick: true,
      ticks: 'outside',
      ticklen: 5,
      tickwidth: 2,
      tickcolor: 'black'
    },
    margin: {
      l: 60,
      r: 0,
      b: 50,
      t: 50,
      pad: 4
    },
    showlegend: false,
    plot_bgcolor: 'rgba(0,0,0,0)',
    paper_bgcolor: 'rgba(0,0,0,0)'
  };

export default WaveSimulation;
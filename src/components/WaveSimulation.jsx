import { useState } from 'react';
import Plot from 'react-plotly.js';
import ControlledInput from './ControlledInput';

const WaveSimulation = () => {
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
            [e.target.name]: e.target.value
        });
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
                    label="Frequencia P (Hz)"
                />
                <ControlledInput
                    name="amplitudeP"
                    value={params.amplitudeP}
                    onChange={handleInputChange}
                    unit="a.u."
                    label="Amplitud P (a.u.)"
                />
                <ControlledInput
                    name="frequencyS"
                    value={params.frequencyS}
                    onChange={handleInputChange}
                    unit="Hz"
                    label="Frequencia S (Hz)"
                />
                <ControlledInput
                    name="amplitudeS"
                    value={params.amplitudeS}
                    onChange={handleInputChange}
                    unit="a.u."
                    label="Amplitud S (a.u.)"
                />
            </section> 

            <Plot 
                data={[waveDataP, waveDataS]} 
                layout={layout} 
            />
        </article>
    );
};

const layout = {
    title: 'Ondas sismicas',
    xaxis: {
        title: 'Tiempo (s)',
        showgrid: false,
        zeroline: false,
        showline: false,
        autotick: true,
        ticks: 'outside',
        ticklen: 5,
        tickwidth: 2,
    },
    yaxis: {
        title: 'Amplitud (Hz)',
        zeroline: false,
        showline: false,
        autotick: true,
        ticks: 'outside',
        ticklen: 5,
        tickwidth: 2,
    },
    margin: {
        l: 50,
        r: 0,
        b: 50,
        t: 30,
        pad: 4
    },
    plot_bgcolor: 'rgba(0,0,0,0)',
    paper_bgcolor: 'rgba(0,0,0,0)',
    width: 800, 
    height: 600
};

export default WaveSimulation;
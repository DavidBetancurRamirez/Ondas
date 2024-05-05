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
        [e.target.name]: e.target.value,
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
                layout={{ width: 800, height: 600 }} 
            />
        </article>
    );
};

export default WaveSimulation;
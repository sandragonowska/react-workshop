import React, { useState } from 'react';

interface ValueProps {
    id: string;
    title: string;
    value: number | null;
    unit: string;
}

function ClimateValues({ id, title, value, unit }: ValueProps) {
    const [minimum, setMinimum] = useState<number | null>(null);
    const [maximum, setMaximum] = useState<number | null>(null);

    if (value !== null) {
        if (minimum === null || value < minimum) {
            setMinimum(value);
        }
        if (maximum === null || value > maximum) {
            setMaximum(value);
        }
    }

    function reset() {
        setMinimum(value);
        setMaximum(value);
    }

    return (
        <div id={id} data-testid={id}>
            <h2>{title}</h2>
            <ul>
            <ListEntry
                    id={id}
                    title="Current"
                    unit={unit}
                    value={value}
                ></ListEntry>
                <ListEntry
                    id={id}
                    title="Minimum"
                    unit={unit}
                    value={minimum}
                ></ListEntry>
                <ListEntry
                    id={id}
                    title="Maximum"
                    unit={unit}
                    value={maximum}
                ></ListEntry>
            </ul>
            <button onClick={reset}>Reset</button>
        </div>
    );
}

function ListEntry({ id, title, value, unit }: ValueProps) {
    const formattedValue = value
        ? `${Math.round(value * 10) / 10}${unit}`
        : '-';

    return <li data-testid={`${id}-${title.toLowerCase()}`}>
                <strong>{title}:</strong> {formattedValue}
           </li>
}

export default ClimateValues;
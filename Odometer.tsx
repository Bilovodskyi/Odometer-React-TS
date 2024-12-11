import React, { useState } from "react";
import "./Odometer.css";

interface OdometerProps {
    start: number;
    end: number;
    height: number;
    width: number;
    labelText?: string | undefined;
    labelSize?: number | undefined;
}

const Odometer: React.FC<OdometerProps> = ({
    start,
    end,
    height,
    width,
    labelText,
    labelSize,
}) => {
    const [hovered, setHovered] = useState(false);
    const startArray = Array.from(String(start), String);
    const endArray = Array.from(String(end), String);
    if (startArray.length > endArray.length) {
        endArray.unshift(
            ...new Array(startArray.length - endArray.length).fill("-1")
        );
    } else if (startArray.length < endArray.length) {
        startArray.unshift(
            ...new Array(endArray.length - startArray.length).fill("-1")
        );
    }

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    return (
        <div
            className="odometer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            {labelText && (
                <h1 style={{ fontSize: `${labelSize}px` }}>{labelText}</h1>
            )}
            <div className="flex">
                {startArray.map((startDigit, index) => (
                    <div
                        key={index}
                        className="odometer-digit"
                        style={{
                            width: `${width}px`,
                            height: `${height}px`,
                        }}>
                        <div
                            className="odometer-digit-inner"
                            style={{
                                transform: `translateY(-${
                                    hovered
                                        ? (parseInt(startDigit) + 1) * height
                                        : (parseInt(endArray[index]) + 1) *
                                          height
                                }px)`,
                            }}>
                            {[" ", ...Array.from(Array(10).keys(), String)].map(
                                (digit) => (
                                    <span
                                        style={{
                                            height: `${height}px`,
                                            lineHeight: `${height}px`,
                                            fontSize: `${height}px`,
                                        }}
                                        key={digit}>
                                        {digit}
                                    </span>
                                )
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Odometer;

import React from 'react';
import './Palette.css';

const Palette = ({ colors, selected, onSelect }) => {
    const colorList = colors.map(
        (color) => (<Color color={color} active={selected === color} onClick={() => onSelect(color)} />)
    )
    return (
        <div className="palette">
            {colorList}
        </div>
    );
};

const Color = ({ color, active, onClick }) => {
    return (
        <div className={`color ${active && 'active'}`} style={{ backgroundColor: color }} onClick={onClick}></div>
    )
}

export default Palette;
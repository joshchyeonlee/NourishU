import React from 'react'
import { useState } from 'react'
import { Typography, Button } from '@mui/material';

const TestComponent = (() => {
    const [buttonNumber, setButtonNumber] = useState(0);

    const handleUpdateButton = () => {
        setButtonNumber(buttonNumber+1);
    }

    return (
        <div>
            <Typography>Ayo press me to see the number go up</Typography>
            <Button variant="outlined" onClick={handleUpdateButton}>{buttonNumber}</Button>
        </div>
    );
})

export default TestComponent
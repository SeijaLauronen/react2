import React from 'react';
function ErrorTest({ param1 }) {
    if (param1 > 1) {
        throw new Error('Enemmän kuin 1')
    }
    return (
        <div>
            {param1}
        </div>
    )
}

export default ErrorTest
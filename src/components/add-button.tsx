import React, { useContext } from 'react';

import { MatrixContext } from '../context/matrix-context';

const AddRowButton: React.FC = () => {
    const { addRow } = useContext(MatrixContext);

    return (
        <button className='add-button' onClick={addRow}>Add New Row +</button>
    );
};

export default AddRowButton;
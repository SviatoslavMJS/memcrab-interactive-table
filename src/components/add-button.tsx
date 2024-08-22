import React, { useContext } from 'react';

import { MatrixContext } from '../context/matrix-context';

const AddRowButton: React.FC = () => {
    const { addRow } = useContext(MatrixContext);

    return (
        <button onClick={addRow}>Add Row</button>
    );
};

export default AddRowButton;
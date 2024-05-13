import React from 'react';
import styled from 'styled-components';

// Definindo o estilo do componente
const ScoreCounterWrapper = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
`;

// Definindo a interface das props
interface ScoreCounterProps {
    score: number;
}

// Componente do contador de pontos
export const ScoreCounter: React.FC<ScoreCounterProps> = ({ score }) => {
    return (
        <ScoreCounterWrapper>
            Score: {score}
        </ScoreCounterWrapper>
    );
};
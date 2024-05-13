import styled from 'styled-components';

// Componente da Barra de Progresso
const ProgressBar = styled.div`
    width: 100%;
    height: 20px;
    background-color: #f0f0f0;
    border-radius: 10px;
    margin-bottom: 10px;
`;

// Componente da Barra de Vida (que pode mudar de cor dependendo do valor)
const LifeBar = styled.div`
    height: 100%;
    border-radius: 10px;
    transition: all 0.3s ease;
    background-color: ${props => {
        // Aqui você pode definir a lógica para mudar a cor da barra de vida com base no valor
        if (props.value >= 70) {
            return 'green';
        } else if (props.value >= 30) {
            return 'orange';
        } else {
            return 'red';
        }
    }};
`;

// Componente da Barra de Vida
export const LifeProgressBar = ({ widthValue,value }) => {
    return (
        <ProgressBar style={{ width: `${widthValue}` }} >
            <LifeBar value={value} style={{ width: `${value}%` }} />
        </ProgressBar>
    );
};
import { CircularProgress } from '@mui/material';
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    flex: 1;
    min-height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    flex-direction: column;
    padding: 16px;
    border: 2px dashed ${({ theme }) => theme.yellow};
    color: ${({ theme }) => theme.arrow + 80};
    border-radius: 20px;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 24px;
    background: ${({ theme }) => theme.black + 50};
    box-shadow: 1px 2px 30px 8px ${({ theme }) => theme.white + 60};
    transition: all 0.3s ease;
    cursor: pointer;
    &:hover {
        box-shadow: 1px 2px 12px 8px ${({ theme }) => theme.white + 80};
        scale: 1.05;
    }
`;

function GeneratedImageCard({ src, loading }) {
    return (
        <Container>
            {loading ?
                <>
                    <CircularProgress style={{ color: 'inherit', width: '24px', height: '24px' }} />
                    Generating Your Image . . .
                </> :
                <>
                    {
                        src ? <Image src={src} /> : 'Write a prompt to Generate Image'
                    }
                </>
            }
        </Container>
    )
}

export default GeneratedImageCard
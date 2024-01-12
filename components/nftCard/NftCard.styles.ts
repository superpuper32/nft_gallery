import styled from 'styled-components';
import Image from "next/image";

export const NftCardDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 25%;
`;

export const StyledImage = styled(Image)`
    object-fit: cover;
    width: 100%;
    border-top-left-radius: 0.375rem;
    border-top-right-radius: 0.375rem;
`;

export const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
    padding: 0.75rem 0.5rem;
    background-color: rgb(241 245 249);
    border-bottom-right-radius: 0.375rem;
    border-bottom-left-radius: 0.375rem;
`;

export const StyledRoundedDiv = styled.div`
    border-radius: 0.375rem;
`;

export const StyledInnerDiv = styled.div`
    flex-grow: 1;
    margin-top: 0.5rem;
`;

export const StyledH2 = styled.h2`
    font-size: 1.25rem;
    line-height: 1.75rem;
    color: rgb(17 24 39);
`;

export const StyledParagraph = styled.p`
    color: rgb(75 85 99);
`;
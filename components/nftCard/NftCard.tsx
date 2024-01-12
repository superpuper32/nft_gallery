import React from "react";
import Image from "next/image";

import {
    NftCardDiv,
    StyledImage,
    StyledDiv,
    StyledRoundedDiv,
    StyledInnerDiv,
    StyledH2,
    StyledParagraph,
} from './NftCard.styles.ts';

type MediaType = {
    gateway: string;
}

type NFTCardPropsType = {
    nft: {
        title: string;
        media: MediaType[];
        id: {
            tokenId: string;
        },
        contract: {
            address: string;
        },
        description: string;
    }
}

export const NFTCard: React.FC<NFTCardPropsType> = ({ nft }) => {

    return (
        <NftCardDiv>
            <StyledRoundedDiv>
                <StyledImage
                  src={nft.media[0].gateway}
                  alt={""}
                  width={300}
                  height={300}
                />
            </StyledRoundedDiv>

            <StyledDiv>
                <div>
                    <StyledH2>{nft.title}</StyledH2>
                    <StyledParagraph>Id: {nft.id.tokenId}</StyledParagraph>
                    <StyledParagraph>{nft.contract.address}</StyledParagraph>
                </div>

                <StyledInnerDiv>
                    <StyledParagraph>{nft.description}</StyledParagraph>
                </StyledInnerDiv>
            </StyledDiv>
        </NftCardDiv>
    )
}

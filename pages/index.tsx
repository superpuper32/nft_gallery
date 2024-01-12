import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styled from 'styled-components';

import { NFTCard } from "../components/nftCard/NftCard"

const inter = Inter({ subsets: ['latin'] })

const MainComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  row-gap: 0.75rem;
`;

const StyledComponent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  row-gap: 0.5rem;
`;

const StyledInput = styled.input`
  width: 40%;
  background-color: rgb(241 245 249);
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: rgb(31 41 55);
  &:focus {
    outline-color: #93c5fd;
  }
  &:disabled {
    background-color: rgb(248 250 252);
    color: rgb(249 250 251);
  }
`;

const StyledLable = styled.label`
  color: rgb(75 85 99);
`;

const StyledButton = styled.button`
  color: rgb(255 255 255);
  background-color: rgb(96 165 250);
  padding: 1rem 0.5rem;
  margin-top: 0.75rem;
  border-radius: 0.125rem;
  width: 20%;
  &:disabled {
    background-color: rgb(248 250 252);
  }
`;

const StyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  row-gap: 3rem;
  margin-top: 1rem;
  width: 83.333333%;
  column-gap: 0.5rem;

`;

export default function Home() {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [fetchForCollection, setFetchForCollection]=useState(false);

  const handleWalletAddressInput = (e: React.FormEvent<HTMLInputElement>) => setWalletAddress(e.currentTarget.value);
  const handleCollectionAddressInput = (e: React.FormEvent<HTMLInputElement>)=> setCollectionAddress(e.currentTarget.value);

  const fetchNFTs = async() => {
    let nfts; 
    console.log("fetching nfts");
    const api_key = process.env.API_KEY;
    const baseURL = `https://polygon-mumbai.g.alchemy.com/nft/v2/${api_key}/getNFTs/`;
    const requestOptions = { method: 'GET' };
    
    if (!collection.length) {
    
      const fetchURL = `${baseURL}?owner=${wallet}`;

      nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    } else {
      console.log("fetching nfts for collection owned by address")
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      nfts= await fetch(fetchURL, requestOptions).then(data => data.json())
    }

    if (nfts) {
      console.log("nfts:", nfts)
      setNFTs(nfts.ownedNfts)
    }
  };

  const fetchNFTsForCollection = async () => {
  if (collection.length) {
    var requestOptions = {
      method: 'GET'
    };
    const api_key = process.env.API_KEY;
    const baseURL = `https://polygon-mumbai.g.alchemy.com/v2/${api_key}/getNFTsForCollection/`;
    const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
    const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    if (nfts) {
      console.log("NFTs in collection:", nfts)
      setNFTs(nfts.nfts)
    }
  }
}

  return (
    <>
      <MainComponent>
        <StyledComponent>
          <StyledInput
            onChange={handleWalletAddressInput}
            value={wallet}
            type={"text"}
            placeholder="Add your wallet address"
          ></StyledInput>

          <StyledInput
            onChange={handleCollectionAddressInput}
            value={collection}
            type={"text"}
            placeholder="Add the collection address"
          ></StyledInput>

          <StyledLable>
            <input type={"checkbox"} onChange={(e)=>{setFetchForCollection(e.target.checked)}}></input>
            Fetch for collection
          </StyledLable>

          <StyledButton
            onClick={() => {
              if (fetchForCollection) {
                fetchNFTsForCollection()
              }else fetchNFTs()
            }}
          >
            Let&apos;s go!
          </StyledButton>
          <StyledDiv>
            {
              NFTs.length && NFTs.map((nft, id) => {
                return (
                  <NFTCard key={id} nft={nft}></NFTCard>
                );
              })
            }
          </StyledDiv>
        </StyledComponent>
      </MainComponent>
    </>
  )
}
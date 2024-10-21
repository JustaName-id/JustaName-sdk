// import { useAllNFTSForCurrentAddress } from '@query/api/nft';
import { AddIcon, Avatar, Button, Flex, MinusIcon, P, PenIcon } from '@justweb3/ui';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';
import React from 'react';
import styled from 'styled-components';
import { useUploadToCdn } from '../../query/api';
import { ResponsiveDiv } from '../BannerSelectorDialog';
import { DefaultDialog } from '../DefaultDialog';

export interface AvatarEditorDialogProps {
  onImageChange: (image: string) => void;
  avatar: string;
  subname: string
  address?: `0x${string}`;
}

export const SliderInput = styled.input.attrs({ type: 'range' })`
  width: 100%;
  height: 0.5rem;
  background-color: #bfdbfe;
  border-radius: 0.5rem;
  appearance: none;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  /* Slider thumb styling */
  &::-webkit-slider-thumb {
    appearance: none;
    width: 1rem;
    height: 1rem;
    background-color: #2563eb;
    border-radius: 50%;
    cursor: pointer;
    margin-top: -0.25rem;
  }

  &::-moz-range-thumb {
    width: 1rem;
    height: 1rem;
    background-color: #2563eb;
    border: none;
    border-radius: 50%;
    cursor: pointer;
  }

  &::-ms-thumb {
    width: 1rem;
    height: 1rem;
    background-color: #2563eb;
    border: none;
    border-radius: 50%;
    cursor: pointer;
  }

  &::-webkit-slider-runnable-track {
    height: 0.5rem;
    background: transparent;
    border-radius: 0.5rem;
  }
`;

// const NFTCardWrapper = styled.div`
//   display: grid;
//   grid-template-columns: repeat(12, 1fr);
//   gap: 1rem;
// `;

// const NFTCard = styled.div<{ isSelected: boolean }>`
//   grid-column: span 6;
//   cursor: pointer;
//   padding: 0.5rem;
//   border-radius: 10px;
//   border: 2px solid;
//   transition-duration: 200ms;

//   @media (min-width: 768px) {
//     grid-column: span 4;
//   }
//   ${(props) =>
//     props.isSelected
//       ? `
//     border-color: var(--justweb3-primary-color);
//     transform: scale(1.05);
//   `
//       : `
//     background-color: white;
//   `}
// `;

const ImageWrapper = styled.div`
  width: 360px;
  height: 360px;
  margin: auto;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 75%;
    height: 270px;
  }
`;


export const AvatarEditorDialog: React.FC<AvatarEditorDialogProps> = ({
  onImageChange,
  avatar,
  subname,
  address,
}) => {
  const [isEditorOpen, setIsEditorOpen] = React.useState(false);
  // const [isNFTDialogOpen, setIsNFTDialogOpen] = React.useState(false);
  const [imageSrc, setImageSrc] = React.useState('');
  const imageElement = React.useRef<HTMLImageElement>(null);
  const cropper = React.useRef<Cropper>();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  // const { nfts } = useAllNFTSForCurrentAddress();
  const { mutateAsync: uploadAvatar } = useUploadToCdn(subname, "Avatar");
  // const [selectedNFT, setSelectedNFT] = React.useState<number>(-1);
  const handleImageLoaded = () => {
    if (imageElement.current) {
      cropper.current = new Cropper(imageElement.current, {
        aspectRatio: 1,
        viewMode: 1,
        autoCropArea: 1,
        cropBoxResizable: true,
        highlight: false,
        dragMode: 'move',
      });
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
        setIsEditorOpen(true);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };


  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newZoomLevel = parseFloat(e.target.value);
    if (cropper.current) {
      const zoomRatio = newZoomLevel / 100;
      cropper.current.zoomTo(zoomRatio);
    }
  };


  const handleSave = () => {
    if (cropper.current) {
      const croppedCanvas = cropper.current.getCroppedCanvas();
      croppedCanvas.toBlob(async (blob) => {
        if (!blob) return;
        if (blob.size > 3000000) {
          setIsEditorOpen(false);
          return;
        }

        const formData = new FormData();
        formData.append('file', blob);

        try {
          const response = await uploadAvatar({ form: formData, type: "avatar" });
          if (!response.response) {
            throw new Error(`Error: ${response}`);
          }
          onImageChange(response.response as string);
          setIsEditorOpen(false);
        } catch (error) {
          console.error('Upload error', error);
        }
      });
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // const handleNFTDialog = () => {
  //   setIsNFTDialogOpen(true);
  //   setIsPopupOpen(false);
  // };


  return (
    <>
      {/* {!!address &&
        <DefaultDialog
          open={isNFTDialogOpen}
          onOpenChange={(open: boolean) => {
            setIsNFTDialogOpen(open);
          }}
          header={
            <P style={{
              fontSize: '20px',
              fontWeight: 900,
              lineHeight: '20px',
              textAlign: 'center'
            }}>
              Select NFT
            </P>
          }
        >
          <Flex direction='column' style={{
            maxHeight: 'calc(100vh - 220px)',
            maxWidth: '455px'
          }}>
            <NFTCardWrapper>
              {
                nfts?.map((nft, index) => (
                  <NFTCard key={index} isSelected={selectedNFT === index}
                    onClick={() => {
                      if (selectedNFT === index) {
                        setSelectedNFT(-1);
                      }
                      else {
                        setSelectedNFT(index);
                      }
                    }}
                  >
                    <div style={{ aspectRatio: '1/1', position: 'relative' }} >
                      <img
                        src={nft.image?.pngUrl || nft.image?.originalUrl || ''}
                        alt="NFT"
                        style={{
                          borderRadius: '10px',
                        }}
                      />
                    </div>

                    <P style={{
                      textAlign: 'center',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      marginTop: '2px'
                    }}>{nft.name}</P>
                  </NFTCard>
                ))
              }
            </NFTCardWrapper>
          </Flex>
          <Flex direction='row' justify='space-between' align='center' gap={"20px"}>
            <Button onClick={() => setIsNFTDialogOpen(false)} variant="secondary" style={{ flexGrow: '0.5' }}>Cancel</Button>
            <Button onClick={
              () => {
                setIsNFTDialogOpen(false);
                onImageChange(nfts?.find((nft, index) => index === selectedNFT)?.image?.pngUrl || nfts?.find((nft, index) => index === selectedNFT)?.image?.originalUrl || '');
              }

            } variant="primary"
              disabled={selectedNFT === -1}
              style={{ flexGrow: '0.5' }}>Save</Button>

          </Flex >
        </DefaultDialog>
      } */}
      <Flex direction='row' justify='center' align="center" style={{
        width: "100%",
        flex: "1",
      }} onClick={handleButtonClick}>
        <input
          type="file"
          accept="image/jpeg, image/png, image/heic, image/heif, image/gif, image/avif"
          onChange={handleImageChange}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
        <Avatar
          src={avatar || "/justsomeone.webp"}
          size='75px'
          containerStyle={{
            border: '4px solid white',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: '0px 20px',
            display: 'flex',
            flexDirection: 'column',
            placeContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          <PenIcon height={24} width={24} style={{
            cursor: 'pointer'
          }} />
        </div>
      </Flex>
      <DefaultDialog withoutFooter open={isEditorOpen} onOpenChange={(open: boolean) => {
        setIsEditorOpen(open);
      }}
        header={
          <P style={{
            fontSize: '20px',
            fontWeight: 900,
            lineHeight: '20px',
            textAlign: 'center'
          }}>
            Zoom & Crop
          </P>
        }
      >
        <ResponsiveDiv>
          <ImageWrapper>
            <img
              ref={imageElement}
              src={imageSrc}
              width={360}
              height={360}
              alt="Source"
              crossOrigin="anonymous"
              onLoad={handleImageLoaded}
            />
          </ImageWrapper>
          <Flex
            direction="row"
            justify="space-between"
            align="center"
            gap="10px"
            style={{
              width: '100%',
              marginBottom: '2px',
              marginTop: '10px',
              padding: '0px 2px',
            }}
          >
            {/* <div className='bg-[#dfdfdf] w-[31px] h-[25px] rounded-full flex justify-center items-center'> */}
            <MinusIcon width={27} height={27} />
            {/* </div> */}
            <SliderInput
              min="1"
              max="100"
              onChange={handleSliderChange}
            />
            {/* <div className='bg-[#dfdfdf] w-[31px] h-[25px] rounded-full flex justify-center items-center'> */}
            <AddIcon width={27} height={27} />
            {/* </div> */}
          </Flex>
        </ResponsiveDiv>
        <Flex direction='row' gap="10px">
          <Button type="button" variant="secondary" style={{ flexGrow: '0.5' }}>Cancel</Button>
          <Button type="button" onClick={handleSave} variant="primary" style={{ flexGrow: '0.5' }}>Upload</Button>
        </Flex >
      </DefaultDialog >
    </>


  );
};

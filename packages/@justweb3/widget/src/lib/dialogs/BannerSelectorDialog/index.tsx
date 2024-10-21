
import { AddIcon, Button, Flex, MinusIcon, P, PenIcon } from '@justweb3/ui';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { SliderInput } from '../AvatarSelectorDialog';
import { DefaultDialog } from '../DefaultDialog';
import { useUploadMedia } from '@justaname.id/react';
import { JustWeb3Context } from '../../providers';
import { Loading } from '../../components';

export interface BannerEditorDialogProps {
    onImageChange: (image: string) => void;
    banner: string;
    subname: string
}

const StyledDiv = styled.div`
  width: 360px;
  height: 360px;
  margin: auto;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 75%;
    height: 270px;
  }
`;

export const ResponsiveDiv = styled.div`
display: flex;
flex-direction: column;
  @media (min-width: 768px) {
    max-width: 360px;
  }
`;

export const BannerEditorDialog: React.FC<BannerEditorDialogProps> = ({
    onImageChange,
    banner,
    subname,
}) => {
    const [isEditorOpen, setIsEditorOpen] = React.useState(false);
    const [imageSrc, setImageSrc] = React.useState('');
    const imageElement = React.useRef<HTMLImageElement>(null);
    const cropper = React.useRef<Cropper>();
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const { config } = useContext(JustWeb3Context);

    const { isUploadPending, uploadMedia } = useUploadMedia({
        subname,
        type: "Banner",
        isDev: config.dev ?? true
    });
    const handleImageLoaded = () => {
        if (imageElement.current) {
            cropper.current = new Cropper(imageElement.current, {
                aspectRatio: 5 / 1,
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
                    const response = await uploadMedia({ form: formData });
                    if (!response.data) {
                        throw new Error(`Error: ${response.data}`);
                    }
                    onImageChange(response.data.url);
                    if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                    }
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

    return (
        <>
            <div style={{
                width: '100%',
                height: '100px',
                borderRadius: '5px',
                overflow: 'hidden',
                position: 'relative',
            }}>
                <img
                    src={banner}
                    alt="profile-banner"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
                <div style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                }}>
                    <PenIcon width={20} height={20} style={{
                        cursor: 'pointer'
                    }} onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleButtonClick();
                    }} />
                    <input
                        type="file"
                        accept="image/jpeg, image/png, image/heic, image/heif, image/gif, image/avif"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                    />
                </div>
            </div>
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
                    <StyledDiv>
                        <img
                            ref={imageElement}
                            src={imageSrc}
                            width={360}
                            height={360}
                            alt="Source"
                            crossOrigin="anonymous"
                            onLoad={handleImageLoaded}
                        />
                    </StyledDiv>
                    <Flex direction='row' justify='space-between' align='center' gap='3px' style={{
                        width: '100%',
                        marginBottom: '2px',
                        marginTop: '10px',
                        paddingLeft: '2px',
                    }}>
                        {/* <div className='bg-[#dfdfdf] w-[31px] h-[25px] rounded-full flex justify-center items-center'> */}
                        <MinusIcon width={27} height={27} style={{
                            cursor: 'pointer'
                        }} />
                        {/* </div> */}
                        <SliderInput
                            min="1"
                            max="100"
                            onChange={handleSliderChange}
                        />
                        {/* <div className='bg-[#dfdfdf] w-[31px] h-[25px] rounded-full flex justify-center items-center'> */}
                        <AddIcon width={27} height={27} style={{
                            cursor: 'pointer'
                        }} />
                        {/* </div> */}
                    </Flex>
                </ResponsiveDiv>
                {isUploadPending ?
                    <Loading />
                    :
                    <Flex direction='row' gap='5px'>
                        <Button type="button" variant="secondary" onClick={() => {
                            if (fileInputRef.current) {
                                fileInputRef.current.value = '';
                            }
                        }} style={{ flexGrow: '0.5' }}>Cancel</Button>
                        <Button type="button" onClick={handleSave} variant="primary" style={{ flexGrow: '0.5' }}>Upload</Button>
                    </Flex >
                }
            </DefaultDialog >
        </>
    );
};

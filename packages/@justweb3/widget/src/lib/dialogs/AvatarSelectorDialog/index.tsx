import React from 'react';
import {
  AddIcon,
  Avatar,
  Button,
  Flex,
  MinusIcon,
  P,
  PenIcon,
} from '@justweb3/ui';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';
import { DefaultDialog } from '../DefaultDialog';
import { useEnsAvatar, useUploadMedia } from '@justaname.id/react';
import { ChainId } from '@justaname.id/sdk';
import styles from './AvatarSelectorDialog.module.css';

export interface AvatarEditorDialogProps {
  onImageChange: (image: string) => void;
  avatar?: string | null;
  subname: string;
  chainId?: ChainId;
  address?: `0x${string}`;
  disableOverlay?: boolean;
}

export const AvatarEditorDialog: React.FC<AvatarEditorDialogProps> = ({
  onImageChange,
  avatar,
  subname,
  address,
  chainId,
  disableOverlay,
}) => {
  const { avatar: ensAvatar } = useEnsAvatar({
    ens: subname,
    chainId: chainId,
  });
  const [isEditorOpen, setIsEditorOpen] = React.useState(false);
  const [imageSrc, setImageSrc] = React.useState('');
  const imageElement = React.useRef<HTMLImageElement>(null);
  const cropper = React.useRef<Cropper>();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { uploadMedia, isUploadPending } = useUploadMedia({
    ens: subname,
    type: 'Avatar',
  });

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
          const response = await uploadMedia({ form: formData });
          onImageChange(response.url);
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
      <Flex
        direction="row"
        justify="center"
        align="center"
        className={styles.flexCentered}
        onClick={handleButtonClick}
      >
        <input
          type="file"
          accept="image/jpeg, image/png, image/heic, image/heif, image/gif, image/avif"
          onChange={handleImageChange}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
        <Avatar
          src={avatar || ensAvatar}
          size={75}
          borderSize={'4px'}
          style={{
            margin: '0 15px',
          }}
        />
        <div className={styles.overlay}>
          <PenIcon
            height={24}
            width={24}
            style={{
              cursor: 'pointer',
            }}
          />
        </div>
      </Flex>
      <DefaultDialog
        disableOverlay={disableOverlay}
        withoutFooter
        open={isEditorOpen}
        onOpenChange={(open: boolean) => {
          setIsEditorOpen(open);
        }}
        header={
          <P
            style={{
              fontSize: '20px',
              fontWeight: 900,
              lineHeight: '20px',
              textAlign: 'center',
            }}
          >
            Zoom & Crop
          </P>
        }
      >
        <div className={styles.responsiveDiv}>
          <div className={styles.imageWrapper}>
            <img
              ref={imageElement}
              src={imageSrc}
              width={360}
              height={360}
              alt="Source"
              crossOrigin="anonymous"
              onLoad={handleImageLoaded}
            />
          </div>
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
            <MinusIcon width={27} height={27} />
            <input
              className={styles.sliderInput}
              min="1"
              max="100"
              type="range"
              onChange={handleSliderChange}
            />
            <AddIcon width={27} height={27} />
          </Flex>
        </div>
        <Flex direction="row" gap="10px">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
              setIsEditorOpen(false);
            }}
            style={{ flexGrow: '0.5' }}
            disabled={isUploadPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            variant="primary"
            style={{ flexGrow: '0.5' }}
            loading={isUploadPending}
          >
            Upload
          </Button>
        </Flex>
      </DefaultDialog>
    </>
  );
};

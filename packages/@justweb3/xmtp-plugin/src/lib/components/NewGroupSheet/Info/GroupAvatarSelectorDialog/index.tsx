import { useUploadMedia } from '@justaname.id/react';
import {
  AddIcon,
  Avatar,
  Button,
  Flex,
  MinusIcon,
  P,
  PhotoCameraIcon,
} from '@justweb3/ui';
import { useJustWeb3 } from '@justweb3/widget';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';
import React from 'react';
import styles from './GroupAvatarSelectorDialog.module.css';
import { DefaultDialog } from '../../../DefaultDialog';

export interface GroupAvatarEditorDialogProps {
  onImageChange: (image: string) => void;
  avatar?: string | null;
  disableOverlay?: boolean;
}

export const GroupAvatarEditorDialog: React.FC<GroupAvatarEditorDialogProps> = ({
  onImageChange,
  avatar,
  disableOverlay,
}) => {
  const [isEditorOpen, setIsEditorOpen] = React.useState(false);
  const { connectedEns } = useJustWeb3();
  const [imageSrc, setImageSrc] = React.useState('');
  const imageElement = React.useRef<HTMLImageElement>(null);
  const cropper = React.useRef<Cropper>();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  // TODO: change params to accept group id
  const { uploadMedia, isUploadPending } = useUploadMedia({
    ens: connectedEns?.ens,
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

          const resizedCanvas = document.createElement('canvas');
          const resizedContext = resizedCanvas.getContext('2d');
          if (!resizedContext) return;
          const MAX_SIZE = 1000;
          let width = croppedCanvas.width;
          let height = croppedCanvas.height;
          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }
          resizedCanvas.width = width;
          resizedCanvas.height = height;
          resizedContext.drawImage(croppedCanvas, 0, 0, width, height);
          resizedCanvas.toBlob(async (resizedBlob) => {
            if (!resizedBlob) return;
            const formData = new FormData();
            formData.append('file', resizedBlob);
            try {
              const response = await uploadMedia({ form: formData });
              onImageChange(response.url);
              setIsEditorOpen(false);
              return;
            } catch (error) {
              console.error('Upload error', error);
              return;
            }
          });
        }
        else {
          const formData = new FormData();
          formData.append('file', blob);

          try {
            const response = await uploadMedia({ form: formData });
            onImageChange(response.url);
            setIsEditorOpen(false);
          } catch (error) {
            console.error('Upload error', error);
          }
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
          src={avatar}
          size={100}
          borderSize={'4px'}
          style={{
            borderRadius: '8px',
          }}
        />
        <div className={styles.overlay}>
          <PhotoCameraIcon
            height={32}
            width={32}
            style={{
              cursor: 'pointer',
            }}
          />
        </div>
      </Flex>
      <DefaultDialog
        disableOverlay={disableOverlay}
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

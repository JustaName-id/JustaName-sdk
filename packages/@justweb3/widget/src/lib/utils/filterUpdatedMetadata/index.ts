import { TextRecord } from "@justaname.id/sdk";

export const filterUpdatedMetadata = (oldMetadata: TextRecord[], updatedMetadata: TextRecord[]) => {
    const filteredMetadata: TextRecord[] = [];
    updatedMetadata.forEach((metadata) => {
      const keyIndex = oldMetadata.findIndex((m) => m.key === metadata.key);
      if (keyIndex !== -1) {
        if (metadata.value !== oldMetadata[keyIndex].value) {
          filteredMetadata.push(metadata);
        }
      } else {
        filteredMetadata.push(metadata);
      }
    });
    oldMetadata.forEach((metadata) => {
      const keyIndex = updatedMetadata.findIndex((m) => m.key === metadata.key);
      if (keyIndex === -1) {
        filteredMetadata.push({
          key: metadata.key,
          value: ''
        });
      }
    })
    return filteredMetadata;
  }
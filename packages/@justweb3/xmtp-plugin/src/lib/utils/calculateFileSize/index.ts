export const calculateFileSize = (bytes: number) => {
    const kilobytes = bytes / 1024
    if (kilobytes < 1024) {
        return kilobytes.toFixed(2) + ' KB'
    } else {
        const megabytes = kilobytes / 1024
        return megabytes.toFixed(2) + ' MB'
    }
}

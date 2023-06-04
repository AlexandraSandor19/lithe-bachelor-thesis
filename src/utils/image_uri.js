export function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};

export function get64BaseImageUri(photo) {
    if (photo.value) {
        const base64String = arrayBufferToBase64(photo.value.image.data.data);
        return `data:${photo.value.image.contentType};base64,${base64String}`;
    }
    return '';  
}
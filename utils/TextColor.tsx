export const getTextColor = (bgColor: string) => {
    const hex = bgColor.startsWith('#') ? bgColor.slice(1) : bgColor;
    const r = parseInt(hex.slice(0, 2), 16)
    const g = parseInt(hex.slice(2, 4), 16)
    const b = parseInt(hex.slice(4, 6), 16)

    const luz =  (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

    return luz > 0.5 ? "#000000" : "#FFFFFF"
}
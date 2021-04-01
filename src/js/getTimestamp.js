export default function getTimestamp(e) {
    const date = new Date();
    const components = [
        date.getFullYear(),
        (date.getMonth() + 1).toString().padStart(2, "0"),
        date.getDate().toString().padStart(2, "0"),
        date.getHours().toString().padStart(2, "0"),
        date.getMinutes().toString().padStart(2, "0"),
        date.getSeconds().toString().padStart(2, "0"),
        date.getMilliseconds().toString().padStart(3, "0")
    ];
    const timestamp = parseInt(components.join(""));
    return timestamp;
}

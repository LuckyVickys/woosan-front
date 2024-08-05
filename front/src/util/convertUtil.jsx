export const convertLineBreaks = (text) => {
    if (!text) return ""; // text가 undefined나 null일 경우 빈 문자열 반환
    return text.replace(/\r\n|\n/g, '<br>');
};

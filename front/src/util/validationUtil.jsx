export const validateBoardInputs = (board) => {
    const errors = {};

    if (board.categoryName === "선택") {
        errors.categoryName = "카테고리를 선택해주세요.";
    }
    if (!board.title.trim()) {
        errors.title = "제목을 입력해주세요.";
    }
    if (board.title.length > 40) {
        errors.title = "제목은 40자 이내로 입력해주세요.";
    }
    if (!board.content.trim()) {
        errors.content = "내용을 입력해주세요.";
    }
    if (board.content.length > 1960) {
        errors.content = "내용은 1960자 이내로 입력해주세요.";
    }

    return errors;
};

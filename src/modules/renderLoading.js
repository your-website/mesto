export {renderLoading, renderLoadingCard};

function renderLoading(isLoading, button) {
    if (isLoading) {
        button.textContent = "Сохранить"
    } else {
        button.textContent = "Загрузка"
    }
}

function renderLoadingCard(isLoading, button) {
    if (isLoading) {
        button.textContent = "+"
        button.style.fontSize = "36px";

    } else {
        button.textContent = "Загрузка"
        button.style.fontSize = "18px";
    }
}
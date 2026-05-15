export function formatPreview(
    text: string,
    answer?: string,
    reveal: boolean = false
) {

    return text

        // cloze normal
        .replace(
            /{{(.*?)}}/g,
            "<span class='cloze'>$1</span>"
        )

        // ocultos
        .replace(
            /{{?}}/g,
            "<span class='cloze-hidden'>████</span>"
        )

        // lacuna ativa
        .replace(
            /______/g,
            reveal
            ? `<span class='cloze-answer'>${answer}</span>`
            : "<span class='cloze-answer' id='active-cloze'>______</span>"
            
        );
}
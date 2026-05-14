export function formatPreview(
    text: string
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
            "<span class='cloze-answer'>______</span>"
        );
}
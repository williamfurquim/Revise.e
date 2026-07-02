export function formatPreview(
    text: string,
    answer?: string,
    reveal: boolean = false,
    revealedAnswers: string[] = [],
    reviewMode = false
) {
    return text
        .replace(/{{(.*?)}}/g, (_, word) => {

            if (!reviewMode) {
                return `<span class="cloze">${word}</span>`;
            }

            if (revealedAnswers.includes(word)) {
                return `<span class="cloze-answer">${word}</span>`;
            }

            return `<span class="cloze-hidden">██████</span>`;
        })
        
        .replace( // lacuna ativa
            /______/g,
            reveal
                ? `<span class='cloze-answer'>${answer}</span>`
                : "<span class='cloze-answer' id='active-cloze'>______</span>"

        );
}
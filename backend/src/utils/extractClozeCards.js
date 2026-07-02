export function extractClozeCards(note) {

    const regex = /{{(.*?)}}/g;
    const matches = [...note.matchAll(regex)];

    return matches.map((match) => {
        const currentAnswer = match[1];

        const question = note.replace(
            regex,
            (_, content) => {

                if (content === currentAnswer) {
                    return "______";
                }

                return `{{${content}}}`;
            }
        );

        return {
            question,
            answer: currentAnswer
        };
    });
}
export function extractClozeCards(note) {

    const regex = /{{(.*?)}}/g;

    const matches = [...note.matchAll(regex)];

    return matches.map((match) => {

        const currentAnswer = match[1];

        let hiddenIndex = 0;

        const question = note.replace(
            regex,
            (_, content) => {

                hiddenIndex++;

                if (content === currentAnswer) {
                    return "______";
                }

                return "{{?}}";
            }
        );

        return {
            question,
            answer: currentAnswer
        };
    });
}
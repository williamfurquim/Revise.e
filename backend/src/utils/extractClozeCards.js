export function extractClozeCards(note) {

    const regex = /{{(.*?)}}/g;

    const matches = [...note.matchAll(regex)];

    return matches.map(match => {

        const fullMatch = match[0];

        const answer = match[1];

        const question = note.replace(
            fullMatch,
            "______"
        );

        return {
            question,
            answer
        };
    });
}
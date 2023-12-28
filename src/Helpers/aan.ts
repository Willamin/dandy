// 
// Adapted from https://github.com/ged/linguistics/blob/master/lib/linguistics/en/articles.rb
//

export const Aan = (word: string): "A" | "An" => {
    switch (aan(word)) {
    case "a": return "A"
    case "an": return "An"
    }
}

export const aan = (word: string): "a" | "an" => {
    // Exceptions to exceptions
    const A_explicit_an = /^(euler)|(hour(?!i))|(heir)|(honest)|(hono)/i

    // This pattern matches strings of capitals starting with a "vowel-sound"
    // consonant followed by another consonant, and which are not likely
    // to be real words (oh, all right then, it's just magic!)
    const A_abbrev = /^((?!FJO|[HLMNS]Y.|RY[EO]|SQU|(F[LR]?|[HL]|MN?|N|RH?|S[CHKLMNPTVW]?|X(YL)?)[AEIOU])[FHLMNRSX][A-Z])/

    // This pattern codes the beginnings of all english words begining with a
    // 'y' followed by a consonant. Any other y-consonant prefix therefore
    // implies an abbreviation.
    const A_y_cons = /^(y(?:b[lor]|cl[ea]|fere|gg|p[ios]|rou|tt))/i

    // Handle special cases
    if (word.match(A_explicit_an)) {
        return "an"
    }

    // Handle abbreviations
    if (word.match(A_abbrev)) {
        return "an"
    }
    if (word.match(/^[aefhilmnorsx][.-]/i)) {
        return "an"
    }
    if (word.match(/^[a-z][.-]/i)) {
        return "a"
    }

    // Handle consonants
    if (word.match(/^[^aeiouy]/i)) {
        return "a"
    }

    // Handle special vowel-forms
    if (word.match(/^e[uw]/i)) {
        return "a"
    }
    if (word.match(/^onc?e\b/i)) {
        return "a"
    }
    if (word.match(/^uni([^nmd]|mo)/i)) {
        return "a"
    }
    if (word.match(/^u[bcfhjkqrst][aeiou]/i)) {
        return "a"
    }

    // Handle vowels
    if (word.match(/^[aeiou]/i)) {
        return "an"
    }

    // Handle y... (before certain consonants implies (unnaturalized) "i.." sound)
    if (word.match(A_y_cons)) {
        return "an"
    }

    // Otherwise, guess "a"
    return "a"
}
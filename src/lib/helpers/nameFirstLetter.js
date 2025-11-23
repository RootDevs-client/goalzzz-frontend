export default function nameFirstLetter(teamName) {
    // Check if the teamName is (name)
    if (typeof window !== 'undefined') {
        if (window.innerWidth < 640) {
            const words = teamName.split(' ');
            // Check if there is only one word in the teamName
            if (words.length === 1) {
                return teamName;
            } else {
                const abbreviation = words.map(word => word[0].toUpperCase()).join('');
                return abbreviation;
            }

        } else {
            return teamName
        }
    }
    return teamName;

}


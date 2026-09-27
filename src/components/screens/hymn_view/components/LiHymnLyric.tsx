import { HymnVerse } from "../../../../models/hymn"
import LiHymnChorus from "./LiHymnChorus";
import LiHymnVerse from "./LiHymnVerse";

interface Props {
    verse: HymnVerse;
    verseNumber: number;
}

const LiHymnLyric = ({
    verse,
    verseNumber,
}: Props) => {
    switch (verse.verseType) {
        case "verse":
            return (
                <LiHymnVerse
                    verse={verse}
                    verseNumber={verseNumber}
                />
            );
        case "chorus":
            return <LiHymnChorus verse={verse} />;
    }
}

export default LiHymnLyric
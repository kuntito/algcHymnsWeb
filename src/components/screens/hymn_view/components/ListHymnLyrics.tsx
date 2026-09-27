import { useMemo } from "react";
import { HymnVerse } from "../../../../models/hymn"
import ItemList from "../../../util/AppItemList"
import LiHymnLyric from "./LiHymnLyric";

interface Props {
    verses: HymnVerse[];
}

type NumberedVerse = {
    verse: HymnVerse;
    verseNumber: number;
};

const ListHymnLyrics = ({
    verses
}: Props) => {

    // the api sends verses and choruses together, in the order they're sung,
    // i.e. verse, chorus, verse, chorus.
    //
    // each verse is displayed with its number, but the api doesn't provide it,
    // and a verse's position in the list isn't its number,
    // since choruses sit between them.
    //
    // so verses are counted here, skipping choruses.
    // a hymn sung verse-chorus-verse-chorus shows verse 1 and verse 2.
    //
    // choruses carry the number of the verse before them, but it isn't used.
    const versesWithNumbers = useMemo(
        () => {
            let verseNumber = 0;

            return verses.map((verse) => {
                const isVerse = verse.verseType === "verse";

                if (isVerse) verseNumber += 1;

                const numberedVerse: NumberedVerse = {
                    verse: verse,
                    verseNumber: verseNumber,
                };

                return numberedVerse;
            });
        },
        [verses],
    );

    return (
        <ItemList
            data={versesWithNumbers}
            renderItem={(item) => (
                <LiHymnLyric
                    key={item.verse.id}
                    verse={item.verse}
                    verseNumber={item.verseNumber}
                />
            )}
            gap="16px"
            edgePadding={8}
            maxW={"444px"}
        />
    )
}

export default ListHymnLyrics
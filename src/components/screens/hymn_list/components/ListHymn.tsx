import { useNavigate } from "react-router-dom";
import { Hymn } from "../../../../models/hymn"
import ItemList from "../../../util/AppItemList"
import LiHymn from "./LiHymn";
import { HymnMatchSource, SearchedHymn } from "../../../../util";

type ListableHymn = Hymn & Partial<Pick<SearchedHymn, "matchSource">>;

interface Props {
    hymns: ListableHymn[];
}


const ListHymn = ({
    hymns
}: Props) => {
    const navigate = useNavigate();

    return (
        <ItemList
            data={hymns}
            renderItem={(item, idx) => (
                <LiHymn
                    key={item.id}
                    noInList={idx + 1}
                    hymn={item}
                    matchSource={item.matchSource}
                    onClick={
                        () => navigate(`/view/${item.id}`)
                    }
                />
            )}
            gap="16px"
            edgePadding={8}
            // TODO, this the same size as the search bar
            // don't hard code, pass same ref to both.
            maxW={"444px"}
        />
    )
}

export default ListHymn
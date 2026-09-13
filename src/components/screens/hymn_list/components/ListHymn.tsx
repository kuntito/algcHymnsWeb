import { useNavigate } from "react-router-dom";
import { Hymn } from "../../../../models/hymn"
import ItemList from "../../../util/AppItemList"
import LiHymn from "./LiHymn";

interface Props {
    hymns: Hymn[];
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
                    key={idx}
                    index={idx}
                    hymn={item}
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
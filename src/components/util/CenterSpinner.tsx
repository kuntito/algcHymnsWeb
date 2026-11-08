import { Center, CenterProps, Spinner } from "@chakra-ui/react"

interface Props extends CenterProps {

}

const CenterSpinner = ({
    ...centerProps
}: Props) => {
    return (
        <Center 
            w={"100%"}
            h={"100%"}
            {...centerProps}
        >
            <Spinner 
                color="palette.holy"
            />
        </Center>
    )
}

export default CenterSpinner
import {
    Editable,
    EditableInput,
    EditablePreview,
    EditableProps,
} from "@chakra-ui/react";

// `EditableProps` already has 'value' and 'onChange',
// omitting them prevents the passed args from clashing
// with this.
interface Props extends Omit<
    EditableProps,
    "value" | "onChange"
> {
    value: string;
    onChange: (value: string) => void;
}


const AppEditableText = ({
    value,
    onChange,
    placeholder,
    ...editableProps
}: Props) => {
    const textStyle = "orion";
    const textColor = "palette.holy";
    const placeholderColor = "palette.holyAlpha";

    const isEmpty = value === "";
    const previewColor = isEmpty ? placeholderColor : textColor;

    return (
        <Editable
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            submitOnBlur={true}
            textAlign={"left"}
            minW={0}
            {...editableProps}
        >
            <EditablePreview
                textStyle={textStyle}
                color={previewColor}
                cursor={"text"}
                overflow={"hidden"}
                whiteSpace={"nowrap"}
                textOverflow={"ellipsis"}
                maxW={"100%"}
                display={"block"}
                w={"100%"}
            />
            <EditableInput
                textStyle={textStyle}
                color={textColor}
                _focusVisible={{
                    outline: "none",
                    borderBottom: "1px solid",
                    borderColor: "palette.holyAlpha",
                }}
                w={"100%"}
            />
        </Editable>
    )
}

export default AppEditableText
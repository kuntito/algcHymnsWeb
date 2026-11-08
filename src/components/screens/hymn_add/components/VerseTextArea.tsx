import { Textarea, TextareaProps } from "@chakra-ui/react";

// TextareaProps already has value and `onChange`, 
// omitting them lets this component's own versions be the only ones.
interface Props extends Omit<TextareaProps, "value" | "onChange"> {
    value: string;
    onChange: (value: string) => void;
    minRows?: number;
}

/**
 * a text field for verse lyrics.
 *
 * each line the user types becomes one line of the verse,
 * so enter adds a new line instead of submitting.
 *
 * it grows with the text, so a verse never needs its own scrollbar.
 */
const VerseTextArea = ({
    value,
    onChange,
    minRows = 3,
    ...textareaProps
}: Props) => {
    const lineCount = value.split("\n").length;
    const rows = Math.max(lineCount, minRows);

    const handleChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        onChange(e.target.value);
    }

    return (
        <Textarea
            value={value}
            onChange={handleChange}
            rows={rows}
            resize={"none"}
            variant={"unstyled"}
            textStyle={"orion"}
            color={"palette.holy"}
            _placeholder={{ color: "palette.holyAlpha" }}
            {...textareaProps}
        />
    )
}

export default VerseTextArea;
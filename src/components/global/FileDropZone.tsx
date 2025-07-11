import { Box, Typography } from "@mui/material";
import { useMemo, useRef } from "react";

type FileDropZoneProps = {
  selectedFiles: File[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  disabled: boolean;
};

const FileDropZone: React.FC<FileDropZoneProps> = ({
  selectedFiles,
  setSelectedFiles,
  disabled,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const filesAmount = useMemo(
    () => selectedFiles.length,
    [selectedFiles.length]
  );
  const dynamicPlural = filesAmount > 1 ? "s" : "";

  const handleSelect = (fl: FileList | null) => {
    const files = fl ? Array.from(fl) : [];
    setSelectedFiles(files);
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        multiple
        hidden
        disabled={disabled}
        onChange={(e) => handleSelect(e.target.files)}
      />

      <Box
        onClick={() => !disabled && inputRef.current?.click()}
        sx={{
          mt: 2,
          p: 3,
          border: "3px dashed",
          borderRadius: 2,
          borderColor: "text.secondary",
          textAlign: "center",
          cursor: disabled ? "default" : "pointer",
          userSelect: "none",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {filesAmount
            ? `${filesAmount} archivo${dynamicPlural} seleccionado${dynamicPlural}`
            : "Haz clic o arrastra archivos aquí"}
        </Typography>
      </Box>
    </>
  );
};

export default FileDropZone;

import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";
import React from "react";
import { useReactToPrint } from "react-to-print";
import { ContentNode } from "react-to-print/lib/types/ContentNode";

const PdfSetup = ({ canvas }: { canvas: React.RefObject<ContentNode> }) => {
  const pdfTitle = "my-resume";

  const handlePrint = useReactToPrint({
    contentRef: canvas,
    documentTitle: pdfTitle,
  });
  return <Button className="bg-blue-100 text-blue-950 font-semibold shadow-lg shadow-blue-900" onPress={() => handlePrint()}><FontAwesomeIcon icon={faPrint}/> Print </Button>;
};

export default PdfSetup;

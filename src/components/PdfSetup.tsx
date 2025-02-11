import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@heroui/react";
import React from "react";
import { useReactToPrint } from "react-to-print";
import { ContentNode } from "react-to-print/lib/types/ContentNode";

const PdfSetup = ({ canvas }: { canvas: React.RefObject<ContentNode> }) => {
  const pdfTitle = "my-resume"; //title when save pdf 
// useReact to print hook
  const handlePrint = useReactToPrint({
    contentRef: canvas, // print canvas to print
    documentTitle: pdfTitle, // document title 
  });
  return <Button className="bg-white text-blue-950 font-medium transition-colors  duration-700 hover:text-blue-100 hover:bg-blue-950" onPress={() => handlePrint()}><FontAwesomeIcon icon={faPrint}/> Print </Button>;
};

export default PdfSetup;

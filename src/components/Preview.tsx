"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { ReactNode, useRef } from "react";
import PdfSetup from "./PdfSetup";

export default function PreviewPanel({
  open,
  setOpen,
  children,
}: {
  open: boolean;
  setOpen: any;
  children: ReactNode;
}) {
  const canvas = useRef<HTMLDivElement>(null);
  return (
    <div>
      <Dialog open={open} onClose={setOpen} className="relative  z-[300]">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-full overflow-y-auto">
          <div className=" flex min-h-screen  items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <div className=" absolute right-20 top-0 m-4 z-20">
              <PdfSetup canvas={canvas} />
            </div>

            <DialogPanel
              transition
              className=" mt-3 relative transform overflow-hidden  bg-white text-left shadow-xl transition-all  data-[enter]:ease-out data-[leave]:ease-in sm:my-8 "
            >
              <div className="w-full max-w-[21cm] h-full max-h-[29.7cm] overflow-auto">
                <div className="" ref={canvas}>
                  {children}
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

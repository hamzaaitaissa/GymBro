/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Children, JSX, PropsWithChildren } from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"

type AlertProps = {
  variant?: "default" | "destructive" | null;
};

const AlertComponent = ({ variant, children }: PropsWithChildren<AlertProps>): JSX.Element => {
  return (
    <Alert variant={variant} className="fade-in-5">
      <Terminal />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        {children}
      </AlertDescription>
    </Alert>
  );
};

export default AlertComponent
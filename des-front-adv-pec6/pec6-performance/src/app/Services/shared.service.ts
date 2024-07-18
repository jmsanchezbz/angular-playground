import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";

export interface ResponseError {
  statusCode: number;
  message: string;
  messageDetail: string;
  code: string;
  timestamp: string;
  path: string;
  method: string;
}

@Injectable({
  providedIn: "root",
})
export class SharedService {
  constructor() {}

  async managementToast(
    element: string,
    validRequest: boolean,
    error?: ResponseError
  ): Promise<void> {
    const toastMsg = document.getElementById(element);
    if (toastMsg) {
      if (validRequest) {
        toastMsg.className = "show requestOk";
        toastMsg.textContent = "Form submitted successfully.";
        await this.wait(2500);
        toastMsg.className = toastMsg.className.replace("show", "");
      } else {
        toastMsg.className = "show requestKo";
        if (error?.messageDetail) {
          toastMsg.textContent =
            "Error on form submitted, show logs. Message: " +
            error?.message +
            ". Message detail: " +
            error?.messageDetail +
            ". Status code: " +
            error?.statusCode;
        } else {
          toastMsg.textContent =
            "Error on form submitted, show logs. Message: " +
            error?.message +
            ". Status code: " +
            error?.statusCode;
        }

        await this.wait(2500);
        toastMsg.className = toastMsg.className.replace("show", "");
      }
    }
  }

  errorLog(error: ResponseError): void {
    console.error("path:", error?.path ? error.path : "unknown");
    console.error("timestamp:", error?.timestamp ? error.timestamp : "unknown");
    console.error("message:", error?.message ? error.message : "unknown");
    console.error(
      "messageDetail:",
      error?.messageDetail ? error.messageDetail : "unknown"
    );
    console.error(
      "statusCode:",
      error?.statusCode ? error.statusCode : "unknown"
    );
  }

  async wait(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}

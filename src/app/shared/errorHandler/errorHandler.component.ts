import { Component, OnInit, Injector, ErrorHandler } from '@angular/core';

@Component({
  selector: 'app-errorHandler',
  templateUrl: './errorHandler.component.html',
  // styleUrls: ['./errorHandler.component.css']
})
export class ErrorHandlerComponent implements ErrorHandler {
  constructor(private injector: Injector) { }
  handleError(error) {
    console.log(error)
    // IMPORTANT: Rethrow the error otherwise it gets swallowed
    //  throw error;
    // let modalService = this.injector.get(ModalService)
    // if (modalService) {
    //   modalService.alert(error);

    // }

  }

}
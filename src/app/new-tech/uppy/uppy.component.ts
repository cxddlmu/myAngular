import { Component, OnInit } from '@angular/core';
import {Uppy} from '@uppy/core';
import FileInput from '@uppy/file-input';
import XHRUpload from '@uppy/xhr-upload';
import ProgressBar from '@uppy/progress-bar';
import Tus from '@uppy/tus';
import StatusBar from '@uppy/status-bar';
@Component({
  selector: 'app-uppy',
  templateUrl: './uppy.component.html',
  styleUrls: ['./uppy.component.css']
})
export class UppyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // const Uppy = require('@uppy/core')
    // const FileInput = require('@uppy/file-input')
    // const XHRUpload = require('@uppy/xhr-upload')
    // const ProgressBar = require('@uppy/progress-bar')

    const uppy = new Uppy({ debug: true, autoProceed: true })
    uppy.use(FileInput, { target: '.UppyForm', replaceTargetContent: true })
    uppy.use(XHRUpload, {
      endpoint: 'http://localhost:3000/fileUpload',
      formData: true,
      fieldName: 'files[]'
    })
    uppy.use(ProgressBar, {
      target: 'body',
      fixed: true,
      hideAfterFinish: false
    })

    console.log('Uppy with Formtag and XHRUpload is loaded')
// const Uppy = require('@uppy/core')
// const FileInput = require('@uppy/file-input')
// const StatusBar = require('@uppy/status-bar')
// const Tus = require('@uppy/tus')
    const uppyOne = new Uppy({debug: true, autoProceed: true})
uppyOne
  .use(FileInput, { target: '.UppyInput', pretty: false })
  .use(Tus, { endpoint: 'http://localhost:3000/fileUpload' })
  .use(StatusBar, {
    target: '.UppyInput-Progress',
    hideUploadButton: true,
    hideAfterFinish: false
  })
  }

}
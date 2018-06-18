import { Injectable } from "@angular/core";
@Injectable()
export class OutputParam {
  static: Array<any>;
  conditional: Map<any, any>;
  conditions: Map<any, any>;
}
export abstract class Metadata {
  getValidityMetadata(): OutputParam {
    return new OutputParam();
  }
  getCompletenessMetadata(): OutputParam {
    return new OutputParam();
  }
  getDefaultValueMetadataForETB(): OutputParam {
    return new OutputParam();
  }
  getDefaultValueMetadata(): OutputParam {
    return new OutputParam();
  }
  getUniquevalueMetadata(): OutputParam {
    return new OutputParam();
  }
}

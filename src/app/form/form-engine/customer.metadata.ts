import * as _ from "lodash";
import { Injectable } from "@angular/core";
import { Metadata } from "./metadata";

@Injectable()
export class CustomerMetadata extends Metadata {
  countryCode: string;
  content;
  customizerForArray;
  constructor() {
    super();
    this.countryCode = "";
    this.content = "";
  }

  getValidityMetadata() {
    let base = {
      basicInfo: {
        firstName: {
          maxLength: 25
        },
        lastName: {
          maxLength: 25
        },
        customerTitle: {
          maxLength: 40
        },
        prefix: {
          options: this.content.getCVT("cvtPrefix")
        },
        saluteBy: {
          options: this.content.getCVT("cvtSaluteBy")
        },
        birthday: {},
        spokenLanguage: {
          options: this.content.getCVT("cvtLanguage")
        },
        correspondenceLanguage: {
          options: this.content.getCVT("cvtLanguage")
        },
        gender: {
          options: this.content.getCVT("cvtGender")
        },
        maritalStatus: {
          options: this.content.getCVT("cvtMaritalStatus")
        },
        birthCountry: {
          options: this.content.getCVT("cvtCountry")
        },
        birthCity: {
          maxLength: 50
        },
        residenceCountry: {
          options: this.content.getCVT("cvtCountry")
        },
        permanentResident: {
          options: this.content.getCVT("cvtCountry")
        },
        aliasName: {
          maxLength: 25,
          options: this.content.getCVT("cvtCountry")
        },
        otherName: {
          maxLength: 40
        },
        motherMaidenName: {
          maxLength: 40
        },
        existingCitigoldCustomer: {
          options: this.content.getCVT("cvtYesNo")
        },
        existingCitigoldHomeCountry: {
          maxLength: 25,
          options: this.content.getCVT("cvtCountry")
        }
      }
    };

    let additional = {
      SGGCG: {},
      SGIPB: {},
      TH: {
        basicInfo: {
          localENName: {
            maxLength: 45
          },
          localENSurName: {
            maxLength: 45
          }
          // domicile :{
          //     options: this.content.getCVT('cvtCountry')
          // }
        }
      },
      ID: {
        basicInfo: {
          localWithholdingTax: {
            options: this.content.getCVT("cvtLocalWithholdingTax")
          },
          religion: {
            options: this.content.getCVT("cvtReligion")
          }
        }
      }
    };

    return _.mergeWith(base, additional[this.countryCode], this.customizerForArray);
  }

  getDefaultValueMetadata() {
    let base = {
      customer: {
        static: {
          prefix: "MR",
          residenceCountry: this.countryCode,
          permanentResident: this.countryCode,
          saluteBy: "S"
          // existingCitigoldCustomer: this.session.countryCode
        },
        conditional: {
          prefix: {
            gender: {
              value: "",
              isOverride: true,
              isOtherValue: [0, -1] //take the whole part of the other value, -1 means last index.
            }
          }
        },
        conditions: {
          hasPrefix: '{prefix}!=""',
          hasNoPrefix: '{prefix}==""'
        }
      }
    };

    let additional = {
      SGGCG: {
        basicInfo: {
          conditional: {
            prefix: {
              customerTitle: [
                {
                  value: "{prefixName} {lastName} {firstName}",
                  isOverride: true,
                  condition: "hasPrefix"
                },
                {
                  value: "",
                  isOverride: true,
                  condition: "hasNoPrefix"
                }
              ]
            }
          }
        }
      },
      SGIPB: {
        basicInfo: {
          conditional: {
            prefix: {
              customerTitle: {
                value: "{prefixName} {lastName} {firstName},",
                isOverride: true,
                condition: "hasPrefix,hasNoPrefix"
              }
            }
          }
        }
      },
      TH: {
        basicInfo: {
          static: {
            prefix: "",
            correspondenceLanguage: "",
            customerTitle: "{firstName} {lastName}"
            // domicile: this.session.countryCode
          },
          conditional: {
            prefix: {
              customerTitle: {
                value: "{prefixName} {firstName} {lastName} ,",
                isOverride: true,
                condition: "hasPrefix,hasNoPrefix"
              }
            }
          }
        }
      },
      ID: {
        basicInfo: {
          static: {
            prefix: "",
            maritalStatus: "M",
            correspondenceLanguage: "ID",
            customerTitle: "{firstName} {lastName}"
          }
          // conditional: {
          //     customerTitle: {
          //         value: '{firstName} {lastName} ,',
          //         isOverride: true,
          //         // condition: 'hasPrefix,hasNoPrefix',
          //     }
          // }
        }
      }
    };
    return _.mergeWith(base, additional[this.countryCode], this.customizerForArray);
  }

  getCompletenessMetadata() {
    let base = {
      basicInfo: {
        static: ["prefix", "lastName", "customerTitle", "birthday", "gender", "maritalStatus", "birthCountry", "birthCity", "residenceCountry", "permanentResident"],
        conditional: {
          //when a change, b is affected
          existingCitigoldCustomer: [
            {
              existingCitigoldHomeCountry: "isInAnotherCountry"
            }
          ]
        },
        conditions: {
          isInAnotherCountry: '{existingCitigoldCustomer}=="Y"'
        }
      }
    };
    let additional = {
      SGGCG: {
        basicInfo: {
          static: ["firstName", "saluteBy"]
        }
      },
      SGIPB: {
        basicInfo: {
          static: ["firstName", "saluteBy"]
        }
      },
      TH: {
        basicInfo: {
          static: ["localENName", "localENSurName"]
        }
      },
      ID: {
        basicInfo: {
          static: ["motherMaidenName", "correspondenceLanguage", "localWithholdingTax"]
        }
      }
    };

    return _.mergeWith(base, additional[this.countryCode], this.customizerForArray);
  }
}

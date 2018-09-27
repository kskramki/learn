import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'MsGraphLearnWebPartStrings';
import MsGraphLearn from './components/MsGraphLearn';
import { IMsGraphLearnProps } from './components/IMsGraphLearnProps';
import { MSGraphClient } from '@microsoft/sp-client-preview';

export interface IMsGraphLearnWebPartProps {
  description: string;
}


export default class MsGraphLearnWebPart extends BaseClientSideWebPart<IMsGraphLearnWebPartProps> {
  
        
  
  protected  graphGet() {
    
    const client:MSGraphClient = this.context.serviceScope.consume(MSGraphClient.serviceKey);
  console.log(client);
   
    client.api("/me/mailFolders('Inbox')/messages?$select=sender,subject").get((error, response: any, rawResponse?: any) => {
    
     console.log(response.value)
    
   //      // this.setState({mails:response.value});
     
        
   
  })
  }
  public render(): void {
    
 // console.log(this.graphGet('api/me/joinedTeams'))
// A generic function you can use for Graph API calls that use GET method
this.graphGet();
    const element: React.ReactElement<IMsGraphLearnProps > = React.createElement(
      MsGraphLearn,
      {
        description: this.properties.description,
        context:this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ReactandSpfxWebPartStrings';
import ReactandSpfx from './components/ReactandSpfx';
import { IReactandSpfxProps } from './components/IReactandSpfxProps';
import OfficeUiFabricPeoplePicker from './components/OfficeUiFabricPeoplePicker';
import { IOfficeUiFabricPeoplePickerProps } from './components/IOfficeUiFabricPeoplePickerProps';
import { SPHttpClient } from '@microsoft/sp-http';
import { Util } from "@pnp/common";
import {sp,SearchQuery, SearchResults,SearchSuggestQuery,SearchSuggestResult} from "@pnp/sp";
import {Logger} from "@pnp/logging";




export interface IReactandSpfxWebPartProps {
  description: string;
  siteURL:string;
  spHttpClient:SPHttpClient
}

export default class ReactandSpfxWebPart extends BaseClientSideWebPart<IReactandSpfxWebPartProps> {

  public onInit():Promise<void>
  {
    return super.onInit().then(_ => {

      // other init code may be present
  
      sp.setup({
        spfxContext: this.context
      });
    });
  }
  public render(): void {
    const element: React.ReactElement<IReactandSpfxProps > = React.createElement(
      ReactandSpfx,
      {
        description: this.properties.description,
        siteURL:this.context.pageContext.web.absoluteUrl,
        spHttpClient:this.context.spHttpClient
      }
    );
    // const element: React.ReactElement<IOfficeUiFabricPeoplePickerProps> = React.createElement(
    //   OfficeUiFabricPeoplePicker,
    //   {
    //     description: this.properties.description,
    //     spHttpClient: this.context.spHttpClient,
    //     siteUrl: this.context.pageContext.web.absoluteUrl,
    //     typePicker: "Normal",
    //     principalTypeUser: 1
    //   },
      
    // );

    //ReactDom.render(element, this.domElement);
    //********USING PNP********* START
    console.log("This is my GUID", Util.getGUID());
    this.domElement.innerHTML = `Loading...`;

    sp.web.select("Title").get().then(w => {

        console.log(`Web Title: ${w.Title}`);
    });
    sp.web.roleAssignments.get().then(roles => {

      console.log(roles);
  });
  

// text search using SharePoint default values for other parameters
sp.search("test").then((r: SearchResults) => {

    console.log(r.ElapsedTime);
    console.log(r.RowCount);
    console.log(r.PrimarySearchResults);
});

sp.searchSuggest(<SearchSuggestQuery>{
  querytext: "ram",
  count: 5,
}).then((r: SearchSuggestResult) => {

  console.log(r);
});

//********USING PNP*********  END
    ReactDom.render(element, this.domElement);
  }
//Comment
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

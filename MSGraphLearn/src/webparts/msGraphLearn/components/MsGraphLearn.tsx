import * as React from 'react';
import styles from './MsGraphLearn.module.scss';
import { IMsGraphLearnProps } from './IMsGraphLearnProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { MSGraphClient } from '@microsoft/sp-client-preview';
import Mails from './Mails'
import IMailsProps from './IMailsProps';
import { WebPartContext } from '@microsoft/sp-webpart-base';


export default class MsGraphLearn extends React.Component<IMsGraphLearnProps> {
  
    
    
   
    constructor(props){
      super(props);
     
    }
    componentDidMount() {
     // this.graphGet();
   }
  protected   graphGet() {
    
    //  const cl = this.props.client.serviceScope.consume(MSGraphClient.serviceKey);
  
    
    //  cl.api("/me/mailFolders('Inbox')/messages?$select=sender,subject").get((error, response: any, rawResponse?: any) => {
     
    //   console.log(typeof(response.value))
     
    //      // this.setState({mails:response.value});
      
         
    
  // })
  //  this.getImage(client).then((res)=>{
  //   this.valuesfinal=res;
  //  })
  
  }
  private getImage(client:MSGraphClient):Promise<string> {
    return client.api(`/users/934c86d6-fd78-4b46-9b2c-ace8f044a045/photos/48x48/$value`)
    .responseType('blob')
    .get()
    .then((blob: Blob) => {
      return blob ? URL.createObjectURL(blob) : null;
    });
   }
  
  
  public render(): React.ReactElement<IMsGraphLearnProps> {
  //   const client: MSGraphClient = this.context.serviceScope.consume(MSGraphClient.serviceKey);
  //   client
  //   .api('/me')
  //   .get((error, response: any, rawResponse?: any) => {
  //    console.log(response);
  // });
 
    return (
      <div className={ styles.msGraphLearn }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
            <div id="graph">
           
            </div>
          </div>
        </div>
        <Mails graphClient={this.props.context}></Mails>
      </div>
    );
  }
}

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import IMailsProps from './IMailsProps';
import IMailsState from './IMailsState';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { MSGraphClient } from '@microsoft/sp-client-preview';
import {
  Persona,
  PersonaSize
} from 'office-ui-fabric-react/lib/components/Persona';
import { Link } from 'office-ui-fabric-react/lib/components/Link';
 export default class Mails extends React.Component<IMailsProps,IMailsState>{

    constructor(props: IMailsProps) {
        super(props);
    
        this.state = {
          //name: '',
          email: '',
          phone: '',
          image: null
        };
        this.changeInput =this.changeInput.bind(this);
      }
      //Set state
     changeInput(event){
this.setState(
  {[event.target.name]:event.target.value}
)
    }      public componentDidMount(): void {

       const cl:MSGraphClient= this.props.graphClient.serviceScope.consume(MSGraphClient.serviceKey)
          
       cl.api(`me`)
          .get((error: any, user: MicrosoftGraph.User, rawResponse?: any) => {
            this.setState({
           
              email: user.mail,
              phone: user.businessPhones[0]
            });
          });
    
        cl
          .api('/me/photo/$value')
          .responseType('blob')
          .get((err: any, photoResponse: any, rawResponse: any) => {
            const blobUrl = window.URL.createObjectURL(rawResponse.xhr.response);
            this.setState({ image: blobUrl });
          });
      }
      
      public render(): React.ReactElement<IMailsProps> {
        return (
          <form>
<input type="text" name="email" value={this.state.email} onChange={this.changeInput} ></input>
<Persona 
                   secondaryText={this.state.email}
                   onRenderSecondaryText={this._renderMail}
                   tertiaryText={this.state.phone}
                   onRenderTertiaryText={this._renderPhone}
                   imageUrl={this.state.image}
                   size={PersonaSize.size100} />
          </form>
          
        );
      }
    
      private _renderMail = () => {
        if (this.state.email) {
          return <Link href={`mailto:${this.state.email}`}>{this.state.email}</Link>;
        } else {
          return <div />;
        }
      }
    
      private _renderPhone = () => {
        if (this.state.phone) {
          return <Link href={`tel:${this.state.phone}`}>{this.state.phone}</Link>;
        } else {
          return <div />;
        }
      }
    }

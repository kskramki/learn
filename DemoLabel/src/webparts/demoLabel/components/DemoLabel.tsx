import * as React from 'react';
//import styles from './DemoLabel.module.scss';
import { IDemoLabelProps } from './IDemoLabelProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Label } from 'office-ui-fabric-react/lib/Label';

export default class DemoLabel extends React.Component<IDemoLabelProps, {}> {
  public render(): React.ReactElement<IDemoLabelProps> {
    return (
      <div >
        <div >
          <div >
            <div >
              <span >Welcome to SharePoint!</span>
              <p >Customize SharePoint experiences using Web Parts.</p>
              <p >{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" >
                <span >Learn more</span>
              </a>
            </div>
          </div>
        </div>
        <Label title="Hello">Hello </Label>
      </div>
    );
  }
}

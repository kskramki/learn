import * as React from 'react';
import styles from './ReactandSpfx.module.scss';
import { IReactandSpfxProps } from './IReactandSpfxProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as chance from 'chance';
import ModalCustom from './ModalCustom';
//import * as strings from 'officeUiFabricPeoplePickerStrings';
import OfficeUiFabricPeoplePicker from './OfficeUiFabricPeoplePicker';
import { IOfficeUiFabricPeoplePickerProps } from './IOfficeUiFabricPeoplePickerProps';
import {
  CompactPeoplePicker,
  IBasePickerSuggestionsProps,
  NormalPeoplePicker
} from 'office-ui-fabric-react/lib/Pickers';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import {Modal} from 'office-ui-fabric-react/lib/Modal';
import Pagination from 'office-ui-fabric-react-pagination';
import * as $ from 'jquery';
import pagination from './jquery.twbsPagination'




export default class ReactandSpfx extends React.Component<IReactandSpfxProps, {people:any, isOpen:boolean}> {
   
  constructor(props) {
    super(props);

    const  people = [];

    for (let i = 0; i < 10; i++) {
        people.push({
            name: "Ram",//chance.first,
            country: "India"//chance.country
        });
    }

    this.state = { people,isOpen:false };
   // this.state = {isOpen:false};

}
private toggleModal = () => {
   this.setState({
     isOpen: !this.state.isOpen
   }); }
   private _onChange(items:any[]) {
    console.log(items);
  }
  public render(): React.ReactElement<IReactandSpfxProps> {
    
    return (
      <div className={ styles.reactandSpfx }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>HEy!{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
       
        
        <Pagination 
            currentPage={1}
            totalPages={10}
            onChange={(page) => {alert('Send user to page: ' + page)}}
        />
    {this.state.people.map((person, index) => (
        <p key={index}>Hello, {person.name} from {person.country}!</p>
    ))}
     
     <div className="App">
        <button onClick={this.toggleModal}>
          Open the modal
        </button>
      
        <ModalCustom  show={this.state.isOpen}
          onClose={this.toggleModal}>
          `Here's some content for the modal`
        </ModalCustom>
      </div> 
            <b>People Picker</b>
      <OfficeUiFabricPeoplePicker pdescription="Test" spHttpClient = {this.props.spHttpClient} siteUrl = {this.props.siteURL} typePicker="Normal" onChange={this._onChange}  />
      <OfficeUiFabricPeoplePicker pdescription="Test" spHttpClient = {this.props.spHttpClient}  siteUrl = {this.props.siteURL} typePicker="Compact"/>
      
      <PrimaryButton disabled={false} onClick={this.toggleModal} >
    I am a button.
  </PrimaryButton>
  <Icon iconName='CompassNW' className='ms-IconExample' />
        <Icon iconName='Dictionary' className='ms-IconExample' />
        <Icon iconName='TrainSolid' className='ms-IconExample' />

        {/* <Modal
          isOpen={ this.state.isOpen }
          onDismiss={ this.toggleModal }
          isBlocking={ false }
          containerClassName='ms-modalExample-container'
        >
        <div className='ms-modalExample-header'>
            <span>Lorem Ipsum</span>
            <PrimaryButton onClick={this.toggleModal}>Close </PrimaryButton>
          </div>
          <div className='ms-modalExample-body'>
            office fabric UI model
            office fabric UI model
            office fabric UI model
            office fabric UI model
            office fabric UI model

          </div>
        </Modal> */}
       </div>
     
    );
  } 
}

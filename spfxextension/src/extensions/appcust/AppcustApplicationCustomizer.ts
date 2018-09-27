import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import styles from './AppcustApplicationCustomizer.module.scss';
    import { escape } from '@microsoft/sp-lodash-subset'; 
import {
  BaseApplicationCustomizer,PlaceholderName,PlaceholderContent,PlaceholderProvider
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'AppcustApplicationCustomizerStrings';

const LOG_SOURCE: string = 'AppcustApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IAppcustApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
  Top:string;
  bottom:string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class AppcustApplicationCustomizer
  extends BaseApplicationCustomizer<IAppcustApplicationCustomizerProperties> {
private _topplaceholder : PlaceholderContent | undefined;
private _bottomplaceholder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceholder);
this._renderPlaceholder();
    return Promise.resolve();
  }
  private _renderPlaceholder():void
  {
console.log('Available placeholder',this.context.placeholderProvider.placeholderNames.map(name=>PlaceholderName[name]).join(','))
if (!this._topplaceholder) {
  this._topplaceholder =
    this.context.placeholderProvider.tryCreateContent(
      PlaceholderName.Top,
      { onDispose: this._onDispose });

  // The extension should not assume that the expected placeholder is available.
  if (!this._topplaceholder) {
    console.error('The expected placeholder (Top) was not found.');
    return;
  }
  if (this.properties) {
    let topString: string = this.properties.Top;
    if (!topString) {
      topString = '(Top property was not defined.)';
    }

    if (this._topplaceholder.domElement) {
      this._topplaceholder.domElement.innerHTML = `
        <div class="${styles.app}">
          <div class="ms-bgColor-themeDark ms-fontColor-white ${styles.top}">
            <i class="ms-Icon ms-Icon--Info" aria-hidden="true"></i> ${escape(topString)}
          </div>
        </div>`;
    }
  
    }
  }
}
private _onDispose(): void {
  console.log('[HelloWorldApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders.');
}
}

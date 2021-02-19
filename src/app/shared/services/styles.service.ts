import { Injectable } from '@angular/core';
import { IStyles } from 'src/app/shared/models/i-styles';

@Injectable()
export class StylesService {

  constructor() {
  }

  createStyleObject(stylesItem: IStyles): object {
    const styles = {};
    if (stylesItem) {
      Object.keys(stylesItem).forEach(key => {
        styles[key] = stylesItem[key].value + stylesItem[key].units;
      });
    }
    return styles;
  }
}

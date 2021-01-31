import {side} from '../../shares/static';

export class MoviliHeader {

  title?: string;
  back?: boolean;
  filter?: side;
  search?: boolean;
  logo?: boolean;
  exit?: boolean;
  chat?: boolean;
  basket?: boolean;
  rightTitle?: string;
  location?: string;
  darkMode?: boolean;


  constructor(title?: string, back?: boolean,
              filter?: side, search?: boolean,
              logo?: boolean, exit?: boolean,
              chat?: boolean, basket?: boolean,
              rightTitle?: string, location?: string,
              darkMode?: boolean) {
    this.title = title;
    this.back = back;
    this.filter = filter;
    this.search = search;
    this.logo = logo;
    this.exit = exit;
    this.chat = chat;
    this.basket = basket;
    this.rightTitle = rightTitle;
    this.location = location;
    this.darkMode = darkMode;
  }

  static HOME(cityString: string): MoviliHeader {
    return new MoviliHeader(null,
      null,
      null,
      null,
      true,
      null,
      true,
      null,
      null,
        cityString,
      null);
  }


  static PROFILE_DETAIL(): MoviliHeader {
    return new MoviliHeader('Профиль',
      true,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null);
  }


  static SERVICE_PAGE(): MoviliHeader {
    return new MoviliHeader('МАКИЯЖ',
      null,
      'end',
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null);
  }

  static LOGIN_PAGE(): MoviliHeader {
    return new MoviliHeader(null,
      null,
      null,
      null,
      true);
  }


  static QR(): MoviliHeader {
    return new MoviliHeader('QR-Сканнер');
  }

  static SERVICE(): MoviliHeader {
    return new MoviliHeader('Услуги');
  }

  static SEARCH_SERVICE(): MoviliHeader {
    return new MoviliHeader('Поиск услуг',
      null,
      'end');
  }

  static HISTORY(title: string): MoviliHeader {
    return new MoviliHeader(title,
      null,
      'start',
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      false);
  }

  static LOGIN(): MoviliHeader {
    return new MoviliHeader('',
      null,
      null,
      null,
      true);
  }

  static SMS(): MoviliHeader {
    return new MoviliHeader(null,
      true,
      null,
      null,
      true);
  }

  static EMPLOYEE(): MoviliHeader {
    return new MoviliHeader('Мастера',
      true,
      'end');
  }

  static PRODUCT_LIST(title: string): MoviliHeader {
    return new MoviliHeader(title,
      true,
      'end');
  }
}



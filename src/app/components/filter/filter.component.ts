import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
    categories: any = [
        {id: 1, name: 'По рейтингу', checked: false},
        {id: 2, name: 'По популярности', checked: false},
        {id: 3, name: 'По цене', checked: false},
        {id: 4, name: 'Новые', checked: true}];

    constructor() {
    }

    ngOnInit() {
    }

    checkCategory(category) {
        category.checked = category.checked !== true;
    }

    applyFilter() {
    }
}

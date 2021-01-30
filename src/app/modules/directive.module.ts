import {NgModule} from '@angular/core';
import {ThrottleClickDirective} from '../directives/throttle-click.directive';

@NgModule({
    declarations: [
        ThrottleClickDirective,
    ],
    imports: [],
    exports: [ThrottleClickDirective],
})
export class DirectiveModule {
}

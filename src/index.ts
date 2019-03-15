// @ts-ignore
import $ from 'jquery';
// @ts-ignore
window.jQuery = $;
// @ts-ignore
window.$ = $;

import './MenuPanel';
import './index.html'

class Main {
    constructor() {
        jQuery(() => {
            $("*[data-toggle='tooltip']").tooltip();
            $(".toast").toast({});
        });
    }
}

var main:Main = new Main();
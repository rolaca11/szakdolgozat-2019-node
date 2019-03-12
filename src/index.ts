// @ts-ignore
import $ from 'jquery';
// @ts-ignore
window.jQuery = $;
// @ts-ignore
window.$ = $;

import 'bootstrap';
import './index.scss';
import './test.css';
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